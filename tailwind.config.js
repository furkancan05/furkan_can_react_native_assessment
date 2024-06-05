/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#0e1011",
        "border-deactive": "#222b2a80",
        border: "#222b2a",
      },
    },
  },
  plugins: [],
};
