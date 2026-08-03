/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./design-system/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          50: "#f0f1f5",
          100: "#d3d5e0",
          200: "#a7abc2",
          300: "#7b81a3",
          400: "#4f5785",
          500: "#2c3560",
          600: "#232a4d",
          700: "#1a203a",
          800: "#121626",
          900: "#090c14",
          950: "#05070a"
        },
        gold: {
          50: "#fef9e7",
          100: "#fdf0c4",
          200: "#fce39d",
          300: "#fbd676",
          400: "#fac94f",
          500: "#d4a843",
          600: "#b8922e",
          700: "#8a6e1f",
          800: "#5c4914",
          900: "#2e240a",
          950: "#171205"
        }
      },
      fontFamily: {
        serif: ["'Cormorant Garamond'", "Georgia", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
