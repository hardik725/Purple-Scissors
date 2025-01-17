/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'], // Adding custom font family
        elegant: ['Lora', 'serif'],  // Custom elegant font
        dancing: ['Dancing Script', 'cursive'],
        greatvibes: ['Great Vibes', 'cursive'],
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['"Poppins"', "sans-serif"],
        kugile: ['Kugile', 'sans-serif'],
        forum: ["'Forum'", "serif"],
        'parisienne-regular': ['Parisienne', 'serif'],
        'bodoni': ['"Bodoni Moda"', 'serif'],
      },
    },
  },
  plugins: [],
}
