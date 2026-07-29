import { Fragment } from "react";
import { cn } from "@/lib/utils";

type ProjectPaginationProps = {
  total: number;
  activeIndex: number;
  label: string;
};

// Puces de pagination centrées sous la carte principale, avec le nom du
// projet actif inséré juste après sa puce (pattern carrousel).
export function ProjectPagination({ total, activeIndex, label }: ProjectPaginationProps) {
  return (
    <div className="flex items-center justify-center gap-3">
      {Array.from({ length: total }).map((_, index) => (
        <Fragment key={index}>
          <span
            aria-hidden="true"
            className={cn(
              "rounded-full transition-all duration-300 ease-smooth",
              index === activeIndex ? "h-2.5 w-2.5 bg-foreground" : "h-2 w-2 bg-foreground/25",
            )}
          />
          {index === activeIndex && (
            <span className="text-sm font-medium text-foreground">{label}</span>
          )}
        </Fragment>
      ))}
    </div>
  );
}
