# Guía para Desarrolladores - MacWave México

**Versión:** 1.0  
**Fecha:** 12 de julio de 2026

## Requisitos Previos

### Software Necesario
- **Node.js:** v18+ 
- **npm:** v9+
- **Git:** Última versión estable
- **Editor de código:** VS Code (recomendado)

### Extensiones de VS Code Recomendadas
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- GitLens
- Live Server

## Setup Inicial

### 1. Clonar el Repositorio
```bash
git clone https://github.com/hatRoot/MacWaveT2.git
cd MacWaveT2
```

### 2. Instalar Dependencias
```bash
npm install
```

**Nota:** Si encuentras error de permisos en npm cache:
```bash
sudo chown -R 501:20 "/Users/joelduran/.npm"
```

### 3. Configurar Git
```bash
git config user.name "Tu Nombre"
git config user.email "tu@email.com"
```

## Estructura del Proyecto

```
MacWaveT2/
├── docs/                    # Documentación técnica
│   ├── AUDIT_REPORT.md     # Auditoría completa
│   ├── DESIGN_SYSTEM.md    # Design System
│   ├── DEVELOPER_GUIDE.md  # Esta guía
│   ├── TAILWIND_GUIDE.md   # Guía de Tailwind
│   ├── QUALITY_RULES.md    # Reglas de calidad
│   └── ARCHITECTURE.md    # Arquitectura
├── css/                     # CSS específico (OPS)
├── js/                      # JavaScript específico
├── images/                  # Imágenes del sitio
├── scripts/                 # Scripts de automatización
├── supabase/                # Migrations y scripts de Supabase
├── cotizaciones/           # Sistema de cotizaciones
├── index.html              # Página principal
├── [landing-pages].html    # Páginas SEO
├── [ops-pages].html       # Páginas internas
├── style.css               # CSS monolítico (en migración)
├── tailwind.css            # CSS de entrada Tailwind
├── tailwind.config.js      # Configuración Tailwind
├── postcss.config.js       # Configuración PostCSS
└── package.json            # Dependencias y scripts
```

## Workflows de Desarrollo

### Desarrollo Local

#### 1. Iniciar Servidor Local
```bash
# Usando Live Server en VS Code
# O usando Python
python3 -m http.server 8000
```

#### 2. Compilar Tailwind CSS (Modo Watch)
```bash
npm run watch:css
```

Esto compila `tailwind.css` a `dist/output.css` automáticamente al guardar cambios.

#### 3. Abrir en Navegador
```
http://localhost:8000
```

### Flujo de Trabajo con Git

#### 1. Crear Branch para Feature
```bash
git checkout -b feature/nombre-feature
```

#### 2. Hacer Cambios y Commits
```bash
git add .
git commit -m "feat: descripción del cambio"
```

#### 3. Push y Pull Request
```bash
git push origin feature/nombre-feature
```

Luego crear Pull Request en GitHub.

#### 4. Merge a Main
```bash
git checkout main
git pull origin main
git merge feature/nombre-feature
git push origin main
```

## Estándares de Código

### JavaScript

#### ESLint
El proyecto usa ESLint para mantener calidad de código. Configuración en `.eslintrc.json`.

**Reglas principales:**
- Sin `console.log` en producción (usar `warn`)
- Usar `const`/`let` en lugar de `var`
- Arrow functions para callbacks
- Espaciado consistente (2 espacios)
- Punto y coma obligatorio

**Ejemplo correcto:**
```javascript
const handleClick = (event) => {
  event.preventDefault();
  const url = element.getAttribute('data-link');
  if (url && url !== '#') {
    window.location.href = url;
  }
};
```

#### Nombres de Variables
- **CamelCase** para variables y funciones
- **PascalCase** para clases y constructores
- **UPPER_SNAKE_CASE** para constantes

```javascript
const userName = 'John';
const MAX_RETRIES = 3;
class UserService { }
```

### HTML

#### Estructura
- Usar HTML5 semántico
- Indentación de 2 espacios
- Cerrar todas las etiquetas
- Atributos en minúsculas

```html
<header class="main-header">
  <nav class="main-nav">
    <a href="/" class="nav-link">Inicio</a>
  </nav>
</header>
```

#### Accesibilidad
- `alt` descriptivo en imágenes
- `aria-label` en botones sin texto
- Estructura semántica correcta
- Contraste de colores suficiente

