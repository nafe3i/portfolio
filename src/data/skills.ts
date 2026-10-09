import type { IconType } from "react-icons";
import { FaBrain } from "react-icons/fa";
import {
  SiCss,
  SiGit,
  SiGithub,
  SiHtml5,
  SiJavascript,
  SiLangchain,
  SiLaravel,
  SiLinux,
  SiMysql,
  SiNodedotjs,
  SiOpenjdk,
  SiOllama,
  SiPhp,
  SiPython,
  SiReact,
  SiSpring,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

import type { TranslationKey } from "./translations";

export interface SkillTechnology {
  brandColor: string;
  icon: IconType;
  isPlaceholder?: boolean;
  name: string;
}

export interface SkillCategory {
  nameKey: TranslationKey;
  technologies: SkillTechnology[];
}

export const skillCategories: SkillCategory[] = [
  {
    nameKey: "skills.category.frontend",
    technologies: [
      { name: "HTML", icon: SiHtml5, brandColor: "#E34F26" },
      { name: "CSS", icon: SiCss, brandColor: "#1572B6" },
      { name: "JavaScript", icon: SiJavascript, brandColor: "#F7DF1E" },
      { name: "TypeScript", icon: SiTypescript, brandColor: "#3178C6" },
      { name: "React", icon: SiReact, brandColor: "#61DAFB" },
      { name: "Tailwind CSS", icon: SiTailwindcss, brandColor: "#06B6D4" },
    ],
  },
  {
    nameKey: "skills.category.backend",
    technologies: [
      { name: "Node.js", icon: SiNodedotjs, brandColor: "#5FA04E" },
      { name: "PHP", icon: SiPhp, brandColor: "#777BB4" },
      { name: "Laravel", icon: SiLaravel, brandColor: "#FF2D20" },
      { name: "Java", icon: SiOpenjdk, brandColor: "#ED8B00" },
      { name: "MySQL", icon: SiMysql, brandColor: "#4479A1" },
    ],
  },
  {
    nameKey: "skills.category.ai",
    technologies: [
      { name: "Python", icon: SiPython, brandColor: "#3776AB" },
      { name: "Ollama", icon: SiOllama, brandColor: "#1F1F1F" },
      { name: "LangChain", icon: SiLangchain, brandColor: "#1C3C3C" },
      { name: "Spring AI", icon: SiSpring, brandColor: "#6DB33F" },
      { name: "RAG (Retrieval-Augmented Generation)", icon: FaBrain, brandColor: "#7C3AED" },
    ],
  },
  {
    nameKey: "skills.category.devops",
    technologies: [
      { name: "Git", icon: SiGit, brandColor: "#F05032" },
      { name: "GitHub", icon: SiGithub, brandColor: "#181717" },
      { name: "Linux", icon: SiLinux, brandColor: "#FCC624" },
    ],
  },
];

export const marqueeTechnologies = skillCategories.flatMap(
  (category) => category.technologies,
);
