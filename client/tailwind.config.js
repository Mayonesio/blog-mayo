const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ], 
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '200% 200%' },
          '100%': { backgroundPosition: '400% 400%' },
        },
      },
      animation: {
        gradient: 'gradient 0.8s ease-in 1',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar'),
  ],
};
