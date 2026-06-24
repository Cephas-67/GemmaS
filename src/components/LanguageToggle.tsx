import { motion } from "framer-motion";
import { useLang, type Lang } from "@/contexts/LanguageContext";

// Switch FR/EN — l'indicateur noir glisse entre les deux pastilles
// via layoutId (animation partagée Framer Motion).
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  const codes: Lang[] = ["fr", "en"];

  return (
    <div
      role="group"
      aria-label={t("lang.switchTo")}
      className={
        "relative inline-flex h-8 items-center gap-0.5 rounded-full bg-foreground/[0.08] p-0.5 text-[11px] font-semibold " +
        className
      }
    >
      {codes.map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active ? "true" : "false"}
            className="relative inline-flex h-7 min-w-[30px] items-center justify-center rounded-full px-2 uppercase"
          >
            {/* Indicateur animé : bloc qui glisse via layoutId. En light il
                est noir, en dark il devient blanc (inversion via foreground). */}
            {active && (
              <motion.span
                layoutId="lang-indicator"
                className="absolute inset-0 rounded-full bg-foreground"
                transition={{
                  type: "spring",
                  stiffness: 380,
                  damping: 30,
                  mass: 0.6,
                }}
              />
            )}
            <span
              className={
                "relative z-10 transition-colors duration-200 " +
                (active ? "text-background" : "text-foreground/50 hover:text-foreground")
              }
            >
              {code}
            </span>
          </button>
        );
      })}
    </div>
  );
}
