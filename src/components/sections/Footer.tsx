import { useLanguage } from "@/context/LanguageContext";

export function Footer() {
  const { t } = useLanguage();
  const email = t("contact.email");
  const copyright = t("footer.copyright").replace("{year}", String(new Date().getFullYear()));

  return (
    <footer className="mt-8 border-t border-border-default bg-transparent">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-7 text-sm text-text-primary sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>{copyright}</p>
        <a
          href={`mailto:${email}`}
          className="w-fit font-medium underline decoration-accent-primary decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2-from"
        >
          {email}
        </a>
      </div>
    </footer>
  );
}
