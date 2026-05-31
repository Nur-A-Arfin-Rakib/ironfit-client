/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#e11d48",
        dark: "#0a0a0a",
      },
      fontFamily: {
        heading: ["Bebas Neue", "cursive"],
        body: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        ironfit: {
          primary: "#e11d48",
          secondary: "#1f2937",
          accent: "#f59e0b",
          neutral: "#111827",
          "base-100": "#0a0a0a",
          "base-200": "#111111",
          "base-300": "#1a1a1a",
          info: "#3b82f6",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
        },
      },
      "light",
    ],
  },
}
