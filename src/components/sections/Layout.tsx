import type { PropsWithChildren } from "react";

import { useLanguage } from "@/context/LanguageContext";

import { Footer } from "./Footer";
import { CursorGlow } from "./CursorGlow";
import { Navbar } from "./Navbar";

export function Layout({ children }: PropsWithChildren) {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-bg-base">
      <CursorGlow />
      <a
        href="#main-content"
        className="sr-only fixed left-4 top-4 z-[60] rounded-lg bg-bg-inverted px-4 py-2 font-medium text-text-on-inverted focus:not-sr-only focus:outline-none focus:ring-2 focus:ring-accent-primary"
      >
        {t("accessibility.skipToContent")}
      </a>
      <Navbar />
      <main id="main-content" className="mx-auto w-full max-w-7xl px-4 pt-28 sm:px-6">
        {children}
      </main>
      <Footer />
    </div>
  );
}
