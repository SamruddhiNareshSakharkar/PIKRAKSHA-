/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: '#071610',
          900: '#0c2219',
          850: '#102d22',
          800: '#14382a',
          700: '#1b4d3a',
          600: '#23654d',
          500: '#2e8163',
          100: '#e5f3ed',
          50: '#f0f9f5',
        },
        krishi: {
          gold: '#E3A008',
          amber: '#D97706',
          green: '#16A34A',
          red: '#DC2626',
          maroon: '#991B1B'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

