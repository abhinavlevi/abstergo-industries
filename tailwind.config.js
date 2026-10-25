/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        abstergo: {
          primary: '#0B2545',
          dark: '#081C36',
          slate: '#1E293B',
          navy: '#091E3A',
          red: '#C8381A',
          amber: '#D97706',
          gold: '#C5A059',
          light: '#F8FAFC',
          border: '#E2E8F0',
          muted: '#64748B',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'monospace'],
        display: ['Rajdhani', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'card-elevated': '0 20px 40px -15px rgba(11, 37, 69, 0.2), 0 0 0 1px rgba(11, 37, 69, 0.05)',
        'chip-inset': 'inset 0 1px 2px rgba(0,0,0,0.3)',
      }
    },
  },
  plugins: [],
}
