// src/lib/message-animations.ts
export const MESSAGE_ANIMATIONS = {
  "slide-up": {
    variants: {
      initial: { opacity: 0, y: 15 },
      animate: { opacity: 1, y: 0, transition: { duration: 0.3 } },
      exit: { opacity: 0, y: -15, transition: { duration: 0.2 } },
    },
  },
};