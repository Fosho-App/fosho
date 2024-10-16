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
        "secondary-color": "#ACACAC",
        "background-main": "#151515",
        "primary-green": "#062310",
        "light-green": "#73A584"
      },
      boxShadow: {
        'event': '0px 2px 12px 0px #0623101A'
      }
    },
  },
  plugins: [],
};
export default config;
