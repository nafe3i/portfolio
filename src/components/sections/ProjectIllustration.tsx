import type { ProjectSlug } from "@/data/projects";

interface ProjectIllustrationProps {
  slug: ProjectSlug;
}

function AuiEmailIllustration() {
  return (
    <>
      <rect x="28" y="44" width="104" height="70" rx="8" />
      <path d="m30 49 50 38 50-38" />
      <circle cx="128" cy="48" r="20" fill="currentColor" opacity="0.16" stroke="none" />
      <path d="m118 49 7 7 13-15" />
    </>
  );
}

function ElectroChargeIllustration() {
  return (
    <>
      <circle cx="80" cy="80" r="52" />
      <path d="M80 38c-17 0-30 13-30 30 0 23 30 51 30 51s30-28 30-51c0-17-13-30-30-30Z" />
      <path d="m88 50-20 32h15l-8 27 25-37H85Z" fill="currentColor" stroke="none" />
    </>
  );
}

function SalusIllustration() {
  return (
    <>
      <path d="M22 92h28l13-29 19 43 17-32h39" />
      <rect x="104" y="30" width="34" height="34" rx="8" />
      <path d="M121 38v18m-9-9h18" />
    </>
  );
}

function EasyColocIllustration() {
  return (
    <>
      <path d="m29 75 51-42 51 42v45H29Z" />
      <path d="M62 120V91h36v29" />
      <circle cx="62" cy="68" r="8" fill="currentColor" stroke="none" />
      <circle cx="98" cy="68" r="8" fill="currentColor" stroke="none" />
    </>
  );
}

export function ProjectIllustration({ slug }: ProjectIllustrationProps) {
  return (
    <svg
      viewBox="0 0 160 150"
      fill="none"
      className="h-36 w-full text-accent-primary"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="4"
      aria-hidden="true"
    >
      {slug === "aui-email-system" ? <AuiEmailIllustration /> : null}
      {slug === "electrocharge" ? <ElectroChargeIllustration /> : null}
      {slug === "salus" ? <SalusIllustration /> : null}
      {slug === "easycoloc" ? <EasyColocIllustration /> : null}
    </svg>
  );
}
