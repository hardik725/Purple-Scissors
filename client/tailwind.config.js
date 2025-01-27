/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        elegant: ['Lora', 'serif'],
        dancing: ['Dancing Script', 'cursive'],
        greatvibes: ['Great Vibes', 'cursive'],
        montserrat: ['Montserrat', 'sans-serif'],
        poppins: ['"Poppins"', "sans-serif"],
        kugile: ['Kugile', 'sans-serif'],
        forum: ["'Forum'", "serif"],
        'parisienne-regular': ['Parisienne', 'serif'],
        'bodoni': ['"Bodoni Moda"', 'serif'],
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        shimmer: {
          from: {
            backgroundPosition: "0 0",
          },
          to: {
            backgroundPosition: "-200% 0",
          },
        },
      },
    },
  },
  plugins: [],
}
