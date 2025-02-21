/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')
delete colors.lightBlue
delete colors.warmGray
delete colors.trueGray
delete colors.coolGray
delete colors.blueGray
export default {
  content: ['./src/**/*.vue'],
  theme: {
    colors: {
      ...colors,
      main: '#F96238'
    }
  },
  plugins: []
}
