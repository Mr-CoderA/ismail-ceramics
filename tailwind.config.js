/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // adjust if your files are elsewhere
    "./public/index.html",
  ],
  theme: {
    extend: {
      screens: {
        md870: "870px", // custom breakpoint
      },
    },
  },
  plugins: [],
};
