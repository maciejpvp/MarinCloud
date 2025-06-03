import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },

  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        dark: {
          colors: {
            primary: {
              100: "#ffece4",
              200: "#ffd1c0",
              300: "#ffb29b",
              400: "#ff947e",
              500: "#f89971",
              600: "#ea7e56",
              700: "#cc5d3d",
              800: "#a9442e",
              900: "#7a2c1d",
              DEFAULT: "#f28a60",
            },
          },
        },
      },
    }),
  ],
};
