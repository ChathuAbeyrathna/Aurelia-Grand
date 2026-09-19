/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        ivory: '#F7F4EC',
        parchment: '#F0EAE0',
        stone: {
          light: '#DCD4C4',
          DEFAULT: '#C9BFAD',
          dark: '#8C8271'
        },
        charcoal: {
          DEFAULT: '#211F1B',
          soft: '#3A3730'
        },
        moss: {
          DEFAULT: '#576450',
          dark: '#3E4838'
        },
        brass: {
          DEFAULT: '#A9814F',
          soft: '#C7A46B',
          line: '#B79A6E'
        }
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"Manrope"', 'sans-serif']
      },
      letterSpacing: {
        wideish: '0.04em'
      },
      maxWidth: {
        content: '1400px'
      },
      transitionTimingFunction: {
        signature: 'cubic-bezier(0.65, 0, 0.35, 1)'
      }
    }
  },
  plugins: []
}
