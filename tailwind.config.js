/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#0F172A", // deep slate
          surface: "#111827",
          card: "#1A2236",
        },
        neon: {
          green: "#22C55E",
          orange: "#F97316",
        },
        slate: {
          850: "#172033",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, rgba(34,197,94,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(34,197,94,0.06) 1px, transparent 1px)",
        "radial-fade":
          "radial-gradient(circle at center, rgba(34,197,94,0.15) 0%, rgba(15,23,42,0) 70%)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      boxShadow: {
        "glow-green": "0 0 20px rgba(34,197,94,0.5), 0 0 60px rgba(34,197,94,0.15)",
        "glow-orange": "0 0 20px rgba(249,115,22,0.5), 0 0 60px rgba(249,115,22,0.15)",
        "glow-green-sm": "0 0 10px rgba(34,197,94,0.4)",
        "card": "0 8px 32px rgba(0,0,0,0.4)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float 7s ease-in-out 1.5s infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "scan-line": "scan-line 4s linear infinite",
        blink: "blink 1.2s step-end infinite",
        marquee: "marquee 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: 0.6, filter: "blur(40px)" },
          "50%": { opacity: 1, filter: "blur(60px)" },
        },
        "scan-line": {
          "0%": { backgroundPosition: "0% 0%" },
          "100%": { backgroundPosition: "0% 100%" },
        },
        blink: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0 },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
    },
  },
  plugins: [],
};
