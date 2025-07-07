/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./style/**/*.css"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1b2a41",      // Azul oscuro
        secondary: "#8b2634",    // Rojo intenso
        "accent-yellow": "#f4b943", // Amarillo acento
        "accent-blue": "#5c9cd9",   // Azul claro
        "bg-light": "#e9ecf1",      // Casi blanco (fondo)
        "accent-orange": "#ffa859",  // Naranja nuevo
        black: "#222",               // Negro (más suave que el #000)
      },
      fontFamily: {
        serif: ['DM Serif Display', 'serif'],
        sans: ['Lato', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
