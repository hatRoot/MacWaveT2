# Reglas Tailwind — MacWave Quality Harness

**Versión:** 1.0

## Configuración Activa

- **Versión:** Tailwind CSS v3.4 (no v4 — ver nota abajo)
- **Build:** `tailwindcss -i ./tailwind.css -o ./dist/output.css`
- **Prefijo piloto CDN:** `tw-` (solo `index.html` local, NO producción)

## Estrategia de Migración

### Fase 1 — Infraestructura (✅ Actual)

- Tokens en `tailwind.config.js` sincronizados con `style.css :root`
- Quality Harness en `quality/`
- Componentes documentados en `quality/design-system/`

### Fase 2 — Coexistencia (⏳ En progreso)

- `style.css` sigue siendo CSS activo en todas las páginas
- `tailwind.css` acumula componentes migrados en `@layer components`
- CDN piloto en `index.html` con `preflight: false` y prefijo `tw-`

### Fase 3 — Adopción Build (⏳ Pendiente)

- HTML referencia `dist/output.css` además de o en lugar de `style.css`
- Validación visual página por página

### Fase 4 — Limpieza (❌ No iniciar)

- Eliminar reglas de `style.css` solo tras comparar.js < 1%

## Reglas de Uso

### En HTML nuevo

```html
<!-- Preferir componentes del design system -->
<button class="cta-button primary">Solicitar servicio</button>

<!-- Utilidades Tailwind solo cuando equivalencia es 100% -->
<div class="mx-auto max-w-container px-5"></div>
```

### En tailwind.css

```css
@layer components {
  .mw-btn-primary {
    @apply cursor-pointer rounded-lg bg-accent-orange px-5 py-2 text-center font-semibold text-primary transition-all duration-300;
  }
}
```

## Prohibido en Producción

- ❌ CDN `cdn.tailwindcss.com` (solo desarrollo/piloto local)
- ❌ `preflight: false` en build de producción sin plan de migración
- ❌ Clases `tw-*` mezcladas con legado sin documentar

## Nota: Tailwind v4

El proyecto usa **v3.4** instalado en `package.json`. Migrar a v4 requiere:

- Cambio de configuración (CSS-first config)
- Re-validación visual completa
- Actualización de `prettier-plugin-tailwindcss`

**No migrar a v4 hasta completar migración v3.**

## Tokens → Clases Tailwind

| Token                | Clase Tailwind                            |
| -------------------- | ----------------------------------------- |
| `--primary-bg`       | `bg-primary`                              |
| `--accent-orange`    | `bg-accent-orange` / `text-accent-orange` |
| `--text-muted`       | `text-text-muted`                         |
| `--border-radius-lg` | `rounded-lg`                              |
| Container 1200px     | `max-w-container`                         |

Ver `quality/tokens/` para catálogo completo.
