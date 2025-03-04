module.exports = {
  content: [`./views/**/*.ejs`],// Watch the HTML files in the 'views' folder
    theme: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/typography'),
      require('daisyui'),
    ],
  }
  