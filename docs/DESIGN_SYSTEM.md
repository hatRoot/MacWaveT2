# Design System - MacWave México

**Versión:** 1.1  
**Fecha:** 13 de julio de 2026

## Fuentes de Verdad

| Recurso | Ubicación | Estado |
|---------|-----------|--------|
| Tokens JSON | `quality/tokens/` | ✅ 9 archivos |
| Tailwind config | `tailwind.config.js` | ✅ Sincronizado |
| Componentes HTML | `quality/design-system/components/` | ✅ 14 snippets |
| CSS activo | `style.css` | ⏳ 5,806 líneas (legado) |
| Clases Tailwind nuevas | `tailwind.css` → `.mw-*` | ✅ 10 componentes |

Ver también: `docs/COMPONENT_LIBRARY.md` y `docs/MIGRATION_REPORT.md`.

## Visión General

El Design System de MacWave México define los tokens de diseño, componentes y patrones visuales que garantizan consistencia en toda la aplicación web.

## Tokens de Diseño

### Colores

#### Colores de Fondo

```css
--primary-bg: #1a1a1c /* Fondo principal - Gris oscuro */ --secondary-bg: #2c2c2e
  /* Fondo secundario - Gris medio */ --tertiary-bg: #3a3a3c /* Fondo terciario - Gris claro */;
```

#### Colores de Texto

```css
--text-primary: #ffffff /* Texto principal - Blanco */ --text-secondary: #e0e0e6
  /* Texto secundario - Gris muy claro */ --text-muted: #b0b0b5 /* Texto muted - Gris medio */;
```

#### Colores de Acento (Marca)

```css
--accent-orange: #ff6600 /* Naranja principal - CTAs y hover */ --accent-bronze: #c87533
  /* Bronce - Variante de marca */ --accent-blue: #0a84ff
  /* Azul - Links y elementos interactivos */ --accent-green: #30d158 /* Verde - Éxito y WhatsApp */
  --accent-red: #ff453a /* Rojo - Errores y alertas */;
```

### Tipografía

#### Font Family

```css
font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
```

**Uso:** Tipografía del sistema Apple para consistencia con dispositivos del ecosistema.

#### Font Weights

```css
--font-weight-light: 300 /* Light */ --font-weight-regular: 400 /* Regular */
  --font-weight-medium: 500 /* Medium */ --font-weight-semibold: 600 /* Semibold */
  --font-weight-bold: 700 /* Bold */;
```

### Espaciado

#### Border Radius

```css
--border-radius-lg: 12px /* Grande - Cards, contenedores */ --border-radius-md: 8px
  /* Medio - Botones, inputs */ --border-radius-sm: 6px /* Pequeño - Badges, tags */;
```

### Animaciones

#### Pulse Animation

```css
@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
```

**Uso:** Elementos que requieren atención (CTAs, alertas).

## Componentes

### Botones

#### Primary Button (CTA)

```html
<button class="cta-button">Solicitar servicio</button>
```

