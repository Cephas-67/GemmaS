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
    <article className="relative z-10 flex aspect-square w-[min(12rem,72vw)] shrink-0 items-center justify-center text-card-foreground sm:w-48 lg:w-[clamp(11.5rem,17vw,15rem)] isolate overflow-hidden rounded-full">
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-full bg-background/90 backdrop-blur-[48px]"
      />

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
          {title}
        </h3>
      </div> 
    </article>
  );
}
