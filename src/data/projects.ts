import type { TranslationKey } from "./translations";

export type ProjectSlug =
  | "aui-email-system"
  | "electrocharge"
  | "salus"
  | "easycoloc";

export interface Project {
  categoryKey: TranslationKey;
  codeUrl: string;
  descriptionKey: TranslationKey;
  featured: boolean;
  imageSrc: string;
  liveUrl?: string;
  name: string;
  slug: ProjectSlug;
  stack: string[];
}

export const projects: Project[] = [
  {
    slug: "aui-email-system",
    name: "AUI Email Support System",
    categoryKey: "projects.aui-email-system.category",
    descriptionKey: "projects.aui-email-system.description",
    imageSrc: "/projects/aui-email-support.jpg",
    stack: ["FastAPI", "Ollama", "Mistral", "ChromaDB", "SQLite", "JWT"],
    codeUrl: "https://github.com/nafe3i/email_traitment",
    featured: true,
  },
  {
    slug: "electrocharge",
    name: "ElectroCharge Maroc",
    categoryKey: "projects.electrocharge.category",
    descriptionKey: "projects.electrocharge.description",
    imageSrc: "/projects/electrocharge.jpg",
    stack: ["Laravel", "Tailwind CSS", "Vite"],
    codeUrl: "https://github.com/nafe3i/Electrocharge",
    featured: false,
  },
  {
    slug: "salus",
    name: "Salus — AI Health Assistant Platform",
    categoryKey: "projects.salus.category",
    descriptionKey: "projects.salus.description",
    imageSrc: "/projects/salus.jpg",
    stack: ["Laravel", "REST API"],
    codeUrl:
      "https://github.com/nafe3i/Salus---AI-Health-Assistant-Platform",
    featured: false,
  },
  {
    slug: "easycoloc",
    name: "EasyColoc",
    categoryKey: "projects.easycoloc.category",
    descriptionKey: "projects.easycoloc.description",
    imageSrc: "/projects/easycoloc.jpg",
    stack: ["Laravel"],
    codeUrl:
      "https://github.com/nafe3i/Plateforme-Web-de-Gestion-de-Colocation-EasyColoc",
    featured: false,
  },
];
