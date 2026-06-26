"use client";

import { useLang, type Lang } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";

// Switch FR/EN · pill foreground qui glisse de gauche à droite via translateX.
// Implémentation déterministe : un seul indicateur permanent, position pilotée
// par la prop `lang`, transition CSS pure (pas de layoutId Framer qui peut
// rater son bridge quand un node se démonte). Aucun lien avec l'état hover.
//
// Géométrie figée pour que l'indicateur tombe pile sur le bouton :
//   - conteneur : p-0.5 (2px de padding interne)
//   - boutons   : w-[30px] chacun, gap-0.5 (2px) entre eux
//   - décalage  : translateX(32px) pour passer FR → EN (30 + 2)
export function LanguageToggle({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useLang();
  const codes: Lang[] = ["fr", "en"];
  const activeIndex = codes.indexOf(lang);

  return (
    <div
      role="group"
      aria-label={t("lang.switchTo")}
      className={cn(
        "relative inline-flex h-8 items-center gap-0.5 rounded-full bg-foreground/[0.08] p-0.5 text-[11px] font-semibold",
        className,
      )}
    >
      {/* Indicateur unique · 30px de large, monté en absolute. Toujours présent
          au DOM donc la transition CSS s'applique de manière 100% fiable. */}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0.5 left-0.5 top-0.5 w-[30px] rounded-full bg-foreground transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ transform: `translateX(${activeIndex * 32}px)` }}
      />
      {codes.map((code) => {
        const active = lang === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLang(code)}
            aria-pressed={active ? "true" : "false"}
            className="relative z-10 inline-flex h-7 w-[30px] items-center justify-center rounded-full uppercase"
          >
            {/* Couleur du texte synchronisée avec l'arrivée de l'indicateur :
                quand la pastille devient active, on attend ~300ms (durée du
                glissement) avant de passer en text-background. Sinon le texte
                blanc apparaît au-dessus du fond blanc pendant le trajet. */}
            <span
              className={cn(
                "transition-colors duration-200",
                active
                  ? "text-background delay-[300ms]"
                  : "text-foreground/55 hover:text-foreground",
              )}
            >
              {code}
            </span>
          </button>
        );
      })}
    </div>
  );
}
