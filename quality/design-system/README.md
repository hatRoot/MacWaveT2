# MacWave Design System — Componentes

**Versión:** 1.0  
**Última actualización:** 13 de julio de 2026

## Catálogo de Componentes

| Componente  | Archivo          | Clase CSS principal               | Estado      |
| ----------- | ---------------- | --------------------------------- | ----------- |
| Button      | `button.html`    | `.cta-button`                     | Documentado |
| Card        | `card.html`      | `.solution-card`, `.pricing-card` | Documentado |
| Input       | `input.html`     | `.form-group` (cotizaciones)      | Documentado |
| Select      | `input.html`     | `.form-group select`              | Documentado |
| Modal       | `modal.html`     | `.modal-overlay`                  | Documentado |
| Alert/Badge | `alert.html`     | `.google-review-pill`             | Documentado |
| Navbar      | `navbar.html`    | `.cloned-header`, `.main-nav`     | Documentado |
| Footer      | `footer.html`    | `.main-footer`                    | Documentado |
| Section     | `section.html`   | `.section-padded`                 | Documentado |
| Container   | `container.html` | `.container`                      | Documentado |
| Grid        | `grid.html`      | `.grid-3-cols`, `.grid-2-cols`    | Documentado |
| Hero        | `hero.html`      | `.hero-section-authority`         | Documentado |
| CTA         | `cta.html`       | `.cta-contact-section`            | Documentado |
| Form        | `form.html`      | CTAs + WhatsApp (público)         | Documentado |

## Uso

Cada archivo en `components/` es un **snippet HTML de referencia** con:

- Marcado semántico correcto
- Clases CSS actuales (legado)
- Comentarios con tokens y equivalencias Tailwind futuras

## Tokens

Todos los tokens están en `quality/tokens/`:

- `colors.json`, `typography.json`, `spacing.json`
- `shadows.json`, `borders.json`, `breakpoints.json`
- `z-index.json`, `animations.json`, `radii.json`

## Migración

Los componentes se migrarán a `@layer components` en `tailwind.css` **solo** cuando:

1. Equivalencia visual 100% verificada
2. `scripts/comparar.js` aprueba (< 1% diferencia)
3. Documentación actualizada

**Estado actual:** CSS legado (`style.css`) sigue siendo la fuente de verdad visual.
