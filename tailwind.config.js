/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const colors = require('tailwindcss/colors')

module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: {
        500: '#FC3967',
      },
      ...colors,
    },
    extend: {
      colors: {
        dark: {
          300: '#CBCCCC',
          400: '#AAAAAA',
          500: '#202020',
          600: '#121212',
          700: '#110F10',
          800: '#0E0C0D',
          900: '#0C0C0C',
        },
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
