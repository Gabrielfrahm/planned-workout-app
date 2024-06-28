import { colors } from "./src/styles/colors";
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors,
      fontFamily: {
        example: "Roboto_100Thin_Italic",
        test: "Roboto_400Regular",
      },
    },
  },
  plugins: [],
};
