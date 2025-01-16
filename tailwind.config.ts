import type {Config} from 'tailwindcss'
import {fontFamily} from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}', './src/lib/*.{ts,tsx}'],
  theme: {
    screens: {
      xl: {max: '1780px'},
      lg: {max: '1280px'},
      // md: {max: '1024px'},
      sm: {max: '500px'},
    },
    fontFamily: {
      montserrat: ['var(--font-montserrat)', ...fontFamily.sans],
    },
    colors: {
      black: '#131418',
      white: '#FAFAF6',
      gray: '#E1E2E4',
      green: '#B1F611',
      transparent: 'transparent',
    },
    extend: {
      keyframes: {
        'accordion-down': {
          from: {height: '0'},
          to: {height: 'var(--radix-accordion-content-height)'},
        },
        'accordion-up': {
          from: {height: 'var(--radix-accordion-content-height)'},
          to: {height: '0'},
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [],
} satisfies Config
