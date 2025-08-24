/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "15px",
    },
    screen: {
      sm: "640px",
      md: "768px",
      lg: "960px",
      xl: "1200px",
    },

    extend: {
      fontFamily: {
        primary: ["JetBrains Mono"],
      },
      colors: {
        primary: "#2E3440",  // Deep nordic blue
        accent: {
          DEFAULT: "#88C0D0", // Arctic blue
          hover: "#5E81AC",   // Darker arctic blue
        },
      },
    },
  },
  plugins: [],
};

