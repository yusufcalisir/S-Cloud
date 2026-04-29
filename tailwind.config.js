/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        snoonu: {
          orange: '#FF5A00',
          anthracite: '#1A1A1A',
        }
      }
    },
  },
  plugins: [],
}
