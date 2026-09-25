/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: 'rgb(var(--color-ink-900) / <alpha-value>)',
          900: 'rgb(var(--color-ink-900) / <alpha-value>)',
          800: 'rgb(var(--color-ink-800) / <alpha-value>)',
          700: 'rgb(var(--color-ink-700) / <alpha-value>)',
          600: 'rgb(var(--color-ink-600) / <alpha-value>)',
          500: 'rgb(var(--color-ink-500) / <alpha-value>)',
        },
        paper: {
          DEFAULT: 'rgb(var(--color-paper) / <alpha-value>)',
          dim: 'rgb(var(--color-paper-dim) / <alpha-value>)',
          faint: 'rgb(var(--color-paper-faint) / <alpha-value>)',
        },
        signal: {
          DEFAULT: 'rgb(var(--color-signal) / <alpha-value>)',
          dim: 'rgb(var(--color-signal-dim) / <alpha-value>)',
          glow: 'rgba(255,138,61,0.35)',
        },
        system: {
          DEFAULT: 'rgb(var(--color-system) / <alpha-value>)',
          dim: 'rgb(var(--color-system-dim) / <alpha-value>)',
        },
        // Hairlines and translucent tints: white on dark surfaces, slate on light ones.
        line: 'rgb(var(--color-line) / <alpha-value>)',
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
