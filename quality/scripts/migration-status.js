#!/usr/bin/env node
/**
 * migration-status.js — Reporte de estado real de migración Tailwind
 * Uso: node quality/scripts/migration-status.js
 */
'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');

function countLines(filePath) {
  if (!fs.existsSync(filePath)) return 0;
  return fs.readFileSync(filePath, 'utf8').split('\n').length;
}

function findHtmlFiles(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (
      entry.isDirectory() &&
      !['node_modules', 'quality', 'supabase', '.git'].includes(entry.name)
    ) {
      files = files.concat(findHtmlFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.html')) {
      files.push(full);
    }
  }
  return files;
}

// Análisis
const styleCssLines = countLines(path.join(ROOT, 'style.css'));
const tailwindCssLines = countLines(path.join(ROOT, 'tailwind.css'));
const distExists = fs.existsSync(path.join(ROOT, 'dist/output.css'));
const distLines = distExists ? countLines(path.join(ROOT, 'dist/output.css')) : 0;

const htmlFiles = findHtmlFiles(ROOT);
const styleCssRefs = htmlFiles.filter((f) => {
  const c = fs.readFileSync(f, 'utf8');
  return c.includes('style.css');
}).length;

const tailwindCdnRefs = htmlFiles.filter((f) => {
  const c = fs.readFileSync(f, 'utf8');
  return c.includes('cdn.tailwindcss.com');
}).length;

const distCssRefs = htmlFiles.filter((f) => {
  const c = fs.readFileSync(f, 'utf8');
  return c.includes('dist/output.css');
}).length;

let twClassCount = 0;
let legacyClassCount = 0;
const legacyClasses = [
  'cta-button',
  'container',
  'main-footer',
  'hero-section-authority',
  'section-padded'
];
for (const file of htmlFiles) {
  const content = fs.readFileSync(file, 'utf8');
  const twMatches = content.match(/\btw-[a-zA-Z0-9_-]+/g);
  if (twMatches) twClassCount += twMatches.length;
  for (const cls of legacyClasses) {
    const re = new RegExp(`class="[^"]*${cls}`, 'g');
    const m = content.match(re);
    if (m) legacyClassCount += m.length;
  }
}

// Quality harness
const qualityDirs = [
  'checklists',
  'rules',
  'tokens',
  'design-system',
  'architecture',
  'validation',
  'scripts'
];
const qualityScore = qualityDirs.filter((d) => fs.existsSync(path.join(ROOT, 'quality', d))).length;

const tokenFiles = fs.existsSync(path.join(ROOT, 'quality/tokens'))
  ? fs.readdirSync(path.join(ROOT, 'quality/tokens')).filter((f) => f.endsWith('.json')).length
  : 0;

const componentFiles = fs.existsSync(path.join(ROOT, 'quality/design-system/components'))
  ? fs
    .readdirSync(path.join(ROOT, 'quality/design-system/components'))
    .filter((f) => f.endsWith('.html')).length
  : 0;

// Porcentajes reales
const htmlMigratedPct =
  htmlFiles.length > 0 ? Math.round((distCssRefs / htmlFiles.length) * 100) : 0;

const cssMigratedPct =
  styleCssLines > 0 ? Math.round(((tailwindCssLines - 45) / styleCssLines) * 100) : 0;

const qualityHarnessPct = Math.round(
  (qualityScore / qualityDirs.length) * 40 + (tokenFiles / 9) * 30 + (componentFiles / 14) * 30
);

const overallMigrationPct = Math.round(
  cssMigratedPct * 0.3 + htmlMigratedPct * 0.2 + qualityHarnessPct * 0.5
);

console.log('\n══════════════════════════════════════════════════');
console.log('  📊 ESTADO REAL DE MIGRACIÓN — MacWave T2');
console.log('══════════════════════════════════════════════════\n');

console.log('CSS:');
console.log(`  style.css:          ${styleCssLines} líneas (fuente activa)`);
console.log(`  tailwind.css:       ${tailwindCssLines} líneas (entrada Tailwind)`);
console.log(`  dist/output.css:    ${distExists ? distLines + ' líneas' : 'NO GENERADO'}`);
console.log(`  CSS migrado:        ~${cssMigratedPct}%`);

console.log('\nHTML:');
console.log(`  Archivos HTML:      ${htmlFiles.length}`);
console.log(`  Referencias style.css: ${styleCssRefs}`);
console.log(`  Referencias dist/output.css: ${distCssRefs}`);
console.log(`  CDN Tailwind (piloto): ${tailwindCdnRefs}`);
console.log(`  Clases tw-* en HTML:  ${twClassCount}`);
console.log(`  Clases legado (sample): ${legacyClassCount}`);
console.log(`  HTML migrado:       ~${htmlMigratedPct}%`);

console.log('\nQuality Harness:');
console.log(`  Directorios:        ${qualityScore}/${qualityDirs.length}`);
console.log(`  Token files:        ${tokenFiles}/9`);
console.log(`  Component files:    ${componentFiles}/14`);
console.log(`  Quality Harness:    ~${qualityHarnessPct}%`);

console.log('\n──────────────────────────────────────────────────');
console.log(`  MIGRACIÓN GENERAL:  ~${overallMigrationPct}%`);
console.log('──────────────────────────────────────────────────\n');

// Output JSON for CI
const report = {
  date: new Date().toISOString(),
  css: { styleCssLines, tailwindCssLines, distExists, migratedPct: cssMigratedPct },
  html: {
    total: htmlFiles.length,
    styleCssRefs,
    distCssRefs,
    twClassCount,
    migratedPct: htmlMigratedPct
  },
  quality: {
    dirs: qualityScore,
    tokens: tokenFiles,
    components: componentFiles,
    pct: qualityHarnessPct
  },
  overall: overallMigrationPct
};

fs.writeFileSync(
  path.join(ROOT, 'quality/validation/migration-status.json'),
  JSON.stringify(report, null, 2)
);
console.log('Reporte JSON: quality/validation/migration-status.json\n');
