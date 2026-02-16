import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx,mdx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}", "./content/**/*.{md,mdx}"],
  theme: {
    extend: {
      colors: {
        canvas: "var(--canvas)",
        surface: "var(--surface)",
        "surface-soft": "var(--surface-soft)",
        ink: "var(--ink)",
        "ink-dim": "var(--ink-dim)",
        line: "var(--line)",
        brand: "var(--brand)",
        "brand-soft": "var(--brand-soft)"
      }
    }
  },
  plugins: [require("@tailwindcss/typography")]
};

export default config;
