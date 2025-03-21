/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D6A4F',     // Tennis Green
        secondary: '#E9C46A',   // Tennis Ball Yellow
        accent: '#1A759F',      // Court Blue
        background: '#F8F9FA',  // Light Gray
        text: '#343A40',        // Dark Gray
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '8px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
} 