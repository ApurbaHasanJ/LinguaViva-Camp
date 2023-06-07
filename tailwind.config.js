// tailwind.config.js

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
