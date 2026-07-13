/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './reparaciones.html',
    './empresas.html',
    './software.html',
    './casos-reales.html',
    './terminos.html',
    './upgrades.html',
    './actualizar-mac-os-vieja.html',
    './bateria-macbook-cdmx.html',
    './bateria-pantalla-iphone-express.html',
    './cambio-bateria-macbook-pro-air.html',
    './cambio-teclado-macbook-cdmx.html',
    './mac-mojada-cdmx.html',
    './mac-mojada-urgencia.html',
    './mantenimiento-macbook-cdmx.html',
    './reflow-gpu-mac.html',
    './reparacion-corto-logica-mac.html',
    './reparacion-flexgate-macbook.html',
    './reparacion-imac-cdmx.html',
    './reparacion-laptops-gamer-cdmx.html',
    './dashboard-ods.html',
    './tecnicos.html',
    './ods.html',
    './status-ods.html',
    './ticket-badge.html',
    './partials/*.html',
    './cotizaciones/**/*.html',
    './quality/design-system/components/*.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: '#1A1A1C',
          DEFAULT: '#1A1A1C'
        },
        secondary: {
          bg: '#2C2C2E',
          DEFAULT: '#2C2C2E'
        },
        tertiary: {
          bg: '#3A3A3C',
          DEFAULT: '#3A3A3C'
        },
        accent: {
          orange: '#FF6600',
          'orange-hover': '#FF7B33',
          bronze: '#C87533',
          blue: '#0A84FF',
          green: '#30D158',
          red: '#FF453A'
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#E0E0E6',
          muted: '#B0B0B5'
        },
        header: '#000101',
        footer: '#000000'
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"'
        ],
        brand: ['"Caveat Brush"', 'cursive']
      },
      fontWeight: {
        light: '300',
        regular: '400',
        medium: '500',
        semibold: '600',
        bold: '700'
      },
      borderRadius: {
        sm: '6px',
        md: '8px',
        lg: '12px',
        pill: '30px'
      },
      maxWidth: {
        container: '1200px',
        'section-desc': '700px'
      },
      spacing: {
        section: '120px'
      },
      zIndex: {
        dropdown: '100',
        sticky: '500',
        overlay: '1000',
        modal: '2000',
        floating: '3000',
        tooltip: '4000'
      },
      boxShadow: {
        'cta-hover': '0 6px 20px rgba(0, 0, 0, 0.3)',
        modal: '0 25px 50px rgba(0, 0, 0, 0.5)',
        'neon-green': '0 0 10px rgba(48, 209, 88, 0.2)',
        'neon-yellow': '0 0 10px rgba(255, 204, 0, 0.2)',
        'neon-orange': '0 0 10px rgba(255, 102, 0, 0.2)'
      },
      keyframes: {
        pulse: {
          '0%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(48, 209, 88, 0.7)' },
          '70%': { transform: 'scale(1.05)', boxShadow: '0 0 0 15px rgba(48, 209, 88, 0)' },
          '100%': { transform: 'scale(1)', boxShadow: '0 0 0 0 rgba(48, 209, 88, 0)' }
        },
        'tag-shimmer': {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' }
        },
        flash: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' }
        }
      },
      animation: {
        pulse: 'pulse 2s infinite',
        'tag-shimmer': 'tag-shimmer 3s infinite',
        flash: 'flash 1.5s infinite'
      },
      transitionDuration: {
        DEFAULT: '300ms'
      }
    }
  },
  plugins: []
};
