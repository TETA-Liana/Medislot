
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#020617", // Slate 950 (Deep Dark Blue)
        foreground: "#ffffff",
        primary: {
          DEFAULT: '#0ea5e9', // Sky 500 (Light Blue)
          400: '#38bdf8', // Sky 400
          500: '#0ea5e9', // Sky 500
          600: '#0284c7', // Sky 600
          glow: '#67e8f9', // Cyan 300 for accents
        },
        secondary: {
          DEFAULT: '#1e3a8a', // Blue 900
        },
        dark: {
          900: '#020617',
          800: '#0f172a',
          card: '#1e293b', // Slate 800
        }
      },
      fontFamily: {
        plaster: ['"Plaster"', "cursive"],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'pulse-slow': 'pulse 4s infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          'from': { boxShadow: '0 0 10px #0ea5e9, 0 0 20px #0ea5e9' },
          'to': { boxShadow: '0 0 20px #38bdf8, 0 0 30px #38bdf8' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
