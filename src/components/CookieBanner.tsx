"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useLang } from "@/contexts/LanguageContext";

const STORAGE_KEY = "gemmas-cookies-accepted";

// Bandeau d'information en pill noire, en bas centré. Le site ne depose
// aucun traceur (voir la politique de confidentialite, section cookies) : il
// n'y a donc rien a accepter, seulement a savoir. L'ancien texte, « en
// utilisant ce site, vous acceptez », supposait un consentement que le RGPD
// ne reconnait pas, et son bouton de preferences ne faisait rien.
export function CookieBanner() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-4 z-[80] flex justify-center px-3">
      <div
        className={cn(
          "pointer-events-auto flex items-center gap-3",
          // Fond plein plutôt que noir translucide flouté : à 90 % d'opacité le
          // flou ne se voyait pas, mais il recalculait l'arrière-plan à chaque
          // image du défilement. Même rendu, sans ce coût.
          "rounded-full bg-[#0b0b0b] text-white",
          "border border-white/10 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]",
          "min-h-11 py-1.5 pl-4 pr-1.5",
        )}
      >
        <span className="text-[13px] leading-snug">
          {t("cookies.text")}{" "}
          <a href="/politique-confidentialite#cookies" className="underline underline-offset-2 hover:text-white/80">
            {t("cookies.link")}
          </a>
        </span>
        <button
          type="button"
          onClick={accept}
          className="inline-flex h-8 shrink-0 items-center rounded-full bg-white px-4 text-[13px] font-medium text-black transition-colors hover:bg-white/90"
        >
          {t("cookies.accept")}
        </button>
      </div>
    </div>
  );
}