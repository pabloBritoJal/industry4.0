/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        satoshi: ["Satoshi", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "primary-orange": "#FF5722",
        "primary-bound": "#f1faee",
        "green-pallet": "#2a9d8f",
        "green-pallet-dark": "#264653",
        "green-pallet-light": "#06d6a0",
        "orange-pallet-dark": "#f4a261",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
