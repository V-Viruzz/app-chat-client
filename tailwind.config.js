/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/js/**/*.js'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0F172A',
        secondary: '#0A101E'
      }
    }
  },
  plugins: [require('tw-elements/plugin.cjs')],
  darkMode: 'class'
}
