# Reglas JavaScript — MacWave Quality Harness

**Versión:** 1.0

## Estándares

- ES6+ (`const`/`let`, arrow functions, template literals)
- Sin `var`
- Sin `console.log` en producción (ESLint: warn)
- Punto y coma obligatorio (ESLint)
- Comillas simples (ESLint)

## Archivos Principales

| Archivo                 | Líneas aprox. | Alcance         |
| ----------------------- | ------------- | --------------- |
| `script.js`             | ~486          | Sitio público   |
| `logo_const.js`         | ~600KB        | Logos base64    |
| `js/ops-shared.js`      | —             | Utilidades OPS  |
| `js/supabase-config.js` | —             | Config Supabase |
| `cotizaciones/app.js`   | —             | Generador PDF   |

## Dependencias CSS

JavaScript que manipula clases CSS — **no romper:**

```javascript
// Menú móvil
body.classList.toggle('menu-active');

// Header scroll
header.classList.add('scrolled');

// Lazy load
img.classList.add('loaded');

// Modales
modal.classList.add('active');
```

## Globals Definidos en ESLint

- `supabase` (readonly)
- `MacWaveOps` (readonly)

## Validación

```bash
npm run lint          # ESLint
npm run lint:fix      # Auto-fix
```

## Supabase — No Modificar

- `js/supabase-config.js` — credenciales y endpoints
- Migraciones en `supabase/migrations/`
- RLS policies existentes
