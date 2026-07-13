# Guía de Tailwind CSS - MacWave México

**Versión:** 1.0  
**Fecha:** 12 de julio de 2026

## Introducción

Tailwind CSS es un framework de utility-first CSS que permite construir diseños personalizados rápidamente sin salir de tu HTML. Este guía explica cómo usar Tailwind en el proyecto MacWave México.

## Configuración del Proyecto

### Archivos de Configuración

#### tailwind.config.js

Define los tokens de diseño y paths de contenido:

```javascript
module.exports = {
  content: [
    './index.html',
    './reparaciones.html'
    // ... todos los HTML del proyecto
  ],
  theme: {
    extend: {
      colors: {
        primary: { bg: '#1A1A1C' },
        accent: { orange: '#FF6600' }
        // ... más tokens
      }
    }
  }
};
```

#### tailwind.css

Archivo de entrada CSS:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Custom styles */
@layer base {
  /* Estilos base personalizados */
}

@layer components {
  /* Componentes personalizados */
}
```

#### postcss.config.js

Configuración de PostCSS:

```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
};
```

## Comandos

### Desarrollo

```bash
# Compilar con watch (hot reload)
npm run watch:css
```

### Producción

```bash
# Compilar y minificar
npm run build:css
```

## Tokens de Diseño en Tailwind

### Colores

#### Colores de Fondo

```html
<div class="bg-primary-bg">
  <!-- #1A1A1C -->
  <div class="bg-secondary-bg">
    <!-- #2C2C2E -->
    <div class="bg-tertiary-bg"><!-- #3A3A3C --></div>
  </div>
</div>
```

#### Colores de Texto

```html
<p class="text-primary"><!-- #FFFFFF --></p>
<p class="text-secondary"><!-- #E0E0E6 --></p>
<p class="text-muted"><!-- #B0B0B5 --></p>
```

#### Colores de Acento

```html
<button class="bg-accent-orange">
  <!-- #FF6600 -->
  <button class="bg-accent-bronze">
    <!-- #C87533 -->
    <button class="bg-accent-blue">
      <!-- #0A84FF -->
      <button class="bg-accent-green">
        <!-- #30D158 -->
        <button class="bg-accent-red"><!-- #FF453A --></button>
      </button>
    </button>
  </button>
</button>
```

### Tipografía

#### Font Family

```html
<p class="font-sans"><!-- Font del sistema Apple --></p>
```

#### Font Weight

```html
<p class="font-light"><!-- 300 --></p>
<p class="font-regular"><!-- 400 --></p>
<p class="font-medium"><!-- 500 --></p>
<p class="font-semibold"><!-- 600 --></p>
<p class="font-bold"><!-- 700 --></p>
```

#### Font Size

```html
<p class="text-xs"><!-- 0.75rem --></p>
<p class="text-sm"><!-- 0.875rem --></p>
<p class="text-base"><!-- 1rem --></p>
<p class="text-lg"><!-- 1.125rem --></p>
<p class="text-xl"><!-- 1.25rem --></p>
<p class="text-2xl"><!-- 1.5rem --></p>
<p class="text-3xl"><!-- 1.875rem --></p>
<p class="text-4xl"><!-- 2.25rem --></p>
```

### Espaciado

#### Padding

```html
<div class="p-0">
  <!-- 0 -->
  <div class="p-4">
    <!-- 1rem -->
    <div class="p-8">
      <!-- 2rem -->
      <div class="px-4">
        <!-- Horizontal -->
        <div class="py-4"><!-- Vertical --></div>
      </div>
    </div>
  </div>
</div>
```

#### Margin

```html
<div class="m-4">
  <!-- 1rem -->
  <div class="mx-auto">
    <!-- Horizontal auto -->
    <div class="my-4"><!-- Vertical --></div>
  </div>
</div>
```

### Border Radius

```html
<div class="rounded-sm">
  <!-- 6px -->
  <div class="rounded-md">
    <!-- 8px -->
    <div class="rounded-lg">
      <!-- 12px -->
      <div class="rounded-full"><!-- 50% --></div>
    </div>
  </div>
</div>
```

## Patrones Comunes

### Contenedor Centrado

```html
<div class="mx-auto max-w-6xl px-4">
  <!-- Contenido -->
</div>
```

### Grid de 2 Columnas

```html
<div class="grid grid-cols-1 gap-6 md:grid-cols-2">
  <div>Columna 1</div>
  <div>Columna 2</div>
</div>
```

### Grid de 3 Columnas

```html
<div class="grid grid-cols-1 gap-6 md:grid-cols-3">
  <div>Columna 1</div>
  <div>Columna 2</div>
  <div>Columna 3</div>
</div>
```

### Flex Center

```html
<div class="flex items-center justify-center">
  <!-- Contenido centrado -->
</div>
```

### Flex Between

```html
<div class="flex items-center justify-between">
  <div>Izquierda</div>
  <div>Derecha</div>
</div>
```

### Card Básica

```html
<div class="rounded-lg bg-secondary-bg p-6 shadow-lg">
  <h3 class="mb-4 text-xl font-bold">Título</h3>
  <p class="text-secondary">Descripción</p>
</div>
```

### Botón CTA

```html
<button
  class="rounded-lg bg-accent-orange px-6 py-3 font-semibold text-white transition-all hover:bg-opacity-90"
>
  Solicitar servicio
</button>
```

### Input Field

```html
<input
  type="text"
  class="w-full rounded-lg bg-tertiary-bg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-accent-orange"
  placeholder="Nombre"
