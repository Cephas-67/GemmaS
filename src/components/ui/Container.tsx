import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

// Container largeur max 1200px (page BDE), padding fluide mobile-first.
export function Container({
  children,
  className,
  size = "default",
}: {
  children: ReactNode;
  className?: string;
  size?: "tight" | "default" | "wide";
}) {
  const max =
    size === "tight"
      ? "max-w-3xl"
      : size === "wide"
        ? "max-w-page"
        : "max-w-5xl";
  return (
    <div className={cn("mx-auto w-full px-4 sm:px-6 lg:px-10", max, className)}>
      {children}
    </div>
  );
}
