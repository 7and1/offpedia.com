/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: '#0c0f14',
          surface: '#12161d',
          elevated: '#1a1f2a',
          hover: '#222836',
        },
        text: {
          DEFAULT: '#e8eaed',
          muted: '#8b95a5',
          subtle: '#5f6b7a',
        },
        accent: {
          DEFAULT: '#6ee7b7',
          hover: '#34d399',
          dim: '#065f46',
        },
        line: {
          DEFAULT: '#1e2533',
          hover: '#2d3548',
        },
      },
      fontFamily: {
        sans: ['Inter Variable', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono Variable', 'JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },
      maxWidth: {
        content: '840px',
        wide: '1200px',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
