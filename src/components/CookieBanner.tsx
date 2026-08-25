"use client";

import { useEffect, useState } from "react";
import { Settings2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLang } from "@/contexts/LanguageContext";

const STORAGE_KEY = "gemmas-cookies-accepted";

// Bandeau cookies en pill noire, en bas centré. Disparaît après acceptation.
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
          "rounded-full bg-black/90 text-white backdrop-blur-md",
          "border border-white/10 shadow-[0_10px_30px_-12px_rgba(0,0,0,0.5)]",
          "h-11 pl-4 pr-1.5",
        )}
      >
        <span className="text-[13px]">
          {t("cookies.text")}{" "}
          <a href="/politique-confidentialite#cookies" className="underline underline-offset-2 hover:text-white/80">
            {t("cookies.link")}
          </a>
        </span>
        <button
          type="button"
          aria-label={t("cookies.prefs")}
          className="grid size-7 place-items-center rounded-full text-white/70 hover:text-white"
        >
          <Settings2 className="size-3.5" />
        </button>
        <button
          type="button"
          onClick={accept}
          className="inline-flex h-8 items-center rounded-full bg-white px-4 text-[13px] font-medium text-black transition-colors hover:bg-white/90"
        >
          {t("cookies.accept")}
        </button>
      </div>
    </div>
  );
}