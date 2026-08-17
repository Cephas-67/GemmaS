"use client";

import Link from "next/link";
import { useLang } from "@/contexts/LanguageContext";

export default function NotFound() {
  const { t } = useLang();

  return (
    <main className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center space-y-4">
        <p className="font-mono text-sm uppercase tracking-widest text-brand-orange">
          404
        </p>
        <h1 className="font-display text-4xl font-bold">{t("notFound.title")}</h1>
        <Link
          href="/"
          className="inline-block text-brand-blue underline-offset-4 hover:underline"
        >
          {t("notFound.cta")}
        </Link>
      </div>
    </main>
  );
}
