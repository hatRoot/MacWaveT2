# Arquitectura del Proyecto - MacWave México

**Versión:** 1.0  
**Fecha:** 12 de julio de 2026

## Visión General

MacWave México es un sitio web de reparación de dispositivos Apple con arquitectura estática optimizada para SEO y performance, complementado con un sistema interno de gestión de órdenes (OPS) basado en Supabase.

## Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                        FRONTEND PÚBLICO                       │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Landing Pages│  │ Páginas     │  │ Páginas     │      │
│  │ SEO          │  │ Principales  │  │ de Soporte  │      │
│  │ (13 páginas) │  │ (4 páginas) │  │ (4 páginas) │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                 │                 │               │
│         └─────────────────┴─────────────────┘               │
│                           │                                   │
│                    ┌──────▼──────┐                            │
│                    │  style.css  │ ← CSS Monolítico (5806 líneas)│
│                    │ tailwind.css│ ← Tailwind CSS (en migración)│
│                    └──────┬──────┘                            │
│                           │                                   │
│                    ┌──────▼──────┐                            │
│                    │  script.js  │ ← JavaScript principal (486 líneas)│
│                    │ logo_const.js│ ← Logos en base64 (600KB) │
│                    └──────┬──────┘                            │
│                           │                                   │
└───────────────────────────┼───────────────────────────────────┘
                            │
┌───────────────────────────▼───────────────────────────────────┐
│                        BACKEND OPS                            │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Dashboard    │  │ Login        │  │ Sistema de   │      │
│  │ Técnico      │  │ de Técnicos │  │ Cotizaciones │      │
│  │ (dashboard-ods)│ │ (tecnicos)   │  │ (cotizaciones)│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                 │                 │               │
│         └─────────────────┴─────────────────┘               │
│                           │                                   │
│                    ┌──────▼──────┐                            │
│                    │  js/        │ ← JavaScript OPS           │
│                    │  ops-shared.js│ ← Utilidades compartidas│
│                    │  supabase-config.js│ ← Config Supabase │
│                    └──────┬──────┘                            │
│                           │                                   │
│                    ┌──────▼──────┐                            │
│                    │  Supabase   │ ← Backend como servicio    │
│                    │  (PostgreSQL)│ ← Base de datos           │
│                    │  Auth        │ ← Autenticación           │
│                    │  Storage    │ ← Almacenamiento          │
│                    └─────────────┘                            │
│                                                              │
└─────────────────────────────────────────────────────────────┘
                            │
┌───────────────────────────▼───────────────────────────────────┐
│                    INFRAESTRUCTURA                             │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Apache       │  │ GitHub       │  │ Hostgator    │      │
│  │ (.htaccess)  │  │ (Git repo)   │  │ (Hosting)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

## Estructura de Directorios

### Frontend Público
```
/
├── index.html                  # Página principal
├── reparaciones.html           # Página de servicios
├── empresas.html               # Página B2B
├── software.html               # Página de software
├── casos-reales.html           # Casos de éxito
├── terminos.html               # Términos y condiciones
├── upgrades.html               # Upgrades de hardware
├── [13 landing-pages].html     # Páginas SEO específicas
├── style.css                   # CSS monolítico principal
├── tailwind.css                # CSS de entrada Tailwind
├── script.js                   # JavaScript principal
├── logo_const.js              # Logos en base64
├── sw.js                      # Service Worker
├── .htaccess                   # Configuración Apache
├── robots.txt                  # Directivas para crawlers
├── sitemap.xml                 # Mapa del sitio
└── images/                     # Imágenes del sitio
```

### Sistema OPS (Interno)
```
/
├── dashboard-ods.html          # Dashboard principal de técnicos
├── tecnicos.html               # Login de técnicos
├── ods.html                    # Página de órdenes de servicio
├── status-ods.html             # Status de órdenes
├── ticket-badge.html           # Generador de tickets
├── js/
│   ├── ops-shared.js           # Utilidades compartidas OPS
│   ├── supabase-config.js      # Configuración Supabase
│   └── dashboard/             # JavaScript específico dashboard
├── css/
│   ├── ops-audit.css          # CSS para panel de auditoría
│   └── sidebar-ods.css        # CSS para sidebar OPS
└── cotizaciones/              # Sistema de cotizaciones
    ├── index.html
    ├── app.js
    ├── styles.css
    └── img/
```

