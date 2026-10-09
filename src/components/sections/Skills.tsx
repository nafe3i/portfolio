import { motion, useReducedMotion } from "framer-motion";
import type { CSSProperties } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { skillCategories } from "@/data/skills";
import { fadeInUp, revealViewport } from "@/lib/motion";

import { SkillsMarquee } from "./SkillsMarquee";

export function Skills() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const revealInitial = shouldReduceMotion ? false : "hidden";

  return (
    <section id="skills" className="scroll-mt-28 py-14 sm:py-20">
      <motion.div
        className="flex flex-col gap-4"
        initial={revealInitial}
        variants={fadeInUp}
        viewport={revealViewport}
        whileInView="visible"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text-muted">
          {t("skills.eyebrow")}
        </p>
        <h2 className="text-4xl font-black tracking-tight text-text-primary sm:text-5xl">
          {t("skills.title")}
        </h2>
      </motion.div>

      <motion.div
        className="mt-10"
        initial={revealInitial}
        variants={fadeInUp}
        viewport={revealViewport}
        whileInView="visible"
      >
        <SkillsMarquee />
      </motion.div>

      <motion.div
        className="mt-8 grid gap-4 sm:grid-cols-2"
        initial={revealInitial}
        variants={fadeInUp}
        viewport={revealViewport}
        whileInView="visible"
      >
        {skillCategories.map(({ nameKey, technologies }) => (
          <Card
            key={nameKey}
            className="!rounded-2xl !border-border-default !bg-bg-surface !shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
          >
            <CardHeader>
              <CardTitle className="!text-xl !font-black !text-text-primary">
                {t(nameKey)}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="flex flex-wrap gap-2">
                {technologies.map(({ brandColor, icon: Icon, isPlaceholder, name }) => (
                  <li
                    key={name}
                    className="group inline-flex items-center gap-2 rounded-lg border border-border-default px-3 py-2 text-sm font-medium text-text-primary"
                    style={{ "--technology-color": brandColor } as CSSProperties}
                  >
                    <Icon className="h-5 w-5 text-text-muted transition-colors duration-200 group-hover:text-[var(--technology-color)]" aria-hidden="true" />
                    <span>{name}</span>
                    {isPlaceholder ? (
                      <span className="text-xs font-normal text-text-muted">
                        {t("skills.placeholder")}
                      </span>
                    ) : null}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </section>
  );
}
