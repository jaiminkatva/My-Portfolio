/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: '#0B0E14',
          900: '#0B0E14',
          800: '#12161F',
          700: '#171C27',
          600: '#1E2530',
          500: '#2A3240',
        },
        paper: {
          DEFAULT: '#E8EAED',
          dim: '#AAB2C0',
          faint: '#6B7484',
        },
        signal: {
          DEFAULT: '#FF8A3D',
          dim: '#B85F24',
          glow: 'rgba(255,138,61,0.35)',
        },
        system: {
          DEFAULT: '#5EC8D8',
          dim: '#3C8794',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"IBM Plex Sans"', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
      backgroundImage: {
        blueprint:
          'linear-gradient(rgba(232,234,237,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(232,234,237,0.035) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      maxWidth: {
        content: '1240px',
      },
      transitionTimingFunction: {
        engineer: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
