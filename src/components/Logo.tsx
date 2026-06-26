import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  showLabel?: boolean;
  // "md" (défaut nav) ou "lg" (~2× plus grand, pour footer/headers).
  size?: "md" | "lg";
};

// Logo GemmaS · monogramme G. Deux SVG officiels fournis par le client,
// l'un pour le thème clair (anneau bleu marque), l'autre pour le thème
// sombre (anneau blanc). On ne touche pas aux fichiers, on bascule via les
// classes Tailwind `dark:` qui s'appuient sur la classe sur <html>, ce qui
// évite tout flash d'hydratation.
export function Logo({ className, showLabel = true, size = "md" }: Props) {
  const isLg = size === "lg";
  const imgClasses = cn(
    "block w-auto shrink-0",
    isLg ? "h-12 sm:h-14" : "h-7 sm:h-8",
  );

  return (
    <a
      href="#top"
      aria-label="GemmaS"
      className={cn(
        "inline-flex items-center",
        isLg ? "gap-3" : "gap-2",
        className,
      )}
    >
      {/* Light · anneau du G en bleu marque #4F679E */}
      <img
        src="/logo-gemmas.svg"
        alt=""
        draggable={false}
        className={cn(imgClasses, "dark:hidden")}
      />
      {/* Dark · anneau du G en blanc (#FFFFFF) pour rester lisible sur fond noir */}
      <img
        src="/logo-gemmas-dark.svg"
        alt=""
        draggable={false}
        className={cn(imgClasses, "hidden dark:block")}
      />
      {showLabel && (
        <span
          className={cn(
            "font-display font-semibold tracking-tight leading-none",
            isLg ? "text-[26px] sm:text-[28px]" : "text-[15px] sm:text-base",
          )}
        >
          GemmaS
        </span>
      )}
    </a>
  );
}
