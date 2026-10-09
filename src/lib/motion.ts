import type { Transition, Variants } from "framer-motion";

const motionEase: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const revealTransition: Transition = {
  duration: 0.45,
  ease: motionEase,
};

export const counterTransition: Transition = {
  duration: 1.2,
  ease: motionEase,
};

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    transition: revealTransition,
    y: 0,
  },
};

export const revealViewport = { amount: 0.2, once: true };
