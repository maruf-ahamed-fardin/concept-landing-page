import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FBF6EE",
        card: "#FFFDF9",
        sand: "#F4E9D8",
        ink: "#3B1F0E",
        clay: "#9E3B24",
        gur: "#B85D19",
        leaf: "#2D5A3C",
      },
      fontFamily: {
        serif: ['"Shohid Salam"', '"Tiro Bangla"', "serif"],
        body: ['"Alinur Tarunya"', '"Anek Bangla"', "sans-serif"],
        script: ['"Shohid Salam"', '"Tiro Bangla"', "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
