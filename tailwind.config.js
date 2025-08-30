/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#007bff',
          dark: '#0056b3',
        },
        secondary: {
          DEFAULT: '#6c757d',
          dark: '#545b62',
        },
        muted: '#6c757d',
        light: '#f8f9fa',
        dark: '#343a40',
        // Cores para tema escuro
        'dark-bg': '#1a1a1a',
        'dark-surface': '#2d2d2d',
        'dark-border': '#404040',
        'dark-text': '#e5e5e5',
        'dark-text-secondary': '#a0a0a0',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      gridTemplateColumns: {
        '15': 'repeat(15, minmax(0, 1fr))',
        '18': 'repeat(18, minmax(0, 1fr))',
      },
    },
  },
  plugins: [],
}
