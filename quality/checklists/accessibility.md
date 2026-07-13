# Checklist de Accesibilidad

**Versión:** 1.0  
**Última actualización:** 13 de julio de 2026

## HTML Semántico

- [ ] `<header>`, `<nav>`, `<main>`, `<footer>` presentes
- [ ] Un solo `<h1>` por página
- [ ] Jerarquía de headings correcta (h1 → h2 → h3)
- [ ] `<button>` para acciones, `<a>` para navegación

## ARIA y Labels

- [ ] `aria-label` en botones sin texto visible (menú hamburguesa)
- [ ] `aria-expanded` en menú móvil (pendiente mejora)
- [ ] `alt` descriptivo en todas las imágenes
- [ ] `.sr-only` para texto solo-lector de pantalla

## Contraste (WCAG AA)

| Par                                         | Ratio mínimo | Estado                      |
| ------------------------------------------- | ------------ | --------------------------- |
| Texto primario (#FFF) sobre fondo (#1A1A1C) | 4.5:1        | ✅                          |
| Texto muted (#B0B0B5) sobre fondo (#1A1A1C) | 4.5:1        | ✅ (mejorado desde #8E8E93) |
| Accent orange (#FF6600) sobre fondo oscuro  | 3:1 (UI)     | ✅                          |

## Teclado

- [ ] Tab order lógico
- [ ] Focus visible en links y botones
- [ ] Escape cierra modales (verificar)
- [ ] Menú móvil accesible por teclado

## Responsive y Touch

- [ ] Targets táctiles mínimo 44×44px
- [ ] Sin scroll horizontal involuntario
- [ ] Safe area insets en iPhone (notch)

## Herramientas

```bash
# Lighthouse accesibilidad (Chrome DevTools)
# axe DevTools extension
# VoiceOver (macOS) / NVDA (Windows) test manual
```