**Estilo:** Fondo naranja (#FF6600), texto blanco, border radius 8px.

#### Secondary Button

```html
<button class="secondary-button">Más información</button>
```

**Estilo:** Borde naranja, texto naranja, fondo transparente.

### Navegación

#### Header Principal

- **Fondo:** Gradiente oscuro
- **Logo:** Imagen negro.png
- **Links:** Blanco con hover naranja
- **CTA:** Botón naranja

#### Mobile Menu

- **Animación:** Slide-in desde derecha
- **Backdrop:** Oscuro con blur
- **Links:** Stack vertical con animación stagger

### Cards

#### Service Card

```html
<div class="service-card">
  <img src="icon.png" alt="Icono" />
  <h3>Título del servicio</h3>
  <p>Descripción breve</p>
  <a href="#">Más información</a>
</div>
```

**Estilo:** Fondo secundario (#2C2C2E), border radius 12px, hover effect.

#### Testimonial Card

```html
<div class="testimonial-card">
  <p>"Cita del cliente"</p>
  <div class="client-info">
    <img src="avatar.png" alt="Cliente" />
    <span>Nombre del cliente</span>
  </div>
</div>
```

### Formularios

#### Input Fields

```html
<input type="text" class="form-input" placeholder="Nombre" />
```

**Estilo:** Fondo terciario (#3A3A3C), border radius 8px, focus border naranja.

#### Textarea

```html
<textarea class="form-textarea" placeholder="Mensaje"></textarea>
```

## Patrones de Layout

### Container

```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}
```

### Grid System

```css
.grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.grid-3 {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 768px) {
  .grid-2,
  .grid-3 {
    grid-template-columns: 1fr;
  }
}
```

### Flex Patterns

```css
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

.flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

## Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 640px) {
}

/* Tablet */
@media (min-width: 641px) and (max-width: 1024px) {
}

/* Desktop */
@media (min-width: 1025px) {
}
```

## Accesibilidad

### Contraste de Colores

- **Texto sobre fondo oscuro:** WCAG AA (4.5:1)
- **Texto grande sobre fondo oscuro:** WCAG AA (3:1)
- **Componentes interactivos:** WCAG AA (3:1)

### Focus States

Todos los elementos interactivos deben tener estado focus visible:

```css
:focus-visible {
  outline: 2px solid #ff6600;
  outline-offset: 2px;
}
```

### Screen Readers

- Usar `.sr-only` para contenido solo para screen readers
- Atributos `aria-label` en botones sin texto
- `alt` descriptivo en todas las imágenes

## Performance

### Optimizaciones CSS

- **CSS Containment:** En contenedores grandes
- **Will-change:** En elementos animados
- **Transform:** Preferir sobre top/left para animaciones
- **Opacity:** Preferir sobre visibility para transiciones

### Lazy Loading

```html
<img class="lazy-load" data-src="image.jpg" alt="Descripción" />
```

## Uso con Tailwind CSS

### Mapeo de Tokens a Tailwind

Los tokens del Design System están configurados en `tailwind.config.js`:

```javascript
colors: {
  primary: { bg: '#1A1A1C' },
  secondary: { bg: '#2C2C2E' },
  accent: {
    orange: '#FF6600',
    bronze: '#C87533',
    blue: '#0A84FF',
    green: '#30D158',
    red: '#FF453A',
  },
}
```

### Clases Utility Equivalecias

```css
/* Design System */
background-color: var(--primary-bg);

/* Tailwind Equivalente */
bg-primary-bg
```

## Guías de Uso

### Cuándo Usar Cada Color de Acento

- **Naranja (#FF6600):** CTAs principales, elementos que requieren acción
- **Bronce (#C87533):** Variaciones de marca, hover states
- **Azul (#0A84FF):** Links, navegación, información
- **Verde (#30D158):** Éxito, confirmaciones, WhatsApp
- **Rojo (#FF453A):** Errores, alertas, acciones destructivas

### Jerarquía Tipográfica

```html
<h1 class="text-4xl font-bold">Título Principal</h1>
<h2 class="text-3xl font-semibold">Subtítulo</h2>
<h3 class="text-2xl font-medium">Sección</h3>
<p class="text-base">Texto de párrafo</p>
<span class="text-muted text-sm">Texto secundario</span>
```

## Mantenimiento

### Actualización de Tokens

1. Actualizar valor en `docs/DESIGN_SYSTEM.md`
2. Actualizar en `tailwind.config.js`
3. Actualizar en `style.css` (si aún se usa)
4. Documentar cambio en CHANGELOG

### Adición de Nuevos Componentes

1. Definir en este documento
2. Crear en HTML/Tailwind
3. Agregar ejemplos de uso
4. Verificar accesibilidad
5. Testear en responsive

---

**Mantenedores:** Equipo de Desarrollo MacWave  
**Última actualización:** 12 de julio de 2026
