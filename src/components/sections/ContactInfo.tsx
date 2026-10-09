import { Briefcase, Mail } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/context/LanguageContext";

export function ContactInfo() {
  const { t } = useLanguage();

  return (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-text-on-inverted/60">
        {t("contact.eyebrow")}
      </p>
      <h2 className="mt-4 max-w-md text-4xl font-black tracking-tight text-text-on-inverted sm:text-5xl">
        {t("contact.title")}
      </h2>

      <div className="mt-8 grid gap-4">
        <Card className="!rounded-2xl !border-border-default !bg-bg-surface !shadow-none">
          <CardContent className="flex items-start gap-4 p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-primary text-accent-foreground">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-base font-black text-text-primary">
                {t("contact.direct.title")}
              </h3>
              <a
                href={`mailto:${t("contact.email")}`}
                className="mt-2 inline-flex text-sm font-medium text-text-primary underline decoration-accent-primary decoration-2 underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2-from"
              >
                {t("contact.email")}
              </a>
            </div>
          </CardContent>
        </Card>

        <Card className="!rounded-2xl !border-border-default !bg-bg-surface !shadow-none">
          <CardContent className="flex items-start gap-4 p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-primary text-accent-foreground">
              <Briefcase className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <h3 className="text-base font-black text-text-primary">
                {t("contact.availability.title")}
              </h3>
              <p className="mt-2 text-sm leading-6 text-text-muted">
                {t("contact.availability.description")}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
