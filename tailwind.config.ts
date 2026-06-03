import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta de marca Raíz Floral — terracota oscuro + verde botella + arena
        olive: {
          DEFAULT: "#5C2E14",   // terracota oscuro → texto, botones, logo
          dark:    "#3D1D0A",
          soft:    "#8B4A2A",
        },
        sage: {
          DEFAULT: "#2D4A35",   // verde botella → acento secundario
          light:   "#4A6B52",
          dark:    "#1E3325",
        },
        cream: {
          DEFAULT: "#F9EDD3",   // arena más cálida y saturada
          light:   "#FDF6EC",
          deep:    "#F0E2C0",
        },
        kraft:     "#D4A068",   // ámbar cálido
        peach:     "#C4622D",   // terracota vivo → CTAs secundarios
        craspedia: "#D4943A",   // dorado ámbar
        berry:     "#7A2A1A",   // vino oscuro
      },
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        xl2: "1.25rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%": { opacity: "0", transform: "scale(0.97)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "slide-up": {
          "0%": { opacity: "0", transform: "translateY(48px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "marquee": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-reverse": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-20px) rotate(4deg)" },
        },
        "pulse-ring": {
          "0%": { transform: "scale(1)", opacity: "0.6" },
          "100%": { transform: "scale(1.8)", opacity: "0" },
        },
        "text-curtain": {
          "0%": { transform: "translateY(108%)" },
          "100%": { transform: "translateY(0)" },
        },
        "clip-wipe": {
          "0%": { clipPath: "inset(100% 0 0% 0)" },
          "100%": { clipPath: "inset(0% 0 0% 0)" },
        },
        "line-grow": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.16, 1, 0.3, 1) both",
        "fade-in": "fade-in 0.8s ease both",
        "scale-in": "scale-in 0.4s cubic-bezier(0.16, 1, 0.3, 1) both",
        "slide-up": "slide-up 0.55s cubic-bezier(0.16, 1, 0.3, 1) both",
        "marquee": "marquee 18s linear infinite",
        "marquee-reverse": "marquee-reverse 22s linear infinite",
        "float": "float 7s ease-in-out infinite",
        "float-slow": "float-slow 11s ease-in-out infinite",
        "pulse-ring": "pulse-ring 2.4s cubic-bezier(0.22, 0.61, 0.36, 1) infinite",
        "text-curtain": "text-curtain 1s cubic-bezier(0.16, 1, 0.3, 1) both",
        "clip-wipe": "clip-wipe 0.9s cubic-bezier(0.16, 1, 0.3, 1) both",
        "line-grow": "line-grow 0.8s cubic-bezier(0.16, 1, 0.3, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
