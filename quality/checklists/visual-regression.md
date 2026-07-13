# Checklist de Regresión Visual

**Versión:** 1.0  
**Última actualización:** 13 de julio de 2026

## Configuración

```bash
# 1. Crear respaldo si no existe
cp index.html index-original.html

# 2. Instalar dependencias
npm install
npx playwright install chromium

# 3. Ejecutar comparación
node scripts/comparar.js
```

## Viewports Obligatorios

| Viewport  | Dimensiones | Archivo diff                    |
| --------- | ----------- | ------------------------------- |
| iPhone 14 | 390 × 844   | `screenshots/diff_iphone14.png` |
| Desktop   | 1280 × 800  | `screenshots/diff_desktop.png`  |

## Criterios de Aprobación

| Resultado        | Umbral        | Acción                                    |
| ---------------- | ------------- | ----------------------------------------- |
| ✅ IDÉNTICO      | 0% diferencia | Continuar migración                       |
| 🟡 Mínima        | < 1%          | Revisar diff, aprobar si es anti-aliasing |
| 🟠 Moderada      | 1–5%          | DETENER — corregir antes de continuar     |
| 🔴 Significativa | > 5%          | DETENER — revertir cambios                |

## Páginas a Validar (Prioridad)

### Alta (Públicas principales)

- [ ] `index.html`
- [ ] `reparaciones.html`
- [ ] `empresas.html`
- [ ] `software.html`
- [ ] `casos-reales.html`

### Media (Landing pages SEO)

- [ ] `bateria-macbook-cdmx.html`
- [ ] `mac-mojada-cdmx.html`
- [ ] `mantenimiento-macbook-cdmx.html`
- [ ] `reparacion-imac-cdmx.html`
- [ ] (resto de 13 landing pages)

### Baja (OPS — CSS separado)

- [ ] `dashboard-ods.html` (usa `sidebar-ods.css`)
- [ ] `cotizaciones/` (usa `styles.css` propio)

## Elementos Críticos por Página

- [ ] Header fijo y transición scroll
- [ ] Menú móvil slide-in
- [ ] Hero section layout
- [ ] Cards y grids
- [ ] Footer 4 columnas → 1 columna móvil
- [ ] Botón WhatsApp flotante
- [ ] Tipografía y colores de marca
