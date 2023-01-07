/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  daisyui: {
    themes: ["cmyk", "business"],
    darkTheme: "business",
    styled: true,
    utils: true,
  },
  theme: {
    fontFamily: {
      sans: ["Source Sans 3", "sans-serif"],
      serif: ["Work Sans", "serif"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
