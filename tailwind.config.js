/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        display: ['var(--font-inter)', 'sans-serif'],
      },
      colors: {
        primary: '#000000', // Pure Black background
        secondary: '#0a0a0c', // Faint dark gray for cards
        accent: {
          DEFAULT: '#a855f7', // Vibrant Purple
          hover: '#9333ea',
          light: '#c084fc',
        },
        techBlue: '#3b82f6', // Vibrant Blue
        techOrange: '#f97316', // Vibrant Orange
        muted: '#a1a1aa',
        cardBorder: 'rgba(255, 255, 255, 0.05)',
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
        'marquee-reverse': 'marquee-reverse 25s linear infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'glow-indigo': '0 0 20px rgba(99, 102, 241, 0.25)',
        'glow-purple': '0 0 20px rgba(168, 85, 247, 0.25)',
      }
    },
  },
  plugins: [],
}

