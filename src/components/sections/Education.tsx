import { motion, useReducedMotion } from "framer-motion";
import { CalendarDays, GraduationCap, MapPin } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { educationEntries } from "@/data/education";
import { fadeInUp, revealViewport } from "@/lib/motion";

export function Education() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const revealInitial = shouldReduceMotion ? false : "hidden";

  return (
    <section id="education" className="scroll-mt-28 py-14 sm:py-20">
      <motion.div
        className="max-w-3xl"
        initial={revealInitial}
        variants={fadeInUp}
        viewport={revealViewport}
        whileInView="visible"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text-muted">
          {t("education.eyebrow")}
        </p>
        <h2 className="mt-4 text-4xl font-black tracking-tight text-text-primary sm:text-5xl">
          {t("education.title")}
        </h2>
      </motion.div>

      <motion.ol
        className="relative mt-10 grid gap-4 border-l border-border-default pl-6 sm:pl-8"
        initial={revealInitial}
        variants={fadeInUp}
        viewport={revealViewport}
        whileInView="visible"
      >
        {educationEntries.map(
          ({ descriptionKey, institutionKey, locationKey, periodKey, programKey }) => (
            <li key={institutionKey} className="relative">
              <span
                className="absolute -left-[1.9rem] top-7 h-3 w-3 rounded-full border-2 border-bg-base bg-accent-primary sm:-left-[2.4rem]"
                aria-hidden="true"
              />
              <Card className="!rounded-2xl !border-border-default !bg-bg-surface !shadow-none transition-shadow hover:shadow-lg hover:shadow-black/5">
                <CardContent className="p-6 sm:p-7">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent-primary text-accent-foreground">
                        <GraduationCap className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <h3 className="mt-4 text-xl font-black tracking-tight text-text-primary">
                        {t(programKey)}
                      </h3>
                      <p className="mt-1 font-semibold text-text-primary">{t(institutionKey)}</p>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 text-sm text-text-muted sm:items-end">
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4" aria-hidden="true" />
                        {t(periodKey)}
                      </span>
                      <span className="inline-flex items-center gap-2">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                        {t(locationKey)}
                      </span>
                    </div>
                  </div>
                  <p className="mt-5 max-w-3xl text-sm leading-7 text-text-muted sm:text-base">
                    {t(descriptionKey)}
                  </p>
                </CardContent>
              </Card>
            </li>
          ),
        )}
      </motion.ol>
    </section>
  );
}
