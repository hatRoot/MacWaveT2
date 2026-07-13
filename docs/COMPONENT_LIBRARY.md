# Component Library — MacWave México

**Versión:** 1.0  
**Última actualización:** 13 de julio de 2026

## Catálogo

Todos los componentes están documentados como snippets HTML en `quality/design-system/components/`.

| #   | Componente  | Clase CSS (legado)                | Clase Tailwind (nueva)                 | Archivo          |
| --- | ----------- | --------------------------------- | -------------------------------------- | ---------------- |
| 1   | Button      | `.cta-button`                     | `.mw-btn-primary`, `.mw-btn-secondary` | `button.html`    |
| 2   | Card        | `.solution-card`, `.pricing-card` | `.mw-card`                             | `card.html`      |
| 3   | Input       | `.form-group` (cotizaciones)      | —                                      | `input.html`     |
| 4   | Select      | `.form-group select`              | —                                      | `input.html`     |
| 5   | Modal       | `.modal-overlay`                  | —                                      | `modal.html`     |
| 6   | Alert/Badge | `.google-review-pill`             | `.mw-badge-orange`                     | `alert.html`     |
| 7   | Navbar      | `.cloned-header`, `.main-nav`     | —                                      | `navbar.html`    |
| 8   | Footer      | `.main-footer`, `.footer-grid`    | `.mw-grid-4`                           | `footer.html`    |
| 9   | Section     | `.section-padded`                 | `.mw-section`                          | `section.html`   |
| 10  | Container   | `.container`                      | `.mw-container`                        | `container.html` |
| 11  | Grid        | `.grid-3-cols`, `.grid-2-cols`    | `.mw-grid-3`, `.mw-grid-2`             | `grid.html`      |
| 12  | Hero        | `.hero-section-authority`         | —                                      | `hero.html`      |
| 13  | CTA         | `.cta-contact-section`            | —                                      | `cta.html`       |
| 14  | Form        | CTAs + WhatsApp                   | —                                      | `form.html`      |

## Convención de Nombres

| Prefijo                           | Uso                                    | Estado                              |
| --------------------------------- | -------------------------------------- | ----------------------------------- |
| `.cta-button`, `.container`, etc. | Clases legado en `style.css`           | **Activo en producción**            |
| `.mw-*`                           | Clases Tailwind en `@layer components` | Disponible para adopción progresiva |
| `.tw-*`                           | Prefijo CDN piloto (index.html)        | Solo desarrollo local               |

## Uso Recomendado

### Páginas existentes (no migradas)

```html
<!-- Mantener clases legado — NO cambiar -->
<a href="#" class="cta-button primary">Solicitar servicio</a>
```

### Páginas nuevas o secciones migradas

```html
<!-- Usar clases Tailwind del design system -->
<a href="#" class="mw-btn-primary">Solicitar servicio</a>
```

## Dependencias JavaScript

Estas clases son controladas por JS — **no renombrar:**

| Clase         | Componente   | JS                   |
| ------------- | ------------ | -------------------- |
| `menu-active` | Navbar móvil | `toggleMobileMenu()` |
| `active`      | Modal        | `script.js`          |
| `loaded`      | Lazy load    | `script.js`          |
| `scrolled`    | Header       | `script.js`          |

## Adopción Progresiva

1. Validar equivalencia visual con `node scripts/comparar.js`
2. Reemplazar clase legado por `.mw-*` en HTML
3. Verificar que `style.css` no es necesario para esa sección
4. Eliminar regla de `style.css` solo tras validación

Ver `quality/checklists/migration.md` para el proceso completo.
