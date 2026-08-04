import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

// Bouton signature : pill noir (light) / blanc (dark), cercle interne inversé
// avec ArrowRight, gap qui s'élargit au hover (pattern BDE).

type CommonProps = {
  children: ReactNode;
  variant?: "primary" | "ghost";
  className?: string;
};

type AsAnchor = CommonProps & { as?: "a" } & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "className" | "children">;
type AsButton = CommonProps & { as: "button" } & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

export function CTAButton(props: AsAnchor | AsButton) {
  const variant = props.variant ?? "primary";
  const isPrimary = variant === "primary";

  const base = cn(
    "group inline-flex items-center gap-2 self-start rounded-full py-1 pl-5 pr-1",
    "text-sm sm:text-base font-medium transition-all duration-300 ease-smooth",
    "hover:gap-3 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground",
    isPrimary
      ? "bg-foreground text-background"
      : "border border-border text-foreground hover:border-foreground/50",
    props.className,
  );

  const inner = (
    <>
      <span className="pr-1">{props.children}</span>
      <span
        aria-hidden
        className={cn(
          "grid h-9 w-9 sm:h-10 sm:w-10 place-items-center rounded-full transition-transform duration-300 ease-smooth group-hover:scale-110",
        )}
      >
        <ArrowUpRight className="h-4 w-4" />
      </span>
    </>
  );

  if (props.as === "button") {
    const { as: _as, variant: _v, className: _c, children: _ch, ...rest } = props;
    void _as; void _v; void _c; void _ch;
    return (
      <button {...rest} className={base}>
        {inner}
      </button>
    );
  }
  const { as: _as, variant: _v, className: _c, children: _ch, ...rest } = props;
  void _as; void _v; void _c; void _ch;
  return (
    <a {...rest} className={base}>
      {inner}
    </a>
  );
}
