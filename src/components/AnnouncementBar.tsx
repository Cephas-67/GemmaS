"use client";

import { Logo } from "./Logo";
import { useLang } from "@/contexts/LanguageContext";

// Bandeau d'annonce tout en haut — strip noir, texte court centré.
export function AnnouncementBar() {
  const { t } = useLang();
  return (
    <div className="fixed inset-x-0 top-0 z-[60] bg-black text-white">
      <div className="mx-auto flex h-9 max-w-[1900px] items-center justify-center gap-2 px-4 text-[13px] font-medium">
        <span className="inline-flex shrink-0 items-center [&_span]:hidden [&_svg]:h-4">
          <Logo showLabel={false} />
        </span>
        <span className="truncate">{t("announce.text")}</span>
      </div>
    </div>
  );
}