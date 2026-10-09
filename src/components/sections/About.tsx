import { motion, useReducedMotion } from "framer-motion";
import { GraduationCap, MapPin, Sparkles } from "lucide-react";

import { useLanguage } from "@/context/LanguageContext";
import { fadeInUp, revealViewport } from "@/lib/motion";

export function About() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const details = [
    {
      icon: MapPin,
      labelKey: "about.detail.location.label" as const,
      valueKey: "about.detail.location.value" as const,
    },
    {
      icon: GraduationCap,
      labelKey: "about.detail.education.label" as const,
      valueKey: "about.detail.education.value" as const,
    },
    {
      icon: Sparkles,
      labelKey: "about.detail.focus.label" as const,
      valueKey: "about.detail.focus.value" as const,
    },
  ];

  return (
    <section id="about" className="scroll-mt-28 py-14 sm:py-20">
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.75fr)] lg:gap-16">
        <motion.div
          className="max-w-4xl"
          initial={shouldReduceMotion ? false : "hidden"}
          variants={fadeInUp}
          viewport={revealViewport}
          whileInView="visible"
        >
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text-muted">
            {t("about.eyebrow")}
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-text-primary sm:text-5xl">
            {t("about.title")}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-text-muted sm:text-lg">
            {t("about.bio")}
          </p>
        </motion.div>

        <motion.dl
          className="overflow-hidden rounded-2xl bg-bg-inverted p-2 text-text-on-inverted shadow-xl shadow-black/10"
          initial={shouldReduceMotion ? false : "hidden"}
          variants={fadeInUp}
          viewport={revealViewport}
          whileInView="visible"
        >
          {details.map(({ icon: Icon, labelKey, valueKey }, index) => (
            <div
              key={labelKey}
              className={
                index === details.length - 1
                  ? "flex gap-4 p-5"
                  : "flex gap-4 border-b border-text-on-inverted/10 p-5"
              }
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-primary text-accent-foreground">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-text-on-inverted/55">
                  {t(labelKey)}
                </dt>
                <dd className="mt-1 text-sm font-semibold leading-6 text-text-on-inverted">
                  {t(valueKey)}
                </dd>
              </div>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}
