/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#031d25',
          teal: '#028f99',
          accent: '#14a36d',
        }
      }
    },
  },
  plugins: [],
}
