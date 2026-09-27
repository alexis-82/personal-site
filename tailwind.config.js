/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0F1E',
        paper: '#EAF2F1',
        magenta: '#FF2E88',
        cyan: '#00D4FF',
        lime: '#B4FF39',
        tangerine: '#FF6B1A',
        violet: '#6B4EFF',
      },
      fontFamily: {
        mono: ['"Space Mono"', 'ui-monospace', 'Menlo', 'monospace'],
        pixel: ['"VT323"', 'monospace'],
      },
      boxShadow: {
        sticker: '6px 6px 0 #0B0F1E',
        'sticker-sm': '4px 4px 0 #0B0F1E',
        'sticker-lg': '8px 8px 0 #0B0F1E',
      },
      animation: {
        blink: 'blink 1.05s steps(2) infinite',
        fill: 'fill 2.1s ease-out forwards',
      },
      keyframes: {
        blink: { '50%': { opacity: '0' } },
        fill: { to: { width: '100%' } },
      },
    },
  },
  plugins: [],
};
