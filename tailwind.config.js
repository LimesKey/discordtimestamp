/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'Poppins': ["Poppins", "san-serif"]
      },
      animation: {
        'fly-in': 'in 1s',
      },
      keyframes: {
        in: {
          '0%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0px)' }
        }
      }
    },
  },
  plugins: [],
}

// npx tailwindcss -i ./dev/input.css -o ./src/assets/global.css --watch
