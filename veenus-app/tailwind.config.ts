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
        background: "var(--background)",
        foreground: "var(--foreground)",
        gold: {
          50: 'rgb(var(--gold-50) / <alpha-value>)',
          100: 'rgb(var(--gold-100) / <alpha-value>)',
          200: 'rgb(var(--gold-200) / <alpha-value>)',
          300: 'rgb(var(--gold-300) / <alpha-value>)',
          400: 'rgb(var(--gold-400) / <alpha-value>)',
          500: 'rgb(var(--gold-500) / <alpha-value>)',
          600: 'rgb(var(--gold-600) / <alpha-value>)',
          700: 'rgb(var(--gold-700) / <alpha-value>)',
          800: 'rgb(var(--gold-800) / <alpha-value>)',
          900: 'rgb(var(--gold-900) / <alpha-value>)',
        },
        luxury: {
          black: 'rgb(var(--luxury-black) / <alpha-value>)',
          dark: 'rgb(var(--luxury-dark) / <alpha-value>)',
          charcoal: 'rgb(var(--luxury-charcoal) / <alpha-value>)',
          gray: 'rgb(var(--luxury-gray) / <alpha-value>)',
          light: 'rgb(var(--luxury-light) / <alpha-value>)',
          cream: 'rgb(var(--luxury-cream) / <alpha-value>)',
        },
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #7A5A07 0%, #B8860B 20%, #D4AF37 40%, #F5E6A3 50%, #D4AF37 60%, #B8860B 80%, #7A5A07 100%)',
        'gradient-gold-horizontal': 'linear-gradient(90deg, #5C4305 0%, #B8860B 25%, #D4AF37 50%, #B8860B 75%, #5C4305 100%)',
        'gradient-gold-text': 'linear-gradient(135deg, #B8860B 0%, #D4AF37 30%, #F5E6A3 50%, #D4AF37 70%, #B8860B 100%)',
        'gradient-gold-dark': 'linear-gradient(135deg, #5C4305 0%, #7A5A07 30%, #B8860B 50%, #7A5A07 70%, #5C4305 100%)',
        'gradient-gold-shine': 'linear-gradient(135deg, #3D2D03 0%, #7A5A07 15%, #B8860B 30%, #D4AF37 45%, #F5E6A3 50%, #D4AF37 55%, #B8860B 70%, #7A5A07 85%, #3D2D03 100%)',
        'gradient-dark': 'linear-gradient(180deg, #050505 0%, #111111 100%)',
        'gradient-radial-gold': 'radial-gradient(ellipse at center, rgba(184,134,11,0.15) 0%, transparent 70%)',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'fade-in-up': 'fadeInUp 1s ease-out forwards',
        'fade-in-down': 'fadeInDown 1s ease-out forwards',
        'fade-in-left': 'fadeInLeft 1s ease-out forwards',
        'fade-in-right': 'fadeInRight 1s ease-out forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
        'shimmer': 'shimmer 3s linear infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-gold': 'pulseGold 3s ease-in-out infinite',
        'rotate-slow': 'rotateSlow 20s linear infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite alternate',
        'text-shine': 'textShine 4s linear infinite',
        'slide-up': 'slideUp 0.8s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInDown: {
          '0%': { opacity: '0', transform: 'translateY(-40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeInRight: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.85)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translate3d(0, 0px, 0)' },
          '50%': { transform: 'translate3d(0, -18px, 0)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(184,134,11,0.2), 0 0 40px rgba(184,134,11,0.1)' },
          '100%': { boxShadow: '0 0 40px rgba(184,134,11,0.4), 0 0 80px rgba(184,134,11,0.2)' },
        },
        pulseGold: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        rotateSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        borderGlow: {
          '0%': { borderColor: 'rgba(92,67,5,0.3)' },
          '100%': { borderColor: 'rgba(184,134,11,0.8)' },
        },
        textShine: {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '200% 50%' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(100px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      boxShadow: {
        'gold': '0 0 20px rgba(184,134,11,0.3)',
        'gold-lg': '0 0 40px rgba(184,134,11,0.4), 0 0 80px rgba(184,134,11,0.15)',
        'gold-xl': '0 0 60px rgba(184,134,11,0.5), 0 0 120px rgba(184,134,11,0.2)',
        'gold-inner': 'inset 0 0 30px rgba(184,134,11,0.1)',
        'luxury': '0 25px 50px rgba(0,0,0,0.5), 0 0 30px rgba(184,134,11,0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
