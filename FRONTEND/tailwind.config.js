/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        maroon: {
          DEFAULT: '#8B0000',
          dark:    '#5C0000',
          soft:    '#B22222',
        },
        'orbit-green': {
          DEFAULT: '#2D6A4F',
          dark:    '#1B4332',
        },
        surface: '#F8F8F8',
      },
      fontFamily: {
        sans:    ['DM Sans', 'sans-serif'],
        display: ['Sora', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 4px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)',
      },
    },
  },
  plugins: [],
};