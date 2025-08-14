/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontSize: {
        10: "10px",
      },
      colors: {
        dark: {
          100: "#4b465c",
          200: "#f8f7fa",
          300: "#dbdade",
          400: "#909090",
        },
        primary: {
          main: "#246aa3",
        },
      },
    },
  },
  plugins: [],
};
