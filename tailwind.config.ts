
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
        background: "#022c22", // Deep dark green (almost black)
        foreground: "#ffffff",
        primary: {
          DEFAULT: '#10b981', // Emerald 500
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          glow: '#00ffa3', // Bright neon green for accents
        },
        secondary: {
          DEFAULT: '#115e59', // Teal 800
        },
        dark: {
          900: '#020617',
          800: '#0f172a',
          card: '#064e3b', // Dark green card background
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
          'from': { boxShadow: '0 0 10px #10b981, 0 0 20px #10b981' },
          'to': { boxShadow: '0 0 20px #34d399, 0 0 30px #34d399' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
