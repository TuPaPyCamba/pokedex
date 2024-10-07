/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'poke-red' : '#D31A20',
        'poke-gray' : '#7A7A7A',
        'poke-md-white' : '#F6F6F4',
        'poke-blue': '#356ABC'
      }, 
      minHeight: {
        '80%': '80%'
      },
      boxShadow: {
        'up': '0 -4px 50px rgba(0, 0, 0, 0.5)'
      },
      screens: {
        '768px': '768px',
        '450px' : '500px'
      }
    },
  },
  plugins: [],
}