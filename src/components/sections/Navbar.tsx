import { useState } from "react";
import { Download, Menu, Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLanguage } from "@/context/LanguageContext";
import { useTheme } from "@/context/ThemeContext";
import { type TranslationKey } from "@/data/translations";
import { type SectionId, useActiveSection } from "@/hooks/useActiveSection";
import { useScrolled } from "@/hooks/useScrolled";
import { cn } from "@/lib/utils";

const navigationLinks: Array<{ id: SectionId; labelKey: TranslationKey }> = [
  { id: "home", labelKey: "navbar.home" },
  { id: "about", labelKey: "navbar.about" },
  { id: "education", labelKey: "navbar.education" },
  { id: "skills", labelKey: "navbar.skills" },
  { id: "projects", labelKey: "navbar.projects" },
];

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection();
  const isScrolled = useScrolled();
  const { language, setLanguage, t } = useLanguage();
  const { setTheme, theme } = useTheme();

  function toggleLanguage() {
    setLanguage(language === "en" ? "fr" : "en");
  }

  function toggleTheme() {
    setTheme(theme === "light" ? "dark" : "light");
  }

  function getLinkClassName(sectionId: SectionId) {
    return cn(
      "border-b-2 border-transparent px-0 py-2 text-sm font-medium text-text-muted transition-colors hover:text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2-from",
      activeSection === sectionId
        ? "border-text-primary text-text-primary"
        : "",
    );
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border-default/80 bg-bg-base/90 px-4 backdrop-blur-md">
      <nav
        aria-label={t("navbar.menu.title")}
        className={cn(
          "mx-auto flex max-w-7xl items-center justify-between transition-[min-height,padding] duration-200 ease-out",
          isScrolled ? "min-h-14 py-2" : "min-h-20 py-3",
        )}
      >
        <a
          href="#home"
          className="text-base font-black tracking-tight text-text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-2-from sm:text-lg"
        >
          {t("navbar.name")}
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {navigationLinks.map(({ id, labelKey }) => (
            <a key={id} href={`#${id}`} className={getLinkClassName(id)}>
              {t(labelKey)}
            </a>
          ))}
        </div>

        <div className="hidden items-center gap-3 lg:flex">
          <Button
            asChild
            variant="outline"
            className="rounded-lg !border-border-default !bg-bg-surface !text-text-primary hover:!bg-bg-base focus-visible:!ring-accent-2-from"
          >
            <a href="/mohamed-amine-nafiai-cv.pdf" download>
              <Download className="h-4 w-4" aria-hidden="true" />
              {t("navbar.cv")}
            </a>
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={toggleLanguage}
            className="rounded-lg !border-border-default !bg-bg-surface !text-text-primary hover:!bg-bg-base focus-visible:!ring-accent-2-from"
          >
            {t("language.toggle")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={toggleTheme}
            aria-label={t(theme === "light" ? "theme.toggleToDark" : "theme.toggleToLight")}
            className="rounded-lg !border-border-default !bg-bg-surface !text-text-primary hover:!bg-bg-base focus-visible:!ring-accent-2-from"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Sun className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>
          <Button
            asChild
            variant="outline"
            className="rounded-lg !border-border-default !bg-bg-surface !text-text-primary hover:!bg-bg-base focus-visible:!ring-accent-2-from"
          >
            <a href="#contact">{t("navbar.cta")}</a>
          </Button>
        </div>

        <div className="flex items-center gap-2 lg:hidden">
          <Button
            type="button"
            variant="outline"
            onClick={toggleLanguage}
            className="rounded-lg !border-border-default !bg-bg-surface !text-text-primary hover:!bg-bg-base focus-visible:!ring-accent-2-from"
          >
            {t("language.toggle")}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={toggleTheme}
            aria-label={t(theme === "light" ? "theme.toggleToDark" : "theme.toggleToLight")}
            className="rounded-lg !border-border-default !bg-bg-surface !text-text-primary hover:!bg-bg-base focus-visible:!ring-accent-2-from"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Sun className="h-4 w-4" aria-hidden="true" />
            )}
          </Button>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button
                type="button"
                variant="outline"
                aria-label={t("navbar.menu.open")}
                className="rounded-lg !border-border-default !bg-bg-surface !text-text-primary hover:!bg-bg-base focus-visible:!ring-accent-2-from"
              >
                <Menu className="h-5 w-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="!border-border-default !bg-bg-surface">
              <SheetTitle className="!text-text-primary">{t("navbar.menu.title")}</SheetTitle>
              <div className="mt-8 flex flex-col gap-2">
                {navigationLinks.map(({ id, labelKey }) => (
                  <a
                    key={id}
                    href={`#${id}`}
                    className={getLinkClassName(id)}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(labelKey)}
                  </a>
                ))}
                <Button
                  asChild
                  variant="outline"
                  className="mt-4 rounded-full !border-border-default !bg-bg-surface !text-text-primary hover:!bg-bg-base focus-visible:!ring-accent-2-from"
                >
                  <a href="#contact" onClick={() => setIsMenuOpen(false)}>
                    {t("navbar.cta")}
                  </a>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-lg !border-border-default !bg-bg-surface !text-text-primary hover:!bg-bg-base focus-visible:!ring-accent-2-from"
                >
                  <a href="/mohamed-amine-nafiai-cv.pdf" download>
                    <Download className="h-4 w-4" aria-hidden="true" />
                    {t("navbar.cv")}
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
