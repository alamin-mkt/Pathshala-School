import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1.5rem",
      screens: {
        "2xl": "1340px",
      },
    },
    extend: {
      colors: {
        navy: {
          50: "#EEF3F9",
          100: "#D7E3F1",
          200: "#B0C7E3",
          300: "#83A7D3",
          400: "#5D8BC4",
          500: "#3F5F9A",
          600: "#2B4B87",
          700: "#1B3A7A",
          800: "#122E68",
          900: "#0B2558",
          950: "#061536",
        },
        gold: {
          50: "#FEF9EC",
          100: "#FDF1CF",
          200: "#FBE19F",
          300: "#F8CD6A",
          400: "#F4BD44",
          500: "#F0B33A",
          600: "#D49419",
          700: "#A76F10",
          800: "#865613",
          900: "#6F4514",
        },
        green: {
          50: "#E8F5EC",
          100: "#C9EAD2",
          200: "#99D6AA",
          300: "#61BE7C",
          400: "#39A457",
          500: "#269546",
          600: "#1F8A3E",
          700: "#186E32",
          800: "#17572B",
          900: "#144825",
        },
        slate: {
          50: "#F5F7FA",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "var(--school-primary, #0B2558)",
          foreground: "var(--school-primary-foreground, #FFFFFF)",
        },
        secondary: {
          DEFAULT: "var(--school-secondary, #1B3A7A)",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "var(--school-accent, #F0B33A)",
          foreground: "#0B2558",
        },
        cta: {
          DEFAULT: "var(--school-cta, #1F8A3E)",
          hover: "#186E32",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Montserrat", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
      },
      boxShadow: {
        soft: "0 10px 30px -10px rgba(11, 37, 88, 0.08)",
        card: "0 4px 20px -2px rgba(11, 37, 88, 0.06)",
        dropdown: "0 15px 35px -5px rgba(11, 37, 88, 0.12)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
