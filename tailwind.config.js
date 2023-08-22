/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textColor: "#817e7e",
        headerTextColor: "#6e6868",
        primaryColor: "#104795",
        secondaryColor: "#ffbd2f",
        whiteColor: "#f6f6e5",
      }
    },
  },
  plugins: [],
}
