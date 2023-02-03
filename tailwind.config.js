/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        plum: {
          100: '#e2d5ff',
          200: '#ceb3ff',
          300: '#b686ff',
          400: '#a956ff',
          500: '#a730ff',
          600: '#ae0dff',
          700: '#ae03ff',
          800: '#8907cc',
          900: '#3c0959'
        },
        bramble: {
          100: '#fce7f7',
          200: '#fbcff0',
          300: '#f9a8e2',
          400: '#f472cd',
          500: '#eb49b6',
          600: '#da2896',
          700: '#c81a81',
          800: '#9c1864',
          900: '#831856'
        }
      }
    },
  },
  plugins: [],
}
