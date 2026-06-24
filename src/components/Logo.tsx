import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  showLabel?: boolean;
  // "md" (défaut nav) ou "lg" (~2× plus grand, pour footer/headers).
  size?: "md" | "lg";
};

// Logo Zara Labs — SVG inline, couleurs marque depuis les tokens HSL.
// Quand showLabel : wordmark "Zara" en haut, "Labs" en bas, à droite du
// symbole — comme une marque déposée.
export function Logo({ className, showLabel = true, size = "md" }: Props) {
  const isLg = size === "lg";
  return (
    <a
      href="#top"
      aria-label="Zara Labs"
      className={cn(
        "inline-flex items-center",
        isLg ? "gap-3" : "gap-2",
        className,
      )}
    >
      <svg
        aria-hidden
        viewBox="0 0 178.5 126.2"
        className={cn(
          "block w-auto shrink-0",
          isLg ? "h-14 sm:h-16" : "h-7 sm:h-8",
        )}
        xmlns="http://www.w3.org/2000/svg"
      >
        <g transform="translate(0.5 0.5)">
          <path
            d="M0 125L71.5 125L71.5 125.2L39 90L39 0L0 0"
            fill="hsl(var(--brand-orange))"
            fillRule="evenodd"
            transform="translate(106 0)"
          />
          <path
            d="M0 0L0 31.5L57 31.5L0 92L0 125L106 125L106 84.9999L57 84.2L106 35.4L106 0.199982L0 0Z"
            fill="hsl(var(--brand-blue))"
            fillRule="evenodd"
          />
        </g>
      </svg>
      {showLabel && (
        <span className="flex flex-col leading-none font-display font-semibold tracking-tight">
          <span className={isLg ? "text-[26px] sm:text-[28px]" : "text-[13px] sm:text-sm"}>
            Zara
          </span>
          <span className={isLg ? "text-[26px] sm:text-[28px]" : "text-[13px] sm:text-sm"}>
            Labs
          </span>
        </span>
      )}
    </a>
  );
}
