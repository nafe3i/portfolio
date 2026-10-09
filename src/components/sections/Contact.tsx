import { motion, useReducedMotion } from "framer-motion";

import { fadeInUp, revealViewport } from "@/lib/motion";

import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";

export function Contact() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="contact"
      className="mt-14 scroll-mt-28 rounded-hero bg-bg-inverted px-6 py-14 sm:mt-20 sm:px-10 sm:py-20 lg:px-14"
    >
      <motion.div
        className="grid items-start gap-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12"
        initial={shouldReduceMotion ? false : "hidden"}
        variants={fadeInUp}
        viewport={revealViewport}
        whileInView="visible"
      >
        <ContactInfo />
        <ContactForm />
      </motion.div>
    </section>
  );
}
