# Configuración de Tailwind CSS - MacWaveT2

**Estado:** Configuración creada, pendiente de instalación de dependencias

## Archivos Creados

### 1. tailwind.config.js

Archivo de configuración principal de Tailwind CSS v3.4.0.

**Características:**

- Content paths configurados para todos los HTML del proyecto
- Tokens de diseño basados en variables CSS existentes
- Colores de marca (accent orange, bronze, blue, green, red)
- Tipografía del sistema Apple
- Border radius consistentes

**Ubicación:** `/tailwind.config.js`

### 2. postcss.config.js

Configuración de PostCSS con plugins.

**Plugins:**

- tailwindcss: Procesa directivas @tailwind
- autoprefixer: Agrega prefijos de navegador automáticamente

**Ubicación:** `/postcss.config.js`

### 3. tailwind.css

Archivo de entrada CSS con directivas Tailwind.

**Contenido:**

- `@tailwind base`: Estilos base de Tailwind
- `@tailwind components`: Componentes personalizados
- `@tailwind utilities`: Utilidades de Tailwind
- Estilos base personalizados (box-sizing, body, sr-only)
- Componentes personalizados (lazy-load)

**Ubicación:** `/tailwind.css`

### 4. package.json (actualizado)

Scripts de build agregados:

```json
"scripts": {
  "build:css": "tailwindcss -i ./tailwind.css -o ./dist/output.css --minify",
  "watch:css": "tailwindcss -i ./tailwind.css -o ./dist/output.css --watch"
}
```

**Ubicación:** `/package.json`

## Pasos para Completar Instalación

### 1. Resolver permisos de npm cache

```bash
sudo chown -R 501:20 "/Users/joelduran/.npm"
```

### 2. Instalar dependencias

```bash
npm install
```

Esto instalará:

- tailwindcss@3.4.0 (degradado de v4.3.2 para estabilidad)
- autoprefixer@10.5.2
- postcss@8.5.17
- prettier@3.9.5
- prettier-plugin-tailwindcss@0.8.0

### 3. Compilar CSS por primera vez

```bash
npm run build:css
```

Esto generará `/dist/output.css` con Tailwind compilado y minificado.

### 4. Integrar en HTML

Agregar en el `<head>` de los archivos HTML:

```html
<link rel="stylesheet" href="dist/output.css" />
```

**IMPORTANTE:** No eliminar `style.css` todavía. Usar ambos en paralelo durante migración gradual.

## Tokens de Diseño Configurados

### Colores

```javascript
colors: {
  primary: { bg: '#1A1A1C', DEFAULT: '#1A1A1C' },
  secondary: { bg: '#2C2C2E', DEFAULT: '#2C2C2E' },
  tertiary: { bg: '#3A3A3C', DEFAULT: '#3A3A3C' },
  accent: {
    orange: '#FF6600',
    bronze: '#C87533',
    blue: '#0A84FF',
    green: '#30D158',
    red: '#FF453A',
  },
  text: {
    primary: '#FFFFFF',
    secondary: '#E0E0E6',
    muted: '#B0B0B5',
  },
}
```

### Tipografía

```javascript
fontFamily: {
  sans: [
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    'Helvetica',
    'Arial',
    'sans-serif',
  ],
}
```

### Border Radius

```javascript
borderRadius: {
  'lg': '12px',
  'md': '8px',
  'sm': '6px',
}
```

### Font Weight

```javascript
fontWeight: {
  light: '300',
  regular: '400',
  medium: '500',
  semibold: '600',
  bold: '700',
}
```

## Estrategia de Migración

### Fase 1: Configuración (COMPLETADO)

- ✅ Crear archivos de configuración
- ✅ Configurar tokens de diseño
- ✅ Preparar scripts de build

### Fase 2: Instalación (PENDIENTE)

- ⏳ Resolver permisos npm cache
- ⏳ Instalar dependencias
- ⏳ Compilar CSS inicial

### Fase 3: Integración Gradual (PENDIENTE)

- ⏳ Agregar Tailwind CSS a HTML (junto con style.css)
- ⏳ Migrar componentes uno por uno
- ⏳ Verificar funcionalidad

### Fase 4: Reemplazo Completo (PENDIENTE)

- ⏳ Eliminar style.css después de migración completa
- ⏳ Optimizar purging de CSS
- ⏳ Limpiar código no usado

## Notas Importantes

### Por qué Tailwind v3 en lugar de v4

- **v4 es experimental:** Arquitectura nueva sin CLI tradicional
- **v3 es estable:** Bien documentado, ampliamente usado
- **Compatibilidad:** Funciona con PostCSS y Autoprefixer existentes
- **Soporte:** Mayor comunidad y recursos disponibles

### Preservación de style.css

- **NO eliminar style.css** hasta migración completa
- Usar ambos CSS en paralelo durante transición
- Migrar componente por componente para evitar romper el sitio

### Content Paths

Configurados para escanear:

- Todos los HTML principales
- Landing pages SEO
- Páginas OPS (dashboard, tecnicos, etc.)
- Partials HTML
- Sistema de cotizaciones

## Comandos Útiles

### Desarrollo con hot reload

```bash
npm run watch:css
```

### Build de producción

```bash
npm run build:css
```

### Verificar tamaño del output

```bash
ls -lh dist/output.css
```

## Problema Actual

**Error:** npm cache tiene permisos root
**Solución:** Ejecutar como usuario:

```bash
sudo chown -R 501:20 "/Users/joelduran/.npm"
```

**Estado:** Configuración completa, esperando resolución de permisos para continuar instalación.

---

**Creado:** 12 de julio de 2026  
**Versión:** 1.0
