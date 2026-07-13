# Reglas de Calidad - MacWave México

**Versión:** 1.0  
**Fecha:** 12 de julio de 2026

## Visión General

Este documento define las reglas de calidad que todo el código debe seguir para mantener consistencia, mantenibilidad y estándares profesionales en el proyecto MacWave México.

## Reglas de Código

### JavaScript

#### 1. Sin Console.log en Producción

```javascript
// ❌ MAL
console.log('Usuario:', user);
console.debug('Debug info');

// ✅ BIEN
// Usar solo para debugging temporal y remover antes de commit
// Para logging en producción, implementar sistema de logging
```

#### 2. Usar const/let, Nunca var

```javascript
// ❌ MAL
var name = 'John';
var count = 0;

// ✅ BIEN
const name = 'John';
let count = 0;
```

#### 3. Arrow Functions para Callbacks

```javascript
// ❌ MAL
button.addEventListener('click', function () {
  handleClick();
});

// ✅ BIEN
button.addEventListener('click', () => {
  handleClick();
});
```

#### 4. Template Literals para Strings

```javascript
// ❌ MAL
const message = 'Hola ' + name + ', bienvenido';

// ✅ BIEN
const message = `Hola ${name}, bienvenido`;
```

#### 5. Destructuring para Objetos/Arrays

```javascript
// ❌ MAL
const name = user.name;
const email = user.email;

// ✅ BIEN
const { name, email } = user;
```

#### 6. Default Parameters

```javascript
// ❌ MAL
function greet(name) {
  name = name || 'Guest';
}

// ✅ BIEN
function greet(name = 'Guest') {
  // ...
}
```

#### 7. Early Returns

```javascript
// ❌ MAL
function processUser(user) {
  if (user) {
    if (user.isActive) {
      // procesar
    }
  }
}

// ✅ BIEN
function processUser(user) {
  if (!user) return;
  if (!user.isActive) return;
  // procesar
}
```

### HTML

#### 1. HTML5 Semántico

```html
<!-- ❌ MAL -->
<div class="header">
  <div class="nav">...</div>
</div>

<!-- ✅ BIEN -->
<header class="main-header">
  <nav class="main-nav">...</nav>
</header>
```

#### 2. Alt Text en Imágenes

```html
<!-- ❌ MAL -->
<img src="logo.png" />

<!-- ✅ BIEN -->
<img src="logo.png" alt="Logo de MacWave México" />
```

#### 3. ARIA Labels en Botones sin Texto

```html
<!-- ❌ MAL -->
<button class="close-btn">×</button>

<!-- ✅ BIEN -->
<button class="close-btn" aria-label="Cerrar">×</button>
```

#### 4. Estructura Correcta de Formularios

```html
<!-- ✅ BIEN -->
<form>
  <label for="email">Email</label>
  <input type="email" id="email" name="email" required />
  <button type="submit">Enviar</button>
</form>
```

#### 5. Meta Tags SEO Completos

```html
<!-- ✅ BIEN -->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Título descriptivo</title>
  <meta name="description" content="Descripción completa" />
  <link rel="canonical" href="https://macwave.com.mx/" />
</head>
```

### CSS/Tailwind

#### 1. Preferir Tailwind sobre CSS Custom

```html
<!-- ❌ MAL -->
<div style="background-color: #1A1A1C; padding: 1rem;">
  <!-- ✅ BIEN -->
  <div class="bg-primary-bg p-4"></div>
</div>
```

#### 2. Orden Consistente de Clases

```html
<!-- ✅ BIEN - Orden: Layout → Spacing → Sizing → Typography → Colors → Borders → Effects -->
<div
  class="flex w-full items-center justify-between rounded-lg bg-primary-bg p-4 text-lg shadow-lg"
></div>
```

#### 3. Evitar Magic Numbers

```css
/* ❌ MAL */
margin-top: 23px;
padding-left: 7px;

/* ✅ BIEN */
margin-top: 1.5rem; /* 24px */
padding-left: 0.5rem; /* 8px */
```

#### 4. Nombres Descriptivos de Clases

