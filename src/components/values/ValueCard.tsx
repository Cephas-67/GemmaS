"use client";

import Image from "next/image";
import type { ValueItem } from "@/data/values";
import { useLang } from "@/contexts/LanguageContext";

type ValueCardProps = {
  value: ValueItem;
};

export function ValueCard({ value }: ValueCardProps) {
  const Icon = value.icon;
  const { lang } = useLang();
  const title = lang === "en" ? value.titleEn : value.title;

  return (
    <article className="relative z-10 flex aspect-square w-[min(12rem,42vw)] shrink-0 items-center justify-center text-card-foreground sm:w-48 lg:w-[clamp(11.5rem,17vw,15rem)] isolate overflow-hidden rounded-full">
      {/* Pas de flou d'arriere-plan : sous un fond opaque a 90 %, il ne
          changeait que les traits de liaison vus au travers (12/255 au plus),
          et la carte graphique le recalculait a chaque image du defilement. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-background/90"
      />

      <Image
        src="/shapes/circle-glass.svg"
        alt=""
        fill
        sizes="(min-width: 640px) 12rem, 42vw"
        className="pointer-events-none select-none invert dark:invert-0"
      />

      <div className="relative z-10 flex flex-col items-center px-4 text-center">
        <Icon
          aria-hidden="true"
          strokeWidth={1.8}
          className="mb-2 h-8 w-8 text-muted-foreground sm:mb-3 sm:h-11 sm:w-11"
        />
        <h3 className="max-w-40 text-[0.82rem] font-medium sm:text-[0.98rem] leading-[1.42] tracking-[-0.01em]">
          {title}
        </h3>
      </div> 
    </article>
  );
}
