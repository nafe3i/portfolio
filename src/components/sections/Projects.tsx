import { motion, useReducedMotion } from "framer-motion";
import { Clock3, Star } from "lucide-react";
import { SiGithub } from "react-icons/si";

import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";
import { projects, type Project } from "@/data/projects";
import { useGitHubRepoMeta } from "@/hooks/useGitHubRepoMeta";
import { formatRelativeTime } from "@/lib/formatRelativeTime";
import { fadeInUp, revealViewport } from "@/lib/motion";
import { cn } from "@/lib/utils";

function ProjectRepositoryMeta({ codeUrl }: Pick<Project, "codeUrl">) {
  const { language, t } = useLanguage();
  const { data, error, loading } = useGitHubRepoMeta(codeUrl);

  if (error || (!data && !loading)) {
    return null;
  }

  if (loading) {
    return (
      <div
        className="mt-4 h-6 w-28 animate-pulse rounded-full bg-border-default motion-reduce:animate-none"
        aria-label={t("projects.metadata.loading")}
        aria-busy="true"
      />
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="mt-4 flex min-h-6 flex-wrap items-center gap-x-4 gap-y-2 text-xs text-text-muted">
      <span className="inline-flex items-center gap-1.5">
        <Star className="h-4 w-4" aria-hidden="true" />
        {data.stars}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <Clock3 className="h-4 w-4" aria-hidden="true" />
        {formatRelativeTime(data.pushedAt, t)}
      </span>
      {data.language ? (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border-default px-2 py-1">
          <span className="h-2 w-2 rounded-full bg-accent-2-from" aria-hidden="true" />
          {data.language}
        </span>
      ) : null}
    </div>
  );
}

function ProjectCard({ project }: { project: Project }) {
  const { t } = useLanguage();

  return (
    <Card
      className={cn(
        "flex h-full flex-col overflow-hidden !rounded-2xl !border-border-default !bg-bg-surface !shadow-none sm:transition-shadow sm:hover:shadow-2xl sm:hover:shadow-black/10",
        project.featured && "sm:flex-row",
      )}
    >
      <div
        className={cn(
          "group relative aspect-[3/2] overflow-hidden bg-bg-inverted",
          project.featured && "sm:min-h-full sm:w-2/5 sm:aspect-auto",
        )}
      >
        <img
          src={project.imageSrc}
          alt={`${t("projects.preview")} — ${project.name}`}
          loading="lazy"
          className="h-full w-full object-cover object-top transition duration-500 group-hover:scale-[1.03]"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-inverted/30 via-transparent to-transparent"
          aria-hidden="true"
        />
      </div>

      <CardContent className="flex flex-1 flex-col p-6">
        <span className="w-fit rounded-full bg-accent-primary px-3 py-1 text-xs font-semibold text-accent-foreground">
          {t(project.categoryKey)}
        </span>
        <h3 className="mt-4 text-xl font-black tracking-tight text-text-primary">
          {project.name}
        </h3>
        <p className="mt-3 text-sm leading-6 text-text-muted">
          {t(project.descriptionKey)}
        </p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label={project.name}>
          {project.stack.map((technology) => (
            <li
              key={technology}
              className="rounded-lg border border-border-default px-2.5 py-1 text-xs font-medium text-text-primary"
            >
              {technology}
            </li>
          ))}
        </ul>

        <div className="mt-auto pt-6">
          <a
            href={project.codeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-text-primary underline decoration-accent-primary decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2-from"
          >
            <SiGithub className="h-4 w-4" aria-hidden="true" />
            {t("projects.code")}
          </a>
          <ProjectRepositoryMeta codeUrl={project.codeUrl} />
        </div>
      </CardContent>
    </Card>
  );
}

export function Projects() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const revealInitial = shouldReduceMotion ? false : "hidden";

  return (
    <section
      id="projects"
      className="scroll-mt-28 rounded-hero bg-bg-inverted px-6 py-14 sm:px-10 sm:py-20 lg:px-14"
    >
      <motion.div
        className="max-w-3xl"
        initial={revealInitial}
        variants={fadeInUp}
        viewport={revealViewport}
        whileInView="visible"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text-on-inverted/60">
          {t("projects.eyebrow")}
        </p>
        <h2 className="mt-4 max-w-3xl text-4xl font-black tracking-tight text-text-on-inverted sm:text-5xl">
          {t("projects.title")}
        </h2>
      </motion.div>

      <motion.div
        className="mt-10 grid gap-4 sm:grid-cols-2"
        initial={revealInitial}
        variants={fadeInUp}
        viewport={revealViewport}
        whileInView="visible"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.slug}
            className={project.featured ? "sm:col-span-2" : undefined}
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={shouldReduceMotion ? undefined : { y: -5 }}
            viewport={revealViewport}
            transition={{ delay: shouldReduceMotion ? 0 : index * 0.08, duration: 0.45 }}
          >
            <ProjectCard project={project} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
