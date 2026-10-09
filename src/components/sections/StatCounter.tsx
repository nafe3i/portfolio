import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { counterTransition } from "@/lib/motion";

interface StatCounterProps {
  label: string;
  value: string;
}

function getCountTarget(value: string) {
  const target = Number(value);

  return Number.isInteger(target) && String(target) === value ? target : undefined;
}

export function StatCounter({ label, value }: StatCounterProps) {
  const countTarget = getCountTarget(value);
  const statRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(statRef, { amount: 0.75, once: true });
  const shouldReduceMotion = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(
    () => (countTarget === undefined ? value : "0"),
  );

  useEffect(() => {
    if (countTarget === undefined) {
      setDisplayValue(value);
      return;
    }

    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    if (!isInView) {
      return;
    }

    const controls = animate(0, countTarget, {
      ...counterTransition,
      onUpdate: (latest) => setDisplayValue(String(Math.round(latest))),
    });

    return controls.stop;
  }, [countTarget, isInView, shouldReduceMotion, value]);

  return (
    <div ref={statRef} className="flex flex-col items-center px-3 text-center sm:px-6">
      <dd className="text-2xl font-black tracking-tight text-text-on-inverted sm:text-3xl">
        {displayValue}
      </dd>
      <dt className="mt-1 text-xs font-medium uppercase tracking-[0.16em] text-text-on-inverted opacity-70 sm:text-sm">
        {label}
      </dt>
    </div>
  );
}
