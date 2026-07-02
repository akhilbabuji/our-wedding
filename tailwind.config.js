/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        cream: {
          50: '#fdfbf7',
          100: '#f9f5ef',
          200: '#f3ece2',
        },
        blush: {
          50: '#fdf6f4',
          100: '#f8e8e4',
          200: '#f0d4cc',
          300: '#e8bfb4',
          400: '#d4a094',
          500: '#c4897a',
        },
        sage: {
          50: '#f4f6f2',
          100: '#e8ede3',
          200: '#d4dcc9',
          400: '#8a9a7b',
          500: '#6b7c62',
          600: '#55634e',
          700: '#3f4a3a',
        },
        gold: {
          300: '#e8d5a8',
          400: '#d4bc82',
          500: '#bfa05a',
        },
        charcoal: {
          DEFAULT: '#2c2c2c',
          light: '#4a4a4a',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
