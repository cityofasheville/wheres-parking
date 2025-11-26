/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    extend: {
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'wp-blue-dark': '#002e5c',
        'wp-blue': '#3498db',
        'wp-blue-light': '#f6fcff',
      },
      hocus: ['&:hover', '&:focus'],
    },
  },
  plugins: [],
};
