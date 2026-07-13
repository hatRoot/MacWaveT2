# MacWave México - Sitio Web de Reparación Apple

**Versión:** 1.1  
**Última actualización:** 13 de julio de 2026

## Descripción

MacWave México es un sitio web especializado en reparación de dispositivos Apple a nivel componente en Ciudad de México. Ofrece servicios de reparación para MacBook, iMac, iPhone y iPad con garantía de 2 años en baterías.

## Características

### Frontend Público

- **37 páginas HTML** optimizadas para SEO
- **13 landing pages** específicas por servicio
- **Sistema de tracking** de reparaciones para clientes
- **Responsive design** para mobile, tablet y desktop
- **SEO optimizado** con structured data, sitemap y meta tags
- **Performance optimizado** con Service Worker, caching y compresión

### Sistema OPS (Interno)

- **Dashboard técnico** para gestión de órdenes
- **Sistema de autenticación** con Supabase
- **Tracking de reparaciones** en tiempo real
- **Generador de cotizaciones** PDF
- **Timeline visual** del estado de reparaciones

### Stack Tecnológico

- **Frontend:** HTML5, CSS3, JavaScript (ES6+)
- **CSS Framework:** Tailwind CSS v3.4 (infraestructura completa, migración CSS ~1%)
- **Backend:** Supabase (PostgreSQL, Auth, Storage)
- **Hosting:** Hostgator con Apache
- **Control de Versiones:** Git y GitHub

## Estructura del Proyecto

```
MacWaveT2/
├── quality/                 # Tailwind Quality Harness
│   ├── checklists/          # Checklists operativos
│   ├── rules/               # Reglas CSS, HTML, JS, Tailwind
│   ├── tokens/              # Design tokens JSON
│   ├── design-system/       # 14 componentes documentados
│   ├── architecture/        # Estrategia CSS
│   ├── validation/          # Scripts de validación
│   └── scripts/             # migration-status.js
├── docs/                    # Documentación técnica
│   ├── MIGRATION_REPORT.md  # Estado real de migración
│   ├── VALIDATION_REPORT.md # Última validación
│   ├── QUALITY_HARNESS.md   # Quality Harness
│   ├── COMPONENT_LIBRARY.md # Catálogo de componentes
│   ├── DESIGN_SYSTEM.md     # Design System
│   ├── DEVELOPER_GUIDE.md   # Guía para desarrolladores
│   ├── TAILWIND_GUIDE.md    # Guía de Tailwind CSS
│   ├── QUALITY_RULES.md     # Reglas de calidad
│   └── ARCHITECTURE.md      # Arquitectura del proyecto
├── dist/                    # Build Tailwind (output.css)
├── css/                     # CSS específico (OPS)
├── js/                      # JavaScript específico
├── images/                  # Imágenes del sitio
├── scripts/                 # comparar.js (regresión visual)
├── supabase/                # Migrations y scripts de Supabase
├── cotizaciones/            # Sistema de cotizaciones
├── index.html               # Página principal
├── style.css                # CSS monolítico activo (5,806 líneas)
├── tailwind.css             # Entrada Tailwind + @layer components
├── tailwind.config.js       # Tokens de diseño
├── .editorconfig            # EditorConfig
├── .eslintrc.json           # ESLint
└── .prettierrc.json         # Prettier + plugin Tailwind
```

## Requisitos Previos

- **Node.js:** v18+
- **npm:** v9+
- **Git:** Última versión estable

## Instalación

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

### 3. Compilar Tailwind CSS

```bash
# Desarrollo con hot reload
npm run watch:css

# Producción (minificado)
npm run build:css
```

## Desarrollo

### Servidor Local

```bash
# Usando Python
python3 -m http.server 8000

# O usando Live Server en VS Code
```

Luego abrir `http://localhost:8000`

### Scripts Disponibles

```bash
npm run build:css        # Compilar Tailwind → dist/output.css
npm run watch:css        # Modo watch para desarrollo
npm run lint             # ESLint (quality scripts)
npm run format           # Prettier
npm run validate         # Validación completa del Quality Harness
npm run migration:status # Reporte de estado de migración
npm run test:visual      # Regresión visual (Playwright)
```

## Documentación

### Guías Técnicas

- [**Migration Report**](docs/MIGRATION_REPORT.md) - Estado real de migración (~1% CSS)
- [**Validation Report**](docs/VALIDATION_REPORT.md) - Última validación
- [**Quality Harness**](docs/QUALITY_HARNESS.md) - Sistema de calidad
- [**Component Library**](docs/COMPONENT_LIBRARY.md) - 14 componentes documentados
- [**Design System**](docs/DESIGN_SYSTEM.md) - Tokens de diseño
- [**Developer Guide**](docs/DEVELOPER_GUIDE.md) - Guía para desarrolladores
- [**Tailwind Guide**](docs/TAILWIND_GUIDE.md) - Guía de Tailwind CSS
- [**Architecture**](docs/ARCHITECTURE.md) - Arquitectura del proyecto

