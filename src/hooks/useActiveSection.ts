import { useEffect, useState } from "react";

export const sectionIds = ["home", "about", "education", "skills", "projects", "contact"] as const;

export type SectionId = (typeof sectionIds)[number];

function isSectionId(sectionId: string): sectionId is SectionId {
  return sectionIds.some((id) => id === sectionId);
}

export function useActiveSection() {
  const [activeSection, setActiveSection] = useState<SectionId>("home");

  useEffect(() => {
    const sections = sectionIds
      .map((sectionId) => document.getElementById(sectionId))
      .filter((section): section is HTMLElement => section !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((first, second) => second.intersectionRatio - first.intersectionRatio)[0];

        if (visibleEntry && isSectionId(visibleEntry.target.id)) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-32% 0px -56% 0px",
        threshold: 0,
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, []);

  return activeSection;
}