### Backend y Scripts
```
/
├── supabase/                   # Configuración Supabase
│   ├── migrations/            # Migrations SQL
│   └── scripts/               # Scripts de backend
├── scripts/                    # Scripts de automatización
│   ├── build_landing_pages.py # Generador de landing pages
│   ├── sync_header.py         # Sincronizador de headers
│   └── [17 scripts más]       # Scripts de mantenimiento
└── node_modules/              # Dependencias npm
```

### Documentación
```
docs/
├── AUDIT_REPORT.md            # Auditoría completa
├── DESIGN_SYSTEM.md           # Design System
├── DEVELOPER_GUIDE.md         # Guía para desarrolladores
├── TAILWIND_GUIDE.md          # Guía de Tailwind CSS
├── QUALITY_RULES.md           # Reglas de calidad
├── ARCHITECTURE.md            # Este documento
└── TAILWIND_SETUP.md          # Configuración Tailwind
```

## Stack Tecnológico

### Frontend
- **HTML5:** Estructura semántica
- **CSS3:** Estilos con variables CSS
- **JavaScript (ES6+):** Lógica del cliente
- **Tailwind CSS v3.4:** Framework de utility CSS (en migración)
- **Service Worker:** Caching y PWA features

### Backend
- **Supabase:** Backend como servicio
  - PostgreSQL: Base de datos relacional
  - Auth: Autenticación de usuarios
  - Storage: Almacenamiento de archivos
  - Realtime: Actualizaciones en tiempo real

### Infraestructura
- **Apache:** Servidor web con .htaccess
- **Hostgator:** Hosting compartido
- **GitHub:** Control de versiones
- **Git:** Sistema de control de versiones distribuido

### Herramientas de Desarrollo
- **Node.js:** Runtime JavaScript
- **npm:** Gestor de paquetes
- **ESLint:** Linter de JavaScript
- **Prettier:** Formateador de código
- **Playwright:** Testing E2E (instalado, no configurado)
- **Python 3:** Scripts de automatización

## Flujo de Datos

### Usuario Final (Público)
```
Usuario → Navegador → HTML/CSS/JS → Apache → Respuesta estática
```

### Sistema OPS (Interno)
```
Técnico → Login → Supabase Auth → Dashboard → Supabase DB → CRUD Órdenes
```

### Cliente Tracking
```
Cliente → Navegador → Página tracking → Supabase DB → Timeline de reparación
```

## Base de Datos (Supabase)

### Tablas Principales
- **ordenes_servicio:** Órdenes de reparación
- **historial:** Timeline de reparaciones
- **tecnicos:** Usuarios técnicos
- **clientes:** Información de clientes

### Relaciones
```
ordenes_servicio (1) → (N) historial
tecnicos (1) → (N) ordenes_servicio
clientes (1) → (N) ordenes_servicio
```

## Seguridad

### Frontend Público
- **HTTPS forzado** via .htaccess
- **Security headers** configurados
- **Input sanitization** en JavaScript
- **XSS protection** headers

### Sistema OPS
- **Supabase Auth** para autenticación
- **Row Level Security (RLS)** en Supabase
- **Content Security Policy** en páginas OPS
- **Noindex/nofollow** en páginas internas

## Performance

### Optimizaciones Implementadas
- **GZIP/Brotli compression** en Apache
- **Browser caching** configurado
- **Critical CSS inline** en index.html
- **Lazy loading** de imágenes
- **Service Worker** para caching
- **CSS containment** para mejor render
- **Preconnect/DNS prefetch** para recursos externos

### Estrategia de Caching
```
1. Service Worker: Cache de CSS/JS/Imágenes
2. Browser Cache: Headers de cache en Apache
3. CDN: Recursos externos (Google Fonts, Supabase CDN)
```

## SEO

### Estrategia SEO
- **URLs limpias** sin .html
- **Structured Data** (JSON-LD) para LocalBusiness
- **Meta tags** optimizados (Open Graph, Twitter Cards)
- **Sitemap.xml** con prioridades
- **Robots.txt** configurado
- **Canonical tags** implementados
- **Landing pages SEO** por servicio

