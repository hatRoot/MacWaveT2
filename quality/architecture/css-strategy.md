# Arquitectura CSS — MacWave México

**Versión:** 1.0  
**Última actualización:** 13 de julio de 2026

## Estado Actual

```
┌─────────────────────────────────────────────────────────┐
│                    PÁGINAS HTML (34)                     │
│         Todas referencian style.css (legado)             │
│         index.html: piloto CDN Tailwind (local)          │
└────────────────────────┬────────────────────────────────┘
                         │
          ┌──────────────┴──────────────┐
          │                             │
   ┌──────▼──────┐              ┌──────▼──────┐
   │  style.css  │              │ tailwind.css │
   │  5,806 líns │              │  entrada TW  │
   │  FUENTE     │              │  @layer comp │
   │  ACTIVA     │              └──────┬───────┘
   └─────────────┘                     │
                                ┌──────▼──────┐
                                │dist/output  │
                                │   .css      │
                                │ (build npm) │
                                └─────────────┘
```

## Estrategia de Migración

### Principio: Coexistencia Segura

1. `style.css` permanece como CSS activo — **cero riesgo visual**
2. `tailwind.css` acumula tokens y componentes migrados
3. `dist/output.css` se genera con build pero **no reemplaza** style.css hasta validación
4. CDN piloto en `index.html` usa prefijo `tw-` + `preflight: false`

### Orden de Migración por Página

| Prioridad | Páginas                              | Razón                            |
| --------- | ------------------------------------ | -------------------------------- |
| P0        | `index.html`                         | Mayor tráfico, piloto activo     |
| P1        | `reparaciones.html`, `empresas.html` | Navegación principal             |
| P2        | 13 landing pages SEO                 | Mismo layout, CSS compartido     |
| P3        | OPS (`dashboard-ods.html`, etc.)     | CSS separado (`sidebar-ods.css`) |
| P4        | `cotizaciones/`                      | CSS propio, no compartido        |

### Orden de Migración por CSS

| Fase | Contenido                             | Líneas aprox. | Riesgo   |
| ---- | ------------------------------------- | ------------- | -------- |
| 1    | Tokens `:root` → `tailwind.config.js` | 40            | ✅ Hecho |
| 2    | Utilidades (`.sr-only`, `.container`) | 50            | Bajo     |
| 3    | Componentes (`.cta-button`, cards)    | 500           | Medio    |
| 4    | Layout (header, footer, grids)        | 1,500         | Alto     |
| 5    | Media queries responsive              | 2,000         | Alto     |
| 6    | Secciones específicas por página      | 1,700         | Alto     |

## CSS Separados (No Migrar en Fase Actual)

| Archivo                   | Alcance          | Razón                 |
| ------------------------- | ---------------- | --------------------- |
| `sidebar-ods.css`         | Dashboard OPS    | Sistema independiente |
| `css/ops-audit.css`       | Audit log        | Sistema independiente |
| `cotizaciones/styles.css` | Cotizaciones PDF | Submódulo aislado     |

## Build Pipeline

```bash
# Desarrollo
npm run watch:css    # tailwind.css → dist/output.css (watch)

# Producción
npm run build:css    # minificado

# Validación
bash quality/validation/run-all.sh
node scripts/comparar.js    # regresión visual
```

## Deploy

GitHub Actions (`deploy.yml`) despliega via FTP a Hostgator.
**Nota:** El workflow no ejecuta `npm run build:css` — el CSS se sirve directamente.
Cuando se adopte `dist/output.css`, actualizar el workflow.
