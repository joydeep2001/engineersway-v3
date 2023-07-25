/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    extend: {
      // backgroundColor: ["dark"],
      // textColor: ["dark"],

      animation: {
        blob: "blob 7s infinite",
      },
      fontSize: {
        large: "80px",
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px,0px) scale(1)",
          },
          "33%": {
            transform: "translate(30px,-50px) scale(1.1)",
          },
          "66%": {
            transform: "translate(-20px,20px) scale(0.9)",
          },
          "66%": {
            transform: "translate(0px,0px) scale(1)",
          },
        },
      },
      fontFamily: {
        Mont: "'Montserrat', sans-serif;",
      },
      width: {
        70: "280px",
      },
      colors: {
        orange: {
          500: "#f76116",
          400: "#f77416",
        },
        yellow: {
          1: "#FF7B01",
        },
        purple: {
          500: "#CA10E7",
          600: "#A7167D",
          700: "#900C3F",
        },
        black: {
          bg: "#050505",
          bg1: "#0d1117",
          bg2: "#1b192f",
          bg3: "#161b22;",
          bg4: "#1e293b",
        },
        white: {
          1: "#ffffff",
          2: "#F1F6FD",
        },
        violet: {
          1: "#231A36",
        },
        gradient: {
          1: "linear-gradient(95.32deg, #FF7B01 -5.54%, rgba(217, 217, 217, 0) 89.03%);",
          2: "linear-gradient(88.97deg, rgba(255, 123,1,0.18), 6.89% rgba(217,217,217,0) 169.95%;",
        },
        textshadow: {
          1: "1.152px 1.152px 0 transparent,1.728px 1.728px 0 #ff7b01;",
          2: "1.152px 1.152px 0 #fff,1.728px 1.728px 0 #ff7b01;",
        },
      },
      margin: {
        110: "36rem",
        120: "42rem",
      },
      boxShadow: {
        "3xl": "3px 3px 10px  rgba(0, 0, 0, 0.3)",
        "4xl": "3px 3px 20px 5px  rgba(0, 0, 0, 0.3)",
        yellow: " -20px 20px rgb(255 123 1 / 54%)",
        yellow1: "-20px 20px rgb(255 123 1 / 90%)",
        blob: "0 0 50px  rgb(255 123 1 / 25%)",
      },
      backgroundImage: {
        team: "url('/images/Team-b.png')",
        // 'footer-texture': "url('/img/footer-texture.png')",
        ethics: "url('/images/Rectangle12.png')",
      },
    },
  },
  variants: {
    extend: {
      scale: ["active"],
    },
  },
  plugins: [],
};
