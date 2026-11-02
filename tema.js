// Colores y formas de la Plantilla Institucional PECOM I&C 2026. Se cargan después de Tailwind.
tailwind.config = {
  theme: {
    extend: {
      colors: {
        pecom: { marino: '#102B52', titulo: '#1A325E', azul: '#005489', celeste: '#71CFEB', cielo: '#57C5E7' },
        slate: {
          50: '#F8F9FA', 100: '#F2F2F2', 200: '#E7E6E6', 300: '#AEB6C2', 400: '#8791A3', 500: '#5B6B82',
          600: '#46587A', 700: '#1A325E', 800: '#102B52', 900: '#102B52'
        },
        blue: {
          50: '#EAF7FC', 100: '#D5EFF8', 200: '#BFE8F5', 300: '#71CFEB', 400: '#57C5E7', 500: '#0A6FA8',
          600: '#005489', 700: '#005489', 800: '#102B52', 900: '#102B52'
        }
      },
      // La plantilla usa rectángulos con una sola esquina redondeada, arriba a la derecha
      borderRadius: { lg: '0 8px 0 0', xl: '0 16px 0 0' }
    }
  }
};
