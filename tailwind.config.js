/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textColor: "#04040A",
        headerTextColor: "#000000",
        mainColor: "#7A8C87",
        primaryColor: "#97a397",
        primaryColorDarker: "#0c3f85",
        secondaryColor: "#34CCA1",
        whiteColor: "#ffffff",
        shadColor: "rgb(230, 230, 230)",
        linearBackground: " rgba(0, 0, 0, 0.7)",
        aboutImage: "url('./Assets/vladimir-gladkov-eN9atEtVtcc-unsplash.jpg')",
      }
    },
  },
  plugins: [],
}
