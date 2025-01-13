import type {Config} from 'tailwindcss'
import {fontFamily} from 'tailwindcss/defaultTheme'

export default {
  content: ['./src/components/**/*.{js,ts,jsx,tsx,mdx}', './src/app/**/*.{js,ts,jsx,tsx,mdx}'],
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
    extend: {},
  },
  plugins: [],
} satisfies Config