```css
/* ❌ MAL */
.btn1 {
}
.box2 {
}

/* ✅ BIEN */
.btn-primary {
}
.service-card {
}
```

## Reglas de Git

### 1. Mensajes de Commit Claros

```bash
# ❌ MAL
git commit -m "fix stuff"
git commit -m "update"

# ✅ BIEN
git commit -m "fix: corregir error en navegación móvil"
git commit -m "feat: agregar formulario de contacto"
```

### 2. Commits Atómicos

```bash
# ❌ MAL - Un commit con cambios no relacionados
git add .
git commit -m "varios cambios"

# ✅ BIEN - Commits separados por feature
git add header.html
git commit -m "feat: actualizar header"
git add footer.html
git commit -m "feat: actualizar footer"
```

### 3. Branches por Feature

```bash
# ✅ BIEN
git checkout -b feature/formulario-contacto
# Trabajar en feature
git push origin feature/formulario-contacto
# Crear PR
```

### 4. Nunca Commitear Archivos Temporales

```bash
# ❌ MAL - Archivos que no deben estar en git
node_modules/
.DS_Store
*.log
.env
```

## Reglas de Performance

### 1. Optimización de Imágenes

- Usar formato WebP cuando sea posible
- Comprimir imágenes antes de subir
- Usar lazy loading para imágenes below-the-fold
- Especificar width y height para evitar CLS

```html
<!-- ✅ BIEN -->
<img src="image.webp" alt="Descripción" width="800" height="600" loading="lazy" />
```

### 2. CSS Crítico Inline

```html
<!-- ✅ BIEN - CSS crítico inline para render rápido -->
<style>
  :root {
    --primary-bg: #1a1a1c;
  }
  body {
    background: var(--primary-bg);
  }
</style>
```

### 3. Minificación en Producción

```bash
# ✅ BIEN
npm run build:css  # Genera CSS minificado
```

### 4. Evitar Bloqueo de Render

```html
<!-- ✅ BIEN - Async/defer para scripts no críticos -->
<script src="script.js" defer></script>
<script src="analytics.js" async></script>
```

## Reglas de Seguridad

### 1. Sanitización de Inputs

```javascript
// ✅ BIEN - Sanitizar inputs del usuario
function sanitizeInput(input) {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
```

### 2. Content Security Policy

```html
<!-- ✅ BIEN - CSP en páginas sensibles -->
<meta
  http-equiv="Content-Security-Policy"
  content="default-src 'self'; script-src 'self' 'unsafe-inline';"
/>
```

### 3. No Exponer Datos Sensibles

```javascript
// ❌ MAL - API keys en código
const API_KEY = 'sk-1234567890abcdef';

// ✅ BIEN - Usar variables de entorno
const API_KEY = process.env.API_KEY;
```

### 4. HTTPS Obligatorio

```apache
# ✅ BIEN - .htaccess fuerza HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://macwave.com.mx/$1 [L,R=301]
```

## Reglas de Accesibilidad

### 1. Contraste de Colores

