import { colors } from "./src/styles/colors";
import { fonts } from "./src/styles/fonts";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors,
      fontFamily: {
        ...fonts,
      },
      spacing: {
        300: "22rem",
      },
    },
  },
  plugins: [],
};
