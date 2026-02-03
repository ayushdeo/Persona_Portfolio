module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        'laptop': { 'raw': '(max-width: 1440px) and (max-height: 900px)' },
      },
      colors: {
        persona: {
          red: "#e60012",
          black: "#0b0b0b",
          white: "#ffffff",
          yellow: "#f5c400",
          blue: "#0095f6",
          purple: "#9d50bb",
          accent: "var(--theme-accent)", // Dynamic Theme Color
        }
      },
      fontFamily: {
        display: ["Anton", "sans-serif"],
        ui: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        serif: ["Libre Baskerville", "serif"]
      },
      rotate: {
        "3": "3deg",
        "-3": "-3deg"
      }
    }
  },
  plugins: []
};
