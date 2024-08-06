const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}",
  flowbite.content(),
], // Asegúrate de que esta línea incluya '.jsx'
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar'),
  ],
};
