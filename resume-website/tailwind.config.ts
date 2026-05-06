import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        base: {
          DEFAULT: '#0a0f1a',
          light: '#111827',
          dark: '#060a12',
        },
        primary: {
          DEFAULT: '#00e5ff',
          dark: '#00b8cc',
          light: '#80f0ff',
        },
        accent: {
          DEFAULT: '#7c3aed',
          light: '#a78bfa',
          dark: '#5b21b6',
        },
        electric: {
          DEFAULT: '#3b82f6',
          glow: '#60a5fa',
        },
        surface: {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          hover: 'rgba(255, 255, 255, 0.1)',
          border: 'rgba(255, 255, 255, 0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        display: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-electric': 'linear-gradient(135deg, #00e5ff 0%, #7c3aed 100%)',
        'gradient-glow': 'linear-gradient(180deg, rgba(0,229,255,0.15) 0%, transparent 100%)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(0,229,255,0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(0,229,255,0.6), 0 0 40px rgba(124,58,237,0.3)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
