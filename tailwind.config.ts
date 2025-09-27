import { type Config } from "tailwindcss";

export default {
  content: [
    "{routes,islands,components}/**/*.{ts,tsx,js,jsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'flip-y-forward': {
          '0%':   { transform: 'rotateY(0deg)' },
          '60%':  { transform: 'rotateY(188deg)' }, // tiny overshoot
          '100%': { transform: 'rotateY(180deg)' },
        },
        'flip-y-back': {
          '0%':   { transform: 'rotateY(180deg)' },
          '60%':  { transform: 'rotateY(-8deg)' },  // tiny overshoot
          '100%': { transform: 'rotateY(0deg)' },
        },
        'flip-x-forward': {
          '0%':   { transform: 'rotateX(0deg)' },
          '60%':  { transform: 'rotateX(188deg)' },
          '100%': { transform: 'rotateX(180deg)' },
        },
        'flip-x-back': {
          '0%':   { transform: 'rotateX(180deg)' },
          '60%':  { transform: 'rotateX(-8deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
      },
      animation: {
        'flip-y':   'flip-y-forward 600ms cubic-bezier(.2,.8,.2,1) forwards',
        'unflip-y': 'flip-y-back    600ms cubic-bezier(.2,.8,.2,1) forwards',
        'flip-x':   'flip-x-forward 600ms cubic-bezier(.2,.8,.2,1) forwards',
        'unflip-x': 'flip-x-back    600ms cubic-bezier(.2,.8,.2,1) forwards',
      },
    },
  },
} satisfies Config;
