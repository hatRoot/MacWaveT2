# Quality Harness — Documentación Interna

**Versión:** 1.0  
**Última actualización:** 13 de julio de 2026

## Índice de Documentación

| Documento         | Ubicación                   | Propósito                   |
| ----------------- | --------------------------- | --------------------------- |
| Quality Harness   | `docs/QUALITY_HARNESS.md`   | Resumen ejecutivo del arnés |
| Design System     | `docs/DESIGN_SYSTEM.md`     | Tokens y componentes        |
| Component Library | `docs/COMPONENT_LIBRARY.md` | Catálogo de 14 componentes  |
| Tailwind Guide    | `docs/TAILWIND_GUIDE.md`    | Uso de Tailwind CSS         |
| Migration Report  | `docs/MIGRATION_REPORT.md`  | Estado real de migración    |
| Validation Report | `docs/VALIDATION_REPORT.md` | Última validación           |
| Developer Guide   | `docs/DEVELOPER_GUIDE.md`   | Guía para desarrolladores   |
| Architecture      | `docs/ARCHITECTURE.md`      | Arquitectura del proyecto   |

## Documentación en `quality/`

| Carpeta          | Contenido                                             |
| ---------------- | ----------------------------------------------------- |
| `checklists/`    | Procesos operativos (migración, deploy, visual, a11y) |
| `rules/`         | Reglas CSS, HTML, JS, Tailwind                        |
| `tokens/`        | Design tokens JSON (fuente de verdad)                 |
| `design-system/` | Snippets HTML de componentes                          |
| `architecture/`  | Estrategia CSS y decisiones técnicas                  |
| `validation/`    | Scripts de validación automatizada                    |
| `scripts/`       | Utilidades (migration-status.js)                      |

## Flujo de Trabajo Recomendado

```
1. Leer quality/checklists/migration.md
2. Hacer cambios CSS/HTML
3. npm run build:css
4. node scripts/comparar.js (si hay cambios visuales)
5. npm run validate
6. Actualizar docs/MIGRATION_REPORT.md
```

## Contacto

Equipo de desarrollo MacWave México — ver `README.md` raíz.
