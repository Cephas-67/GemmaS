import Image from "next/image";
import type { ValueItem } from "./types";

type ValueCardProps = {
  value: ValueItem;
};

export function ValueCard({ value }: ValueCardProps) {
  const Icon = value.icon;

  return (
    <article className="relative z-10 flex aspect-square w-[min(12rem,72vw)] shrink-0 items-center justify-center text-card-foreground sm:w-48 lg:w-[clamp(11.5rem,17vw,12rem)]">
      <Image
        src="/shapes/circle-glass.svg"
        alt=""
        fill
        sizes="(min-width: 640px) 12rem, 72vw"
        className="pointer-events-none select-none"
      />

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <Icon
          aria-hidden="true"
          strokeWidth={1.8}
          className="mb-3 h-11 w-11 text-muted-foreground"
        />
        <h3 className="max-w-40 text-[0.98rem] font-medium leading-[1.42] tracking-[-0.01em]">
          {value.title}
        </h3>
      </div>
    </article>
  );
}
