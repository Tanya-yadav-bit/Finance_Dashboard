/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',  // Indigo
        accent: '#22C55E',   // Green
        danger: '#EF4444',   // Red
        background: {
          light: '#F8FAFC',
          dark: '#0F172A',
        },
        card: {
          light: '#FFFFFF',
          dark: '#1E293B',
        },
        text: {
          primary: {
            light: '#111827',
            dark: '#E5E7EB',
          },
          secondary: {
            light: '#6B7280',
            dark: '#9CA3AF',
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