## Configuración

### Tailwind CSS

El proyecto usa Tailwind CSS v3.4 con configuración personalizada en `tailwind.config.js`:

- Tokens de diseño basados en variables CSS existentes
- Content paths configurados para todos los HTML
- Colores de marca (accent orange, bronze, blue, green, red)
- Tipografía del sistema Apple

### ESLint

Configuración en `.eslintrc.json` con reglas para:

- Calidad de código JavaScript
- Sin console.log en producción
- Espaciado consistente
- Best practices de ES6+

### Prettier

Configuración en `.prettierrc.json` con:

- Prettier plugin para Tailwind CSS
- Formato consistente
- Integración con ESLint

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

1. Sincronizar con GitHub: `git push origin main`
2. Upload via FTP/SFTP a Hostgator
3. Verificar en https://macwave.com.mx
4. Testear funcionalidad principal

## SEO

### Características SEO

- **URLs limpias** sin .html (via .htaccess)
- **Structured Data** (JSON-LD) para LocalBusiness
- **Meta tags** optimizados (Open Graph, Twitter Cards)
- **Sitemap.xml** con prioridades
- **Robots.txt** configurado
- **Canonical tags** implementados
- **13 landing pages** optimizadas por keyword

### Herramientas SEO

- Google Search Console
- Google Analytics 4
- Lighthouse (Chrome DevTools)

## Performance

### Optimizaciones Implementadas

- **GZIP/Brotli compression** en Apache
- **Browser caching** configurado
- **Critical CSS inline** en index.html
- **Lazy loading** de imágenes
- **Service Worker** para caching
- **CSS containment** para mejor render
- **Preconnect/DNS prefetch** para recursos externos

### Métricas Objetivo

- **Lighthouse Performance:** 90+
- **First Contentful Paint:** < 1.5s
- **Largest Contentful Paint:** < 2.5s
- **Time to Interactive:** < 3.5s

## Seguridad

### Implementaciones

- **HTTPS forzado** via .htaccess
- **Security headers** configurados
- **Input sanitization** en JavaScript
- **XSS protection** headers
- **Supabase Auth** para páginas internas
- **Content Security Policy** en páginas OPS

## Accesibilidad

### Características

- **Semantic HTML** (header, nav, main, footer)
- **ARIA labels** en elementos interactivos
- **Alt text** en imágenes
- **.sr-only class** para screen readers
- **Keyboard navigation** soportado
- **Focus indicators** visibles
- **WCAG AA compliance** para contraste

## Testing

### Testing Manual

- Testear en mobile, tablet, desktop
- Testear en Chrome, Firefox, Safari
- Testear accesibilidad con screen reader
- Verificar performance con Lighthouse

### Testing Automatizado (Futuro)

- Playwright instalado para E2E testing
- Pendiente configuración de tests

## Contribución

### Flujo de Trabajo

1. Crear branch para feature: `git checkout -b feature/nombre-feature`
2. Hacer cambios y commits: `git commit -m "feat: descripción"`
3. Push y crear Pull Request
4. Code review y merge a main

### Estándares de Código

- Seguir [Quality Rules](docs/QUALITY_RULES.md)
- Usar ESLint y Prettier
- Documentar cambios complejos
- Actualizar documentación cuando sea necesario

## Soporte

Para preguntas o problemas:

1. Revisar [documentación interna](docs/)
2. Buscar en [issues de GitHub](https://github.com/hatRoot/MacWaveT2/issues)
3. Contactar al equipo de desarrollo

## Licencia

Este proyecto es propiedad de MacWave México. Todos los derechos reservados.

## Créditos

- **Desarrollo:** Equipo de Desarrollo MacWave
- **Diseño:** MacWave México
- **Hosting:** Hostgator
- **Backend:** Supabase

## Roadmap

### Corto Plazo

- [x] Quality Harness completo (`quality/`)
- [x] Design System tokens y 14 componentes documentados
- [x] ESLint, Prettier, EditorConfig configurados
- [x] Build Tailwind (`dist/output.css`)
- [ ] Migrar `index.html` componente por componente
- [ ] Regresión visual con `comparar.js`
- [ ] Adoptar `dist/output.css` en HTML

### Mediano Plazo

- [ ] Implementar sistema de componentes HTML
- [ ] Agregar testing automatizado
- [ ] Implementar staging environment
- [ ] Optimizar imágenes (WebP)

### Largo Plazo

- [ ] Considerar migración a framework moderno
- [ ] Implementar CI/CD
- [ ] Agregar monitoring de errores
- [ ] Optimizar Core Web Vitals

## Contacto

- **Sitio Web:** https://macwave.com.mx
- **Email:** contacto@macwave.com.mx
- **Teléfono:** 55-3575-7364
- **WhatsApp:** https://wa.me/525535757364

---

**Última actualización:** 13 de julio de 2026  
**Versión:** 1.1
