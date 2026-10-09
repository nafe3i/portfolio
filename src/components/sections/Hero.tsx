import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

import { Button } from "@/components/ui/button";
import { useLanguage } from "@/context/LanguageContext";
import { type TranslationKey } from "@/data/translations";

import { StatCounter } from "./StatCounter";

const HeroScene = lazy(() =>
  import("./HeroScene")
    .then(({ HeroScene: Scene }) => ({ default: Scene }))
    .catch(() => ({ default: () => null })),
);

function useHeroSceneEnabled() {
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");

    function updateSceneEnabled() {
      setIsEnabled(!reducedMotion.matches && desktop.matches);
    }

    const animationFrame = window.requestAnimationFrame(updateSceneEnabled);
    reducedMotion.addEventListener("change", updateSceneEnabled);
    desktop.addEventListener("change", updateSceneEnabled);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      reducedMotion.removeEventListener("change", updateSceneEnabled);
      desktop.removeEventListener("change", updateSceneEnabled);
    };
  }, []);

  return isEnabled;
}

interface HeroProps {
  photoSrc: string;
}

const stats: Array<{ labelKey: TranslationKey; value: TranslationKey }> = [
  {
    labelKey: "hero.stats.languages.label",
    value: "hero.stats.languages.value",
  },
  {
    labelKey: "hero.stats.location.label",
    value: "hero.stats.location.value",
  },
];

type VisibleHeadline = [string, string];

function useTypingHeadline(
  firstLine: string,
  secondLine: string,
  shouldReduceMotion: boolean | null,
) {
  const [visibleHeadline, setVisibleHeadline] = useState<VisibleHeadline>(["", ""]);

  useEffect(() => {
    if (shouldReduceMotion) {
      setVisibleHeadline([firstLine, secondLine]);
      return;
    }

    const lines = [Array.from(firstLine), Array.from(secondLine)] as const;
    let timeoutId: number | undefined;
    let cancelled = false;

    const wait = (callback: () => void, delay: number) => {
      timeoutId = window.setTimeout(() => {
        if (!cancelled) {
          callback();
        }
      }, delay);
    };

    const typeLine = (lineIndex: 0 | 1, done: () => void) => {
      let characterIndex = 0;

      const typeNextCharacter = () => {
        characterIndex += 1;
        setVisibleHeadline((current) => {
          const next: VisibleHeadline = [...current];
          next[lineIndex] = lines[lineIndex].slice(0, characterIndex).join("");
          return next;
        });

        if (characterIndex < lines[lineIndex].length) {
          wait(typeNextCharacter, 52);
          return;
        }

        done();
      };

      wait(typeNextCharacter, 220);
    };

    const eraseLine = (lineIndex: 0 | 1, done: () => void) => {
      let characterIndex = lines[lineIndex].length;

      const eraseNextCharacter = () => {
        characterIndex -= 1;
        setVisibleHeadline((current) => {
          const next: VisibleHeadline = [...current];
          next[lineIndex] = lines[lineIndex].slice(0, characterIndex).join("");
          return next;
        });

        if (characterIndex > 0) {
          wait(eraseNextCharacter, 30);
          return;
        }

        done();
      };

      wait(eraseNextCharacter, 30);
    };

    const startLoop = () => {
      setVisibleHeadline(["", ""]);
      typeLine(0, () => {
        wait(() => {
          typeLine(1, () => {
            wait(() => {
              eraseLine(1, () => {
                eraseLine(0, () => wait(startLoop, 500));
              });
            }, 2200);
          });
        }, 180);
      });
    };

    startLoop();

    return () => {
      cancelled = true;
      if (timeoutId !== undefined) {
        window.clearTimeout(timeoutId);
      }
    };
  }, [firstLine, secondLine, shouldReduceMotion]);

  return visibleHeadline;
}

