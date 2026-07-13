# Reglas CSS — MacWave Quality Harness

**Versión:** 1.0

## Principios

1. **Paridad visual absoluta** — ningún cambio visible sin validación
2. **Migrar, no reescribir** — equivalencia 100% antes de eliminar legado
3. **Tokens centralizados** — colores y espaciados desde `quality/tokens/` y `tailwind.config.js`

## Prohibido

- ❌ Eliminar reglas de `style.css` sin validación visual
- ❌ Cambiar valores de color, spacing o tipografía sin aprobación
- ❌ Añadir `!important` excepto `.sr-only` y overrides de accesibilidad
- ❌ Estilos inline nuevos (excepto `--i` en nav móvil existente)
- ❌ Duplicar tokens — usar CSS variables o Tailwind theme

## Obligatorio

- ✅ Usar tokens de `quality/tokens/` para valores nuevos
- ✅ Documentar componentes nuevos en `quality/design-system/`
- ✅ `@layer components` para clases reutilizables en `tailwind.css`
- ✅ Media queries alineadas con `quality/tokens/breakpoints.json`
- ✅ CSS containment en contenedores de alto tráfico

## Orden de Capas CSS

```
1. @tailwind base       → Reset mínimo (sr-only, box-sizing)
2. style.css (legado)   → Fuente activa hasta migración completa
3. @layer components    → Componentes migrados a Tailwind
4. @tailwind utilities  → Utilidades disponibles para HTML nuevo
```

## Convenciones de Nomenclatura

| Tipo        | Patrón                               | Ejemplo               |
| ----------- | ------------------------------------ | --------------------- |
| Layout      | `.container`, `.grid-N-cols`         | `.grid-3-cols`        |
| Componente  | `.nombre-componente`                 | `.cta-button`         |
| Modificador | `.base.modificador`                  | `.cta-button.primary` |
| Estado      | `.active`, `.loaded`, `.menu-active` | JS-controlled         |
| Utilidad    | `.text-white`, `.light-section`      | `.sr-only`            |

## Archivos CSS del Proyecto

| Archivo                   | Líneas | Alcance          | Estado migración     |
| ------------------------- | ------ | ---------------- | -------------------- |
| `style.css`               | 5,806  | Sitio público    | Fuente activa        |
| `tailwind.css`            | ~50+   | Entrada Tailwind | En progreso          |
| `sidebar-ods.css`         | —      | Dashboard OPS    | Separado (no migrar) |
| `css/ops-audit.css`       | —      | Audit log OPS    | Separado (no migrar) |
| `cotizaciones/styles.css` | —      | Cotizaciones PDF | Separado (no migrar) |
