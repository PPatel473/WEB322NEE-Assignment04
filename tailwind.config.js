module.exports = {
  content: ["./views/**/*.ejs", "./public/**/*.js"], // Watch for classes in EJS and JS files
  theme: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("daisyui"), // Remove this if you're not using DaisyUI
  ],
};
