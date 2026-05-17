import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    // Mobile-first breakpoints — override Tailwind defaults
    screens: {
      mobile: "320px",
      "mobile-lg": "480px",
      tablet: "768px",
      desktop: "1024px",
      "desktop-lg": "1280px",
    },
    extend: {
      // ─── Color Palette ────────────────────────────────────────────────────
      colors: {
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0a0a0a",
        },
        accent: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c",
          800: "#9a3412",
          900: "#7c2d12",
        },
        background: {
          primary: "#fafafa",
          secondary: "#f5f5f5",
        },
      },

      // ─── Spacing Tokens ───────────────────────────────────────────────────
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
        "3xl": "64px",
      },

      // ─── Typography ───────────────────────────────────────────────────────
      fontFamily: {
        serif: ["var(--font-playfair)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },

      // ─── Keyframes ────────────────────────────────────────────────────────
      keyframes: {
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        staggerChildren: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },

      // ─── Animations ───────────────────────────────────────────────────────
      animation: {
        fadeInUp: "fadeInUp 0.5s ease-out forwards",
        staggerChildren: "staggerChildren 0.3s ease-out forwards",
        slideInRight: "slideInRight 0.5s ease-out forwards",
        "float-3": "float 3s ease-in-out infinite",
        "float-3-4": "float 3.4s ease-in-out infinite",
        "float-3-8": "float 3.8s ease-in-out infinite",
        "float-4-2": "float 4.2s ease-in-out infinite",
        "float-3-6": "float 3.6s ease-in-out infinite",
        "float-4": "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
