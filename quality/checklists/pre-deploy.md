# Checklist Pre-Despliegue

**Versión:** 1.0  
**Última actualización:** 13 de julio de 2026

## Build y CSS

- [ ] `npm install` ejecutado sin errores
- [ ] `npm run build:css` compila sin errores
- [ ] `dist/output.css` generado y verificado
- [ ] Versión de cache busting actualizada en `<link>` si aplica (`?v=X.X.X`)

## Calidad de Código

- [ ] `npm run lint` sin errores críticos
- [ ] `npm run format:check` pasa
- [ ] Sin `console.log` nuevos en archivos de producción
- [ ] Sin estilos inline nuevos (excepto `--i` en nav móvil)

## Visual y UX

- [ ] Comparación visual aprobada (`node scripts/comparar.js`)
- [ ] Responsive verificado: 390px, 768px, 1024px, 1280px
- [ ] Navegación desktop y móvil funcional
- [ ] Botón WhatsApp flotante visible y funcional
- [ ] Modales abren/cierran correctamente

## SEO y Analytics

- [ ] Meta tags intactos (title, description, og:*)
- [ ] JSON-LD structured data presente
- [ ] Canonical URLs correctas
- [ ] Google Analytics / GTM sin cambios
- [ ] `sitemap.xml` y `robots.txt` sin cambios no autorizados

## Formularios y Funcionalidad

- [ ] Formularios OPS (dashboard, técnicos) funcionan
- [ ] Sistema de cotizaciones genera PDF
- [ ] Service Worker (`sw.js`) sin regresiones
- [ ] Supabase auth en páginas OPS

## Git y Despliegue

- [ ] `git status` limpio o cambios intencionales
- [ ] Commit con mensaje descriptivo
- [ ] Push a `main` exitoso
- [ ] GitHub Actions deploy completado
- [ ] Verificación post-deploy en https://macwave.com.mx
