const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      "black-main": "#121212",
      "g-primary": "#1aa34a",
      "card-base": "#242424",
      "body-main": "#2a2a2a",
    },
    extend: {
      fontFamily: {
        "src-pro": ["Source Sans Pro", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
