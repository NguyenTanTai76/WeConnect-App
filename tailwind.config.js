/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          100: "#4b465c",
          200: "#f8f7fa",
        },
      },
    },
  },
  plugins: [],
};
