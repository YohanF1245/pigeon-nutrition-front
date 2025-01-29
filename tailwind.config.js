/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        'brandeis-blue': '#1a73e8',
        'columbia-blue': '#bfdbf7',
        'lavender-web': '#e1e5f2',
        'rose-taupe': '#785964',
        'onyx': '#454545',
      },
      fontFamily: {
        'audiowide': ['Audiowide', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'space-grotesk': ['Space Grotesk', 'sans-serif'],
        'roboto-mono': ['Roboto Mono', 'monospace'],
        'dm-sans': ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 