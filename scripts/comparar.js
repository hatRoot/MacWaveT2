/**
 * comparar.js — Arnés de pruebas de comparación visual
 * Mac Wave T2 — Migración a Tailwind CSS
 *
 * Uso: node scripts/comparar.js
 *
 * Compara index-original.html vs index.html en:
 *   - iPhone 14 (390x844)
 *   - Escritorio (1280x800)
 *
 * Genera diff images en screenshots/ y un reporte en consola.
 */

'use strict';

const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const http = require('http');
const { PNG } = require('pngjs');
// pixelmatch v6+ es ESM-only → se importa dinámicamente dentro del IIFE

// ── Configuración ─────────────────────────────────────────────────────────────
const ROOT = path.resolve(__dirname, '..');
const SCREENSHOTS_DIR = path.join(ROOT, 'screenshots');
const PORT = 3333;
const BASE_URL = `http://localhost:${PORT}`;

const VIEWPORTS = [
  {
    name: 'iphone14',
    label: '📱 iPhone 14',
    width: 390,
    height: 844
  },
  {
    name: 'desktop',
    label: '🖥️  Escritorio (1280x800)',
    width: 1280,
    height: 800
  }
];

const PAGES = [
  { file: 'index-original.html', key: 'original' },
  { file: 'index.html', key: 'nuevo' }
];

// ── Servidor HTTP local ───────────────────────────────────────────────────────
function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) => {
      // Limpiar query strings y fragmentos
      let urlPath = req.url.split('?')[0].split('#')[0];
      if (urlPath === '/') urlPath = '/index.html';

      const filePath = path.join(ROOT, urlPath);

      fs.readFile(filePath, (err, data) => {
        if (err) {
          res.writeHead(404);
          res.end(`Not found: ${urlPath}`);
          return;
        }

        const ext = path.extname(filePath).toLowerCase();
        const mimeTypes = {
          '.html': 'text/html; charset=utf-8',
          '.css': 'text/css',
          '.js': 'application/javascript',
          '.png': 'image/png',
          '.jpg': 'image/jpeg',
          '.jpeg': 'image/jpeg',
          '.svg': 'image/svg+xml',
          '.webp': 'image/webp',
          '.woff2': 'font/woff2',
          '.woff': 'font/woff',
          '.ico': 'image/x-icon',
          '.pdf': 'application/pdf'
        };
        res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
        res.end(data);
      });
    });

    server.listen(PORT, () => {
      console.log(`✅ Servidor local iniciado en ${BASE_URL}`);
      resolve(server);
    });
  });
}

// ── Función de comparación pixel a pixel ─────────────────────────────────────
// Recorta ambas imágenes al mínimo tamaño común antes de comparar
function cropPNG(img, w, h) {
  const out = new PNG({ width: w, height: h });
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const srcIdx = (y * img.width + x) * 4;
      const dstIdx = (y * w + x) * 4;
      out.data[dstIdx] = img.data[srcIdx];
      out.data[dstIdx + 1] = img.data[srcIdx + 1];
      out.data[dstIdx + 2] = img.data[srcIdx + 2];
      out.data[dstIdx + 3] = img.data[srcIdx + 3];
    }
  }
  return out;
}

function compareImages(pathA, pathB, diffPath, pixelmatch) {
  const rawA = PNG.sync.read(fs.readFileSync(pathA));
  const rawB = PNG.sync.read(fs.readFileSync(pathB));

  // Mínimo común — pixelmatch exige misma dimensión
  const cmpW = Math.min(rawA.width, rawB.width);
  const cmpH = Math.min(rawA.height, rawB.height);

  const imgA = cropPNG(rawA, cmpW, cmpH);
  const imgB = cropPNG(rawB, cmpW, cmpH);
  const diff = new PNG({ width: cmpW, height: cmpH });

  const mismatch = pixelmatch(imgA.data, imgB.data, diff.data, cmpW, cmpH, {
    threshold: 0.15,
    includeAA: false
  });

  fs.writeFileSync(diffPath, PNG.sync.write(diff));

  const totalPixels = cmpW * cmpH;
  const pct = ((mismatch / totalPixels) * 100).toFixed(2);
  return { mismatch, totalPixels, pct };
}

// ── Main ──────────────────────────────────────────────────────────────────────
(async () => {
  // pixelmatch v6+ es ESM-only; cargamos con import() dinámico
  const { default: pixelmatch } = await import('pixelmatch');

  // Crear directorio de capturas
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });
  }

  // Verificar que existen los archivos
  for (const p of PAGES) {
    if (!fs.existsSync(path.join(ROOT, p.file))) {
      console.error(`❌ No encontrado: ${p.file}`);
      console.error(
        '   Asegúrate de crear index-original.html como copia de respaldo del index.html original.'
      );
      process.exit(1);
    }
  }

  const server = await startServer();
  const browser = await chromium.launch({ headless: true });

  console.log('\n══════════════════════════════════════════');
  console.log('  🔍 COMPARACIÓN VISUAL: Mac Wave T2       ');
  console.log('══════════════════════════════════════════\n');

  const results = [];

  for (const vp of VIEWPORTS) {
    console.log(`\n${vp.label} (${vp.width}×${vp.height})`);
    console.log('─'.repeat(45));

    const screenshots = {};

    for (const pg of PAGES) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height }
      });
      const page = await context.newPage();

      const url = `${BASE_URL}/${pg.file}`;
      console.log(`  📸 Capturando: ${url}`);

      await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

      // Esperar un poco para que carguen fuentes y estilos
      await page.waitForTimeout(1500);

      const screenshotPath = path.join(SCREENSHOTS_DIR, `${vp.name}_${pg.key}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true });

      screenshots[pg.key] = screenshotPath;
      await context.close();
    }

    // Comparar
    const diffPath = path.join(SCREENSHOTS_DIR, `diff_${vp.name}.png`);
    const { mismatch, totalPixels, pct } = compareImages(
      screenshots.original,
      screenshots.nuevo,
      diffPath,
      pixelmatch
    );

    const status =
      parseFloat(pct) === 0
        ? '✅ IDÉNTICO'
        : parseFloat(pct) < 1
          ? '🟡 Diferencia mínima'
          : parseFloat(pct) < 5
            ? '🟠 Diferencia moderada'
            : '🔴 Diferencia significativa';

    console.log(`\n  ${status}`);
    console.log(
      `  Píxeles distintos: ${mismatch.toLocaleString()} / ${totalPixels.toLocaleString()}`
    );
    console.log(`  Desajuste: ${pct}%`);
    console.log(`  Imagen diff guardada en: screenshots/diff_${vp.name}.png`);

    results.push({ viewport: vp.label, pct, status, diffPath });
  }

  await browser.close();
  server.close();

  // Reporte final
  console.log('\n\n══════════════════════════════════════════');
  console.log('  📊 REPORTE FINAL                         ');
  console.log('══════════════════════════════════════════');
  for (const r of results) {
    console.log(`  ${r.viewport}: ${r.pct}% de diferencia — ${r.status}`);
  }

  const allPassed = results.every((r) => parseFloat(r.pct) < 1);
  console.log('\n══════════════════════════════════════════');
  if (allPassed) {
    console.log('  🎉 MIGRACIÓN APROBADA: visualmente idéntica');
  } else {
    console.log('  ⚠️  Revisa las imágenes de diferencia en screenshots/');
    console.log('      Corrige el CSS y vuelve a ejecutar: node scripts/comparar.js');
  }
  console.log('══════════════════════════════════════════\n');

  process.exit(allPassed ? 0 : 1);
})();
