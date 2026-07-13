# Quality Harness — MacWave México

**Versión:** 1.0  
**Última actualización:** 13 de julio de 2026

## Propósito

El Tailwind Quality Harness es el sistema de aseguramiento de calidad para la migración CSS del proyecto MacWave México. Garantiza paridad visual, consistencia de código y documentación actualizada.

## Estructura

```
quality/
├── checklists/          # Checklists operativos
│   ├── migration.md     # Proceso de migración CSS
│   ├── pre-deploy.md    # Pre-despliegue
│   ├── visual-regression.md  # Comparación Playwright
│   └── accessibility.md # WCAG AA
├── rules/               # Reglas de código
│   ├── css.md
│   ├── html.md
│   ├── javascript.md
│   └── tailwind.md
├── tokens/              # Design tokens (JSON)
│   ├── colors.json
│   ├── typography.json
│   ├── spacing.json
│   ├── shadows.json
│   ├── borders.json
│   ├── breakpoints.json
│   ├── z-index.json
│   ├── animations.json
│   └── radii.json
├── design-system/       # Componentes documentados
│   ├── README.md
│   └── components/      # 14 snippets HTML
├── architecture/        # Decisiones técnicas
│   └── css-strategy.md
├── validation/          # Scripts de validación
│   ├── validate-build.sh
│   ├── validate-html.sh
│   ├── run-all.sh
│   └── migration-status.json  # (generado)
└── scripts/
    └── migration-status.js
```

## Comandos

```bash
# Validación completa
bash quality/validation/run-all.sh

# Solo build CSS
bash quality/validation/validate-build.sh

# Solo HTML
bash quality/validation/validate-html.sh

# Estado de migración
node quality/scripts/migration-status.js

# Regresión visual
node scripts/comparar.js
```

## Criterios de Aprobación

| Check            | Umbral             | Herramienta            |
| ---------------- | ------------------ | ---------------------- |
| Build CSS        | Sin errores        | `validate-build.sh`    |
| HTML estructura  | 0 errores críticos | `validate-html.sh`     |
| Regresión visual | < 1% diferencia    | `comparar.js`          |
| ESLint           | 0 errors           | `npm run lint`         |
| Prettier         | 0 diffs            | `npm run format:check` |

## Regla de Oro

> Si existe la más mínima diferencia visual: DETENERSE. Corregir. Validar. Continuar.

Ver `quality/checklists/visual-regression.md` para el proceso completo.

## Documentación Relacionada

- `docs/QUALITY_HARNESS.md` — Resumen ejecutivo
- `docs/MIGRATION_REPORT.md` — Estado de migración
- `docs/VALIDATION_REPORT.md` — Última validación
- `docs/DESIGN_SYSTEM.md` — Design system completo
- `docs/COMPONENT_LIBRARY.md` — Catálogo de componentes
