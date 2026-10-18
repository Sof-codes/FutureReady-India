/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pearl: {
          50: '#FAFBF9',
          100: '#F7F7F4',
          200: '#EFEFEA',
          300: '#E2E2D9'
        },
        ink: {
          900: '#111111',
          800: '#1A1D20',
          600: '#525252',
          400: '#737373',
          200: '#D4D4D4'
        },
        electric: {
          500: '#4F6FFF',
          600: '#3B59E5',
          700: '#2841CA'
        },
        mint: {
          300: '#B8E8D4',
          400: '#94D9BC'
        },
        lavender: {
          200: '#E9E7FF',
          300: '#D6D2FF'
        },
        darksection: '#111315'
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Newsreader', 'Georgia', 'serif']
      }
    },
  },
  plugins: [],
}
