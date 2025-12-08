/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jovian-black': '#0a0a0e',
        'jovian-slate': '#1e293b',
        'jovian-blue': '#00ffff',
        'jovian-red': '#ff4500',
        'jovian-green': '#39ff14',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Orbitron', 'monospace'],
      },
    },
  },
  plugins: [],
}