/>
```

## Responsive Design

### Breakpoints

```css
sm: 640px   /* Mobile grande */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Desktop grande */
```

### Ejemplos Responsive

#### Texto Responsive

```html
<h1 class="text-2xl md:text-4xl lg:text-5xl">Título responsive</h1>
```

#### Grid Responsive

```html
<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
  <!-- Columnas que cambian según breakpoint -->
</div>
```

#### Padding Responsive

```html
<div class="px-4 md:px-8 lg:px-12">
  <!-- Padding que aumenta en pantallas grandes -->
</div>
```

#### Ocultar/Mostrar Elementos

```html
<div class="hidden md:block">
  <!-- Oculto en mobile, visible en desktop -->
</div>

<div class="block md:hidden">
  <!-- Visible en mobile, oculto en desktop -->
</div>
```

## Estados Interactivos

### Hover

```html
<button class="bg-accent-orange transition-colors hover:bg-accent-bronze">Hover me</button>
```

### Focus

```html
<input class="focus:outline-none focus:ring-2 focus:ring-accent-orange" />
```

### Active

```html
<button class="transition-transform active:scale-95">Click me</button>
```

## Componentes Personalizados

### @layer Components

Puedes crear componentes personalizados en `tailwind.css`:

```css
@layer components {
  .btn-primary {
    @apply rounded-lg bg-accent-orange px-6 py-3 font-semibold text-white transition-all hover:bg-opacity-90;
  }

  .card {
    @apply rounded-lg bg-secondary-bg p-6 shadow-lg;
  }
}
```

### Uso

```html
<button class="btn-primary">Botón primario</button>
<div class="card">Card personalizado</div>
```

## Pseudo-elementos

### Before/After

```html
<div class="before:block before:h-4 before:w-4 before:content-['']">
  <!-- Con pseudo-elemento -->
</div>
```

### First/Last Child

```html
<div class="first:mt-0 last:mb-0">
  <!-- Primer hijo sin margin-top, último sin margin-bottom -->
</div>
```

## Animaciones

### Transiciones

```html
<div class="transition-all duration-300 ease-in-out">
  <!-- Transición suave -->
</div>
```

### Transform

```html
<div class="transition-transform hover:scale-105">
  <!-- Escala al hover -->
</div>
```

### Opacity

```html
<div class="transition-opacity hover:opacity-80">
  <!-- Opacidad al hover -->
</div>
```

## Dark Mode (Futuro)

El proyecto usa un tema oscuro por defecto, pero puedes configurar dark mode:

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class'
  // ...
};
```

```html
<div class="bg-white dark:bg-gray-900">
  <!-- Claro por defecto, oscuro con .dark -->
</div>
```

## Optimización

### Purging

Tailwind automáticamente elimina CSS no usado en producción basado en los `content paths` en `tailwind.config.js`.

### Minificación

```bash
npm run build:css
```

Genera `dist/output.css` minificado.

## Integración con HTML Existente

### Estrategia de Migración

1. **NO eliminar** `style.css` inmediatamente
2. Agregar `dist/output.css` después de `style.css`
3. Migrar componente por componente
4. Verificar funcionalidad en cada paso
5. Eliminar `style.css` al final

### Ejemplo de Integración

```html
<head>
  <!-- CSS existente -->
  <link rel="stylesheet" href="style.css?v=26.5.1" />

  <!-- Tailwind CSS (agregar después) -->
  <link rel="stylesheet" href="dist/output.css" />
</head>
```

## Troubleshooting

### Clases no funcionan

**Problema:** Clases de Tailwind no se aplican

**Solución:**

1. Verificar que `dist/output.css` existe
2. Verificar que el HTML está en `content paths`
3. Recompilar: `npm run build:css`
4. Limpiar cache del navegador

### CSS no se actualiza

**Problema:** Cambios no se reflejan

**Solución:**

1. Asegurarse de estar en modo watch: `npm run watch:css`
2. Verificar que el archivo HTML esté guardado
3. Recargar página con Ctrl+Shift+R (hard refresh)

### Build falla

**Problema:** Error al compilar

**Solución:**

```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install

# Recompilar
npm run build:css
```

## Mejores Prácticas

### Orden de Clases

Mantener orden consistente para legibilidad:

```html
<div
  class="flex w-full items-center justify-between rounded-lg bg-primary-bg p-4 text-lg shadow-lg transition-all"
>
  <!-- 1. Layout (flex)
       2. Spacing (p-4)
       3. Sizing (w-full)
       4. Typography (text-lg)
       5. Colors (bg-primary-bg)
       6. Borders (rounded-lg)
       7. Effects (shadow-lg)
       8. Transitions (transition-all) -->
</div>
```

### Evitar Inline Styles

```html
<!-- ✅ Correcto -->
<div class="bg-primary-bg p-4 text-white">
  <!-- ❌ Evitar -->
  <div style="background-color: #1A1A1C; color: white; padding: 1rem;"></div>
</div>
```

### Usar Semantic HTML con Tailwind

```html
<!-- ✅ Correcto -->
<header class="bg-primary-bg p-4">
  <nav class="mx-auto max-w-6xl">
    <!-- Navigation -->
  </nav>
</header>

<!-- ❌ Evitar -->
<div class="bg-primary-bg p-4">
  <div class="mx-auto max-w-6xl">
    <!-- Navigation -->
  </div>
</div>
```

## Recursos

### Documentación Oficial

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)
- [Headless UI](https://headlessui.com/)

### Herramientas

- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Tailwind CSS Cheat Sheet](https://tailwindcomponents.com/cheatsheet/)

### Comunidad

- [Tailwind CSS Discord](https://tailwindcss.com/discord)
- [Twitter @tailwindcss](https://twitter.com/tailwindcss)

---

**Última actualización:** 12 de julio de 2026  
**Mantenedores:** Equipo de Desarrollo MacWave