export function Hero({ photoSrc }: HeroProps) {
  const { t } = useLanguage();
  const isHeroSceneEnabled = useHeroSceneEnabled();
  const shouldReduceMotion = useReducedMotion();
  const [visibleFirstLine, visibleSecondLine] = useTypingHeadline(
    t("hero.heading.lineOne"),
    t("hero.heading.lineTwo"),
    shouldReduceMotion,
  );
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const photoOffset = useTransform(scrollYProgress, [0, 1], [0, -36]);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-[calc(100vh-7rem)] scroll-mt-28 flex-col overflow-hidden rounded-hero bg-bg-inverted px-6 py-10 sm:px-10 lg:px-14 lg:py-14"
    >
      <div className="hero-grid pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] opacity-40 lg:block" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-16 top-20 hidden h-64 w-64 rounded-full bg-accent-primary opacity-[0.07] blur-3xl lg:block" aria-hidden="true" />
      <motion.div
        className="pointer-events-none absolute -left-16 bottom-24 h-40 w-40 rounded-full border border-accent-2-to/50 opacity-60"
        animate={shouldReduceMotion ? undefined : { scale: [1, 1.12, 1], x: [0, 14, 0], y: [0, -10, 0] }}
        transition={{ duration: 7, ease: "easeInOut", repeat: Infinity }}
        aria-hidden="true"
      />
      {isHeroSceneEnabled ? (
        <div className="pointer-events-none absolute right-8 top-10 z-20 hidden h-24 w-24 lg:block">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
      ) : null}
      <div className="relative z-10 grid flex-1 items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(22rem,0.8fr)] lg:gap-12">
        <motion.div
          className="flex flex-col items-center text-center lg:items-start lg:text-left"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex rounded-full border border-accent-primary/40 bg-accent-primary px-4 py-2 text-sm font-medium text-accent-foreground">
            {t("hero.badge")}
          </span>
          <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.92] tracking-tight text-text-on-inverted sm:text-6xl lg:text-7xl xl:text-8xl">
            <span className="sr-only">
              {t("hero.heading.lineOne")} {t("hero.heading.lineTwo")}
            </span>
            <span className="block min-h-[0.92em]" aria-hidden="true">
              {visibleFirstLine}
              {!visibleSecondLine && !shouldReduceMotion ? (
                <span className="ml-1 inline-block h-[0.78em] w-[0.08em] animate-pulse bg-accent-primary align-[-0.05em]" />
              ) : null}
            </span>
            <span className="block min-h-[0.92em] text-accent-primary" aria-hidden="true">
              {visibleSecondLine}
              {visibleSecondLine && !shouldReduceMotion ? (
                <span className="ml-1 inline-block h-[0.78em] w-[0.08em] animate-pulse bg-accent-primary align-[-0.05em]" />
              ) : null}
            </span>
          </h1>
          <div className="mt-6 h-px w-20 bg-accent-primary" aria-hidden="true" />
          <p className="mt-6 max-w-xl text-base leading-7 text-text-on-inverted/75 sm:text-lg sm:leading-8">
            {t("hero.description")}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            <Button
              asChild
              className="rounded-full !bg-accent-primary !text-accent-foreground hover:!bg-accent-primary/90 focus-visible:!ring-accent-2-from"
            >
              <a href="#projects">{t("hero.projectsCta")}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-full !border-text-on-inverted/50 !bg-transparent !text-text-on-inverted hover:!border-accent-primary hover:!bg-accent-primary hover:!text-accent-foreground focus-visible:!ring-accent-primary"
            >
              <a href="#contact">{t("hero.cta")}</a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          className="relative mx-auto w-full max-w-sm pt-4 lg:max-w-md lg:pt-0"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          style={{ y: shouldReduceMotion ? 0 : photoOffset }}
        >
          <div className="absolute -inset-4 rounded-hero bg-gradient-to-br from-accent-2-from to-accent-2-to opacity-20 blur-3xl" aria-hidden="true" />
          <div className="absolute -left-3 top-0 h-16 w-16 rounded-full border border-accent-primary/60 lg:-left-7 lg:top-12" aria-hidden="true" />
          <div className="absolute -bottom-3 -right-3 h-20 w-20 rounded-2xl border border-accent-2-to/50 bg-bg-inverted/40 backdrop-blur-sm lg:-bottom-5 lg:-right-5" aria-hidden="true" />
          <div className="group relative aspect-[4/5] overflow-hidden rounded-2xl border border-border-default bg-bg-surface p-2 shadow-2xl shadow-black/30 ring-1 ring-text-on-inverted/10">
            <img
              src={photoSrc}
              alt={t("hero.photoAlt")}
              className="h-full w-full rounded-xl object-cover object-[50%_18%] brightness-95 contrast-110 saturate-[0.9] transition duration-700 group-hover:scale-[1.03] group-hover:saturate-100"
            />
            <div className="pointer-events-none absolute inset-2 rounded-xl bg-gradient-to-tr from-accent-2-from/35 via-transparent to-accent-primary/25 mix-blend-color" aria-hidden="true" />
            <div className="pointer-events-none absolute inset-x-2 bottom-2 h-1/3 rounded-b-xl bg-gradient-to-t from-bg-inverted/45 to-transparent" aria-hidden="true" />
            <div className="absolute bottom-5 left-5 max-w-[calc(100%-2.5rem)] rounded-lg border border-border-default/80 bg-bg-surface/95 px-4 py-3 text-left shadow-lg backdrop-blur-sm">
              <p className="text-sm font-black tracking-tight text-text-primary">{t("hero.name")}</p>
              <p className="mt-0.5 text-xs font-medium text-text-muted">{t("hero.photoCardRole")}</p>
            </div>
            <div className="pointer-events-none absolute right-5 top-5 h-9 w-9 rounded-full border border-accent-primary/80 bg-bg-inverted/50 backdrop-blur-sm" aria-hidden="true" />
          </div>
        </motion.div>
      </div>

      <dl className="mt-10 grid grid-cols-2 divide-x divide-border-default border-t border-border-default pt-6 sm:mt-14 sm:pt-8">
        {stats.map(({ labelKey, value }) => (
          <StatCounter
            key={labelKey}
            label={t(labelKey)}
            value={t(value)}
          />
        ))}
      </dl>
    </section>
  );
}
