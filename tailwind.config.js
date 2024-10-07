/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./public/js/script.js"],
  theme: {
    extend: {
      colors: {
        "custom-green": "#1DD100",
        "custom-yellow": "#FFBF0F",
        "custom-salmon": "#F78C9C",
      },
      fontFamily: {
        accent: ['"Raleway", sans-serif'],
      },
    },
  },
  plugins: [require("daisyui")],
};
