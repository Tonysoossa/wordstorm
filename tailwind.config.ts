import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./containers/**/*.{js,ts,jsx,tsx}",
    "./assets/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        yellowCustom: "#ffd42f",
      },
      fontFamily: {
        geistMono: "var(--font-geist-mono)",
        doto: ["var(--font-doto)", "sans-serif"],
        silkscreen: ["var(--font-silkscreen)", "cursive"],
      },
    },
  },
  plugins: [],
} satisfies Config;
