/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
          light: '#60A5FA',
        },
        accent: {
          DEFAULT: '#10B981',
          dark: '#059669',
          light: '#34D399',
        },
        danger: {
          DEFAULT: '#EF4444',
          dark: '#DC2626',
          light: '#F87171',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#F9FAFB',
          border: '#E5E7EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
