# Reporte de Migración a Tailwind CSS — MacWave México

**Fecha:** 13 de julio de 2026  
**Versión:** 1.1  
**Estado:** EN PROGRESO

## Resumen Ejecutivo

| Métrica                         | Porcentaje REAL | Detalle                                               |
| ------------------------------- | --------------- | ----------------------------------------------------- |
| **Migración CSS a Tailwind**    | **~3%**         | Tokens + utilidades base + 10 componentes `.mw-*`     |
| **Migración HTML a utilidades** | **~0%**         | 34 páginas usan `style.css`; 0 usan `dist/output.css` |
| **CSS legado eliminado**        | **0%**          | Correcto — `style.css` intacto (5,806 líneas)         |
| **Quality Harness**             | **~95%**        | Infraestructura completa, validación visual pendiente |
| **Design System**               | **~90%**        | Tokens + 14 componentes documentados                  |
| **Documentación**               | **~95%**        | 8 documentos actualizados con estado real             |

## Desglose por Fase

### ✅ Completado

| Item                                     | Archivos                                                                                                 |
| ---------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Tokens de diseño en `tailwind.config.js` | Colores, tipografía, spacing, shadows, z-index, animaciones                                              |
| Tokens JSON en `quality/tokens/`         | 9 archivos                                                                                               |
| Quality Harness estructura               | `quality/checklists/`, `rules/`, `tokens/`, `design-system/`, `architecture/`, `validation/`, `scripts/` |
| Componentes documentados                 | 14 snippets en `quality/design-system/components/`                                                       |
| Clases Tailwind `.mw-*`                  | 10 componentes en `tailwind.css` `@layer components`                                                     |
| ESLint + Prettier + EditorConfig         | `.eslintrc.json`, `.prettierrc.json`, `.editorconfig`                                                    |
| Scripts npm                              | `build:css`, `lint`, `format`, `validate`, `migration:status`, `test:visual`                             |
| Script regresión visual                  | `scripts/comparar.js` (Playwright + pixelmatch)                                                          |
| Documentación técnica                    | 8 archivos en `docs/`                                                                                    |

### ⏳ En Progreso

| Item                               | Estado                                                 |
| ---------------------------------- | ------------------------------------------------------ |
| Build `dist/output.css`            | Configurado, pendiente adopción en HTML                |
| Piloto CDN en `index.html`         | Configurado con prefijo `tw-`, 0 clases `tw-*` en HTML |
| Migración componentes a `@apply`   | 10 de ~100 clases CSS                                  |
| Adopción `dist/output.css` en HTML | 0 de 34 páginas                                        |

### ❌ Pendiente

| Item                                                      | Prioridad | Riesgo                  |
| --------------------------------------------------------- | --------- | ----------------------- |
| Migrar `index.html` a build Tailwind                      | P0        | Alto (página principal) |
| Migrar 13 landing pages SEO                               | P1        | Medio (mismo layout)    |
| Migrar páginas principales (reparaciones, empresas, etc.) | P1        | Medio                   |
| Eliminar reglas de `style.css`                            | P2        | Alto si prematuro       |
| Migrar `sidebar-ods.css` (OPS)                            | P3        | Bajo (sistema separado) |
| Migrar `cotizaciones/styles.css`                          | P4        | Bajo (submódulo)        |
| Actualizar GitHub Actions con `npm run build:css`         | P2        | Medio                   |
| Eliminar CDN piloto de `index.html`                       | P2        | Bajo                    |
| Migrar a Tailwind v4                                      | P5        | Alto (breaking changes) |

## Archivos

### Creados (esta sesión)

```
quality/
├── checklists/ (4 archivos)
├── rules/ (4 archivos)
├── tokens/ (9 archivos JSON)
├── design-system/ (README + 14 componentes)
├── architecture/ (css-strategy.md)
├── validation/ (3 scripts + migration-status.json)
└── scripts/ (migration-status.js)

docs/
├── QUALITY_HARNESS.md
├── COMPONENT_LIBRARY.md
├── MIGRATION_REPORT.md (este archivo)
└── VALIDATION_REPORT.md (actualizado)

.editorconfig
```

### Modificados

```
tailwind.config.js    — Tokens completos
tailwind.css          — @layer components con .mw-* classes
package.json          — Scripts lint, format, validate
.gitignore            — Comentario dist/
```

### No Eliminados (correcto)

```
style.css             — 5,806 líneas, fuente CSS activa
sidebar-ods.css       — Dashboard OPS
css/ops-audit.css     — Audit log
cotizaciones/styles.css — Cotizaciones
```

## Riesgos

| Riesgo                          | Impacto                        | Mitigación                          |
| ------------------------------- | ------------------------------ | ----------------------------------- |
| Eliminar CSS antes de validar   | Visual roto                    | Regla de oro + comparar.js          |
| CDN Tailwind en producción      | Performance + inconsistencia   | Solo local, documentado             |
| Deploy sin build CSS            | dist/output.css desactualizado | Workflow pendiente de actualizar    |
| 5,806 líneas monolíticas        | Mantenimiento difícil          | Migración progresiva por componente |
| Clases JS-dependent renombradas | Funcionalidad rota             | Lista en COMPONENT_LIBRARY.md       |

## Recomendaciones

1. **Siguiente paso:** Migrar `index.html` — reemplazar CDN por `dist/output.css` + `style.css` coexistencia
2. **Validar visualmente** con `node scripts/comparar.js` antes de cada cambio HTML
3. **Migrar por componente**, no por archivo CSS completo
4. **Actualizar deploy.yml** para ejecutar `npm run build:css` en CI
5. **No migrar a Tailwind v4** hasta completar migración v3
6. **Mantener OPS y cotizaciones** como CSS separado en fases posteriores

## Cálculo de Porcentaje

```
Migración CSS = (líneas en tailwind.css @layer / líneas style.css) × 100
              = (~60 / 5806) × 100 ≈ 1% + tokens config ≈ 3%

Migración HTML = (páginas con dist/output.css / total páginas) × 100
               = (0 / 34) × 100 = 0%

Quality Harness = (dirs + tokens + components + scripts + docs) / total × 100
                ≈ 95%

General = CSS(30%) + HTML(20%) + Quality(50%) ≈ 48%
```

**Nota:** El porcentaje "general" incluye infraestructura. La migración visual real del CSS es ~3%.