### Landing Pages SEO
- 13 páginas optimizadas para keywords específicas
- Contenido único por página
- Internal linking estratégico
- Schema markup por página

## Responsive Design

### Breakpoints
```css
/* Mobile First Approach */
base: 0-640px
sm: 640px+
md: 768px+
lg: 1024px+
xl: 1280px+
```

### Estrategia
- Mobile-first CSS
- Flexbox y Grid para layouts
- Media queries para breakpoints
- Touch-friendly UI (44px minimum touch targets)

## Accesibilidad

### Implementaciones
- **Semantic HTML** (header, nav, main, footer)
- **ARIA labels** en elementos interactivos
- **Alt text** en imágenes
- **.sr-only class** para screen readers
- **Keyboard navigation** soportado
- **Focus indicators** visibles

### WCAG Compliance
- Nivel AA para contraste de colores
- Navegación por teclado funcional
- Screen reader compatible

## Deployment

### Proceso de Despliegue
```
1. Desarrollo local
2. Git commit y push
3. Upload via FTP/SFTP a Hostgator
4. Verificación en producción
5. Monitoreo con Google Analytics
```

### Entornos
- **Local:** Desarrollo con Live Server
- **Staging:** No existe (deploy directo a producción)
- **Producción:** macwave.com.mx en Hostgator

## Monitoreo

### Google Analytics 4
- Tracking de páginas vistas
- Eventos de conversión
- Seguimiento de usuarios

### Logs
- Service Worker logs
- JavaScript console (en desarrollo)
- Supabase logs (via dashboard)

## Mantenimiento

### Tareas Regulares
- Actualizar sitemap.xml
- Revisar Google Search Console
- Actualizar dependencias npm
- Limpiar archivos temporales
- Revisar performance con Lighthouse

### Backups
- **Git:** Versionado de código
- **Supabase:** Backups automáticos de BD
- **Local:** Backups manuales de archivos críticos

## Roadmap Técnico

### Corto Plazo
- [ ] Completar migración a Tailwind CSS
- [ ] Implementar ESLint y Prettier
- [ ] Limpiar archivos temporales
- [ ] Mover logos de base64 a imágenes

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

## Decisiones Arquitectónicas

### Por qué HTML Estático
- **Performance:** Máxima velocidad de carga
- **SEO:** Mejor indexación por crawlers
- **Simplicidad:** Fácil mantenimiento
- **Costo:** Hosting económico

### Por qué Supabase para OPS
- **Rápido desarrollo:** Backend como servicio
- **Auth incluido:** Autenticación lista
- **Realtime:** Actualizaciones en vivo
- **Costo:** Generoso free tier

### Por qué Tailwind CSS (en migración)
- **Consistencia:** Design system enforceable
- **Velocidad:** Desarrollo más rápido
- **Mantenibilidad:** CSS más fácil de mantener
- **Bundle size:** Purging automático

### Por qué Apache (.htaccess)
- **Compatibilidad:** Funciona en Hostgator
- **Flexibilidad:** Configuración sin acceso a servidor
- **SEO:** URLs limpias y redirects fáciles
- **Performance:** Headers de cache y compresión

## Riesgos y Mitigación

### Riesgos Identificados
1. **CSS monolítico** → Migración a Tailwind en progreso
2. **Sin testing automatizado** → Playwright instalado, pendiente configuración
3. **Sin staging** → Deploy directo a producción (riesgo)
4. **Dependencia de base64** → Migración a imágenes planificada

### Mitigaciones
- Migración gradual a Tailwind
- Testing manual exhaustivo
- Backups antes de cambios mayores
- Monitoreo constante en producción

## Recursos

### Documentación Interna
- [Audit Report](./AUDIT_REPORT.md)
- [Design System](./DESIGN_SYSTEM.md)
- [Developer Guide](./DEVELOPER_GUIDE.md)
- [Quality Rules](./QUALITY_RULES.md)

### Documentación Externa
- [Supabase Docs](https://supabase.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Apache Docs](https://httpd.apache.org/docs/)

---

**Última actualización:** 12 de julio de 2026  
**Arquitecto:** Equipo de Desarrollo MacWave
