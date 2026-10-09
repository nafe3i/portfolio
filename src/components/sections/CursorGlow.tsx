import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

const OFFSCREEN_POSITION = -100;

export function CursorGlow() {
  const shouldReduceMotion = useReducedMotion();
  const [hasFinePointer, setHasFinePointer] = useState(false);
  const pointerX = useMotionValue(OFFSCREEN_POSITION);
  const pointerY = useMotionValue(OFFSCREEN_POSITION);
  const springX = useSpring(pointerX, { damping: 24, stiffness: 280 });
  const springY = useSpring(pointerY, { damping: 24, stiffness: 280 });

  useEffect(() => {
    if (shouldReduceMotion) {
      return;
    }

    const finePointer = window.matchMedia("(pointer: fine)");

    function updatePointerCapability() {
      setHasFinePointer(finePointer.matches);
    }

    function followPointer(event: PointerEvent) {
      pointerX.set(event.clientX - 18);
      pointerY.set(event.clientY - 18);
    }

    updatePointerCapability();
    finePointer.addEventListener("change", updatePointerCapability);
    window.addEventListener("pointermove", followPointer, { passive: true });

    return () => {
      finePointer.removeEventListener("change", updatePointerCapability);
      window.removeEventListener("pointermove", followPointer);
    };
  }, [pointerX, pointerY, shouldReduceMotion]);

  if (!hasFinePointer || shouldReduceMotion) {
    return null;
  }

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden h-9 w-9 rounded-full border border-accent-primary/70 bg-accent-primary/10 mix-blend-multiply lg:block"
      style={{ x: springX, y: springY }}
    />
  );
}
