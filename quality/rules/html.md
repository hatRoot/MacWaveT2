# Reglas HTML — MacWave Quality Harness

**Versión:** 1.0

## Estructura Obligatoria

```html
<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!-- SEO meta tags -->
    <!-- Preconnect / preload críticos -->
    <link rel="stylesheet" href="style.css?v=X.X.X" />
    <!-- NO añadir CDN Tailwind en producción -->
  </head>
  <body>
    <header>...</header>
    <main>...</main>
    <footer>...</footer>
    <script src="script.js"></script>
  </body>
</html>
```

## SEO — No Modificar

- `<title>` único por página
- `<meta name="description">` único
- JSON-LD structured data intacto
- `<link rel="canonical">` correcto
- Open Graph y Twitter Cards

## Clases Controladas por JavaScript

**NO renombrar ni eliminar:**

| Clase                  | Archivo JS          | Función            |
| ---------------------- | ------------------- | ------------------ |
| `menu-active`          | `script.js`, inline | Menú móvil abierto |
| `active`               | `script.js`         | Estados activos    |
| `loaded`               | `script.js`         | Lazy load imágenes |
| `modal-overlay.active` | `script.js`         | Modales            |
| `scrolled`             | `script.js`         | Header scroll      |

## Versionado CSS

```html
<!-- Cache busting obligatorio en cambios CSS -->
<link rel="stylesheet" href="style.css?v=26.7.10b" />
```

## Páginas del Proyecto

| Categoría            | Cantidad | CSS                             |
| -------------------- | -------- | ------------------------------- |
| Públicas principales | 5        | `style.css`                     |
| Landing pages SEO    | 13       | `style.css`                     |
| Soporte/legal        | 2        | `style.css`                     |
| OPS interno          | 6        | `style.css` + `sidebar-ods.css` |
| Cotizaciones         | 1        | `cotizaciones/styles.css`       |
| Partials             | 1        | Hereda de página padre          |
