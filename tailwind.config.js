/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        kioskBackground: "#F4F2EE",
      },
      fontFamily: {
        kaushan: ['"Kaushan Script"', "cursive"],
        noto: ['"Noto Sans KR"', "sans-serif"],
        grover: ["Irish Grover", "cursive"],
      },
    },
  },
  plugins: [],
};
