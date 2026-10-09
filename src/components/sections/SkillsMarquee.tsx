import { marqueeTechnologies } from "@/data/skills";
import { useLanguage } from "@/context/LanguageContext";

export function SkillsMarquee() {
  const { t } = useLanguage();

  return (
    <div
      className="skills-marquee rounded-2xl border border-border-default bg-bg-surface py-4"
      role="region"
      aria-label={t("skills.marquee.label")}
      tabIndex={0}
    >
      <div className="skills-marquee-track">
        {[false, true].map((isDuplicate) => (
          <ul
            key={String(isDuplicate)}
            className="skills-marquee-group"
            aria-hidden={isDuplicate}
          >
            {marqueeTechnologies.map(({ brandColor, icon: Icon, name }) => (
              <li
                key={name}
                className="skills-marquee-item group"
                style={{ "--technology-color": brandColor } as CSSProperties}
              >
                <Icon className="h-5 w-5 transition-colors duration-200 group-hover:text-[var(--technology-color)]" aria-hidden="true" />
                <span>{name}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
import type { CSSProperties } from "react";
