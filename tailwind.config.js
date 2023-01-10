/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'Poppins': ["Poppins", "san-serif"]
      },
      animation: {
        'fly-in': 'in 1s ease-in-out',
        'fly-in-right': 'in_right 0.8s ease-in-out',
        'fly-out-left': 'out_left 0.8s ease-in-out'
      },
      keyframes: {
        in: {
          '0%': { transform: 'translateY(-20px)' },
          '100%': { transform: 'translateY(0px)' }
        },
        in_right: {
          '0%': { transform: 'translateX(+100%)' },
          '100%': { transform: 'translateX(0px)' }
        },
        out_left: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(+100%)' }
        }
      }
    },
  },
  plugins: [],
}

// npx tailwindcss -i ./dev/input.css -o ./src/assets/global.css --watch