### CSS/Tailwind

#### Clases Utility
Preferir clases de Tailwind sobre CSS custom:

```html
<!-- ✅ Correcto -->
<div class="bg-primary-bg text-white p-4 rounded-lg">

<!-- ❌ Evitar -->
<div style="background-color: #1A1A1C; color: white; padding: 1rem;">
```

#### Orden de Clases
Mantener orden consistente:
1. Layout (flex, grid)
2. Spacing (p, m)
3. Sizing (w, h)
4. Typography (text, font)
5. Colors (bg, text)
6. Borders (border, rounded)
7. Effects (shadow, opacity)
8. Transitions (transition, duration)

```html
<div class="flex items-center justify-between p-4 w-full text-lg bg-primary-bg rounded-lg shadow-lg transition-all">
```

## Testing

### Testing Manual
1. **Responsive:** Testear en mobile, tablet, desktop
2. **Cross-browser:** Chrome, Firefox, Safari
3. **Accesibilidad:** Verificar con screen reader
4. **Performance:** Usar Lighthouse en Chrome DevTools

### Testing Automatizado (Futuro)
El proyecto tiene Playwright instalado para E2E testing.

```bash
npm run test
```

## Despliegue

### Pre-despliegue Checklist
- [ ] Compilar Tailwind CSS: `npm run build:css`
- [ ] Verificar no hay `console.log` en producción
- [ ] Testear en múltiples navegadores
- [ ] Verificar responsive design
- [ ] Revisar SEO (meta tags, structured data)
- [ ] Limpiar archivos temporales
- [ ] Commit y push a GitHub

### Despliegue en Producción
El proyecto usa Hostgator con Apache.

1. **Sincronizar con GitHub:**
```bash
git push origin main
```

2. **Upload via FTP/SFTP:**
- Subir archivos modificados
- No subir `node_modules/`, `docs/`, `scripts/`

3. **Verificar en producción:**
- Abrir https://macwave.com.mx
- Testear funcionalidad principal
- Verificar Google Analytics

## Solución de Problemas Comunes

### Tailwind CSS no compila
**Problema:** `tailwindcss: command not found`

**Solución:**
```bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
```

### Estilos no se aplican
**Problema:** Cambios en Tailwind no se reflejan

**Solución:**
```bash
# Recompilar CSS
npm run build:css

# Limpiar cache del navegador
```

### Git push falla
**Problema:** Authentication failed

**Solución:**
```bash
# Verificar remote
git remote -v

# Reconfigurar credenciales
git config --global credential.helper osxkeychain
```

### Imágenes no cargan
**Problema:** Rutas incorrectas

**Solución:**
- Usar rutas relativas: `./images/nombre.png`
- Verificar mayúsculas/minúsculas (case-sensitive)
- Verificar archivo existe en `images/`

## Buenas Prácticas

### Commits
Usar conventional commits:
- `feat:` nueva funcionalidad
- `fix:` corrección de bug
- `docs:` cambios en documentación
- `style:` cambios de formato
- `refactor:` refactorización
- `test:` agregar tests
- `chore:` mantenimiento

```bash
git commit -m "feat: agregar formulario de contacto"
git commit -m "fix: corregir error en navegación móvil"
```

### Code Reviews
Antes de hacer push:
1. Revisar cambios con `git diff`
2. Verificar no hay código muerto
3. Confirmar que tests pasan
4. Verificar formatting (Prettier)

### Documentación
- Documentar funciones complejas
- Actualizar README si hay cambios mayores
- Agregar comentarios en código no obvio
- Mantener docs/ actualizado

## Recursos

### Documentación Interna
- [Design System](./DESIGN_SYSTEM.md)
- [Tailwind Guide](./TAILWIND_GUIDE.md)
- [Quality Rules](./QUALITY_RULES.md)
- [Architecture](./ARCHITECTURE.md)
- [Audit Report](./AUDIT_REPORT.md)

### Recursos Externos
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [MDN Web Docs](https://developer.mozilla.org/)
- [Supabase Docs](https://supabase.com/docs)
- [Google SEO Guide](https://developers.google.com/search/docs)

## Soporte

Para preguntas o problemas:
1. Revisar documentación interna
2. Buscar en issues de GitHub
3. Contactar al equipo de desarrollo

---

**Última actualización:** 12 de julio de 2026  
**Mantenedores:** Equipo de Desarrollo MacWave
