/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.js"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans KR"', 'sans-serif']
      },
      animation: {
        'float-normal': 'float-normal 10s ease-in-out infinite',
        'float-reverse': 'float-reverse 12s ease-in-out infinite',
      },
      keyframes: {
        'float-normal': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: 0.7 },
          '25%': { transform: 'translateY(-40px) translateX(30px)', opacity: 0.8 },
          '50%': { transform: 'translateY(-15px) translateX(45px)', opacity: 0.9 },
          '75%': { transform: 'translateY(25px) translateX(15px)', opacity: 0.8 },
        },
        'float-reverse': {
          '0%, 100%': { transform: 'translateY(0) translateX(0)', opacity: 0.7 },
          '25%': { transform: 'translateY(35px) translateX(-30px)', opacity: 0.8 },
          '50%': { transform: 'translateY(15px) translateX(-45px)', opacity: 0.9 },
          '75%': { transform: 'translateY(-25px) translateX(-15px)', opacity: 0.8 },
        },
      },
    },
  },
  plugins: [],
};
