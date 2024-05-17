const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "black-main": "#121212",
        "black-secondary": "#252525",
        "black-tertiary": "rgb(30, 30, 30)",
        "g-primary": "#1aa34a",
        "card-base": "#242424",
        "body-main": "#2a2a2a",
        "card-accent": "#474545"
      },
      fontFamily: {
        "src-pro": ["Source Sans Pro", ...defaultTheme.fontFamily.sans]
      }
    },
    screens: {
      xs: "420px",
      xsm: "475px",
      sm: "640px",
      ...defaultTheme.screens
    }
  },
  plugins: []
};