- Ratio mínimo 4.5:1 para texto normal
- Ratio mínimo 3:1 para texto grande
- Verificar con [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### 2. Navegación por Teclado

- Todos los elementos interactivos deben ser focusables
- Estilo de focus visible
- Orden lógico de tab

```css
/* ✅ BIEN */
:focus-visible {
  outline: 2px solid #ff6600;
  outline-offset: 2px;
}
```

### 3. Screen Readers

- Usar `.sr-only` para contenido solo para screen readers
- ARIA labels en elementos sin texto
- Alt text descriptivo en imágenes

```html
<!-- ✅ BIEN -->
<span class="sr-only">Solo visible para screen readers</span>
<button aria-label="Cerrar menú">×</button>
```

### 4. Semantic HTML

- Usar elementos semánticos (header, nav, main, footer)
- Estructura de headings correcta (h1 → h2 → h3)
- Labels para form inputs

## Reglas de SEO

### 1. URLs Limpias

```apache
# ✅ BIEN - .htaccess remueve .html
RewriteRule ^(.+)\.html$ /$1 [R=301,L]
```

### 2. Meta Tags Completos

```html
<!-- ✅ BIEN -->
<title>Título único y descriptivo</title>
<meta name="description" content="Descripción única" />
<link rel="canonical" href="URL canónica" />
```

### 3. Structured Data

```html
<!-- ✅ BIEN - JSON-LD para LocalBusiness -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "macWave México"
  }
</script>
```

### 4. Sitemap Actualizado

```xml
<!-- ✅ BIEN - sitemap.xml con todas las páginas -->
<url>
  <loc>https://macwave.com.mx/reparaciones</loc>
  <lastmod>2026-07-12</lastmod>
  <changefreq>weekly</changefreq>
  <priority>0.9</priority>
</url>
```

## Reglas de Testing

### 1. Testing Manual Requerido

- Testear en mobile, tablet, desktop
- Testear en Chrome, Firefox, Safari
- Testear accesibilidad con screen reader
- Verificar performance con Lighthouse

### 2. Cross-Browser Compatibility

- Verificar en los navegadores principales
- Fallbacks para features no soportadas
- Progressive enhancement

### 3. Responsive Design

- Testear breakpoints: 640px, 768px, 1024px, 1280px
- Verificar orientación móvil
- Testear touch targets (mínimo 44x44px)

## Reglas de Documentación

### 1. Código Complejo Requiere Comentarios

```javascript
// ✅ BIEN - Comentar lógica compleja
function calculateDiscount(price, isPremium) {
  // Premium users get 20% discount, regular users 10%
  const discountRate = isPremium ? 0.2 : 0.1;
  return price * (1 - discountRate);
}
```

### 2. Actualizar Documentación

- Actualizar docs/ cuando hay cambios mayores
- Actualizar README.md si hay cambios en setup
- Documentar nuevas features en guías apropiadas

### 3. Changelog

- Mantener registro de cambios importantes
- Documentar breaking changes
- Incluir fecha y versión

## Checklist de Code Review

### Antes de Commit

- [ ] No hay `console.log` en producción
- [ ] Código formateado con Prettier
- [ ] ESLint no muestra errores
- [ ] Tests pasan (si existen)
- [ ] Documentación actualizada
- [ ] No hay archivos temporales

### Antes de Push

- [ ] Branch actualizado con main
- [ ] Conflicts resueltos
- [ ] Build de CSS compilado
- [ ] Cambios probados en múltiples navegadores
- [ ] SEO verificado (meta tags, structured data)

### Antes de Merge

- [ ] Code review completado
- [ ] Tests aprobados
- [ ] Performance verificada
- [ ] Accesibilidad verificada
- [ ] Documentación completa

## Herramientas de Calidad

### ESLint

```bash
# Verificar código
npx eslint .

# Auto-fix
npx eslint . --fix
```

### Prettier

```bash
# Formatear código
npx prettier --write .

# Verificar formato
npx prettier --check .
```

### Lighthouse

```bash
# Auditoría de performance y accesibilidad
# Usar Chrome DevTools → Lighthouse
```

## Violaciones y Consecuencias

### Niveles de Severidad

#### CRÍTICO

- Security vulnerabilities
- Data exposure
- Broken functionality
- **Acción:** Bloquear merge hasta corregir

#### ALTO

- Performance issues severos
- Accesibilidad mayor
- SEO problems
- **Acción:** Requiere fix antes de merge

#### MEDIO

- Code style violations
- Missing documentation
- Minor performance issues
- **Acción:** Debería corregirse, pero puede mergearse con issue

#### BAJO

- Cosmetic issues
- Nice-to-have improvements
- **Acción:** Puede corregirse en siguiente PR

## Recursos

### Documentación

- [Design System](./DESIGN_SYSTEM.md)
- [Developer Guide](./DEVELOPER_GUIDE.md)
- [Tailwind Guide](./TAILWIND_GUIDE.md)
- [Architecture](./ARCHITECTURE.md)

### Herramientas

- [ESLint Docs](https://eslint.org/docs/latest/)
- [Prettier Docs](https://prettier.io/docs/en/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [WebAIM](https://webaim.org/)

---

**Última actualización:** 12 de julio de 2026  
**Mantenedores:** Equipo de Desarrollo MacWave
