# Checklist de Migración a Tailwind CSS

**Versión:** 1.0  
**Última actualización:** 13 de julio de 2026

## Antes de Migrar una Clase

- [ ] Identificar la clase en `style.css` con todas sus variantes (`:hover`, `:focus`, media queries)
- [ ] Verificar equivalencia 100% en Tailwind (`@apply` o utilidades)
- [ ] Documentar en `quality/design-system/components/`
- [ ] Crear respaldo visual (`index-original.html` o captura Playwright)
- [ ] Ejecutar `node scripts/comparar.js` — diferencia < 1%

## Durante la Migración

- [ ] Añadir clase a `@layer components` en `tailwind.css` O usar utilidades en HTML
- [ ] Mantener `style.css` hasta validación visual completa
- [ ] No modificar textos, imágenes ni contenido
- [ ] No cambiar URLs ni estructura SEO
- [ ] Preservar clases usadas por JavaScript (`menu-active`, `active`, `loaded`)

## Después de Migrar

- [ ] Ejecutar `npm run build:css` sin errores
- [ ] Comparación visual en iPhone 14 (390×844) y Desktop (1280×800)
- [ ] Verificar responsive en 480px, 768px, 1024px
- [ ] Verificar formularios y navegación
- [ ] Verificar JavaScript dependiente de clases CSS
- [ ] Actualizar `docs/MIGRATION_REPORT.md` con porcentaje real

## Antes de Eliminar CSS Legado

- [ ] `grep -r "nombre-clase" *.html` — cero referencias O reemplazadas
- [ ] Tailwind reemplaza completamente el estilo
- [ ] Resultado visual idéntico (comparar.js aprobado)
- [ ] Commit separado documentando eliminación

## Estado Actual del Proyecto

| Área                           | Estado                                     |
| ------------------------------ | ------------------------------------------ |
| Tokens en `tailwind.config.js` | ✅ Completado                              |
| Tokens en `quality/tokens/`    | ✅ Completado                              |
| `style.css` monolítico         | ⏳ 5,806 líneas — fuente activa            |
| HTML con utilidades Tailwind   | ⏳ ~0% (piloto CDN en index.html)          |
| CSS legado eliminado           | ❌ 0% (correcto — no eliminar sin validar) |
| Build `dist/output.css`        | ⏳ Configurado, pendiente adopción en HTML |
