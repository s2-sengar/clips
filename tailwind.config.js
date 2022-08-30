/** @type {import('tailwindcss').Config} */
module.exports = {
  purge:{
    content: ['./src/**/*.{html,js}']

  },
  theme: {
    extend: {

    },
  },
  variants:{
    extends:{
      opacity:['disabled'],
      backgroundColor:['disabled']
    }
  },
  plugins: [],
}
