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
          DEFAULT: '#22d3ee',  // cyan-400
          hover: '#06b6d4',    // cyan-500
          light: '#67e8f9',    // cyan-300
          dark: '#0891b2',     // cyan-600
        },
        accent: {
          DEFAULT: '#10b981',  // emerald-500
          hover: '#059669',    // emerald-600
          light: '#34d399',    // emerald-400
          dark: '#047857',     // emerald-700
        },
        background: {
          DEFAULT: '#0f172a',  // slate-900
          light: '#1e293b',    // slate-800
          dark: '#020617',     // slate-950
        }
      }
    },
  },
  plugins: [],
}