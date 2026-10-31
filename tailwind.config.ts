import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        turquoise: {
          DEFAULT: "#00B8A9",
          hover: "#009E91",
          light: "#E6F8F6",
        },
        navy: {
          DEFAULT: "#243447",
          dark: "#17222F",
          light: "#35495E",
        },
        gold: {
          DEFAULT: "#F7B731",
          hover: "#E5A620",
          light: "#FEF7E6",
        },
        coral: {
          DEFAULT: "#F0654C",
          hover: "#D9533B",
          light: "#FDEFEA",
        },
        surface: {
          DEFAULT: "#F4F8FB",
          card: "#FFFFFF",
          muted: "#EAEFF4",
        },
      },
      borderRadius: {
        "2xl": "16px",
      },
      boxShadow: {
        soft: "0 4px 20px -2px rgba(36, 52, 71, 0.08)",
        card: "0 2px 12px rgba(36, 52, 71, 0.06)",
        hover: "0 8px 24px -4px rgba(0, 184, 169, 0.15)",
      },
    },
  },
  plugins: [],
};
export default config;

