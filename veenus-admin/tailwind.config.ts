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
        gold: {
          50: '#FDF8E8',
          100: '#F5E6A3',
          200: '#E8D48B',
          300: '#D4AF37',
          400: '#C5A028',
          500: '#B8860B',
          600: '#9A7209',
          700: '#7A5A07',
          800: '#5C4305',
          900: '#3D2E06',
        },
        admin: {
          dark: '#0f0f0f',
          darker: '#090909',
          card: '#161616',
          border: '#222222',
          hover: '#1c1c1c',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
