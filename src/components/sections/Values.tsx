"use client";

import { ValueCard } from "@/components/values/ValueCard";
import { ValuesConnector } from "@/components/values/ValuesConnector";
import { values } from "@/data/values";
import { GlassG } from "@/components/values/GlassG";
import Image from "next/image";
import { useLang } from "@/contexts/LanguageContext";
import { Reveal } from "@/components/Reveal";
import SplitText from "@/components/effects/SplitText";

export default function Values() {
  const { t } = useLang();

  return (
    <section
      id="values"
      aria-labelledby="value-title"
      className="relative overflow-hidden bg-background px-5 py-20 text-foreground sm:px-8 sm:py-24 lg:min-h-screen lg:px-12 lg:py-28"
    >
      <Image
        src="/shapes/green-blue-gradient.svg"
        alt=""
        aria-hidden="true"
        width={1512}
        height={352}
        className="pointer-events-none absolute inset-x-0 top-[650px] h-auto w-full scale-[125%] select-none"
      />
      <span className="absolute bottom-0 right-0 w-fit h-fit translate-x-[10vw] translate-y-[25vh] ">
        <GlassG />
      </span>

      <div className="relative z-10 mx-auto w-full max-w-page">
        <h2
          id="value-title"
          className="text-center font-display text-[clamp(1.75rem,3vw,2.25rem)] font-medium leading-tight tracking-[-0.025em]"
        >
          <SplitText text={t("values.title")} />
        </h2>

        <div className="relative mx-auto mt-20 lg:mt-[12rem]">
          <ValuesConnector />

          <div className="relative grid grid-cols-2 justify-items-center gap-4 [&>*:last-child:nth-child(odd)]:col-span-2 sm:flex sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-5 lg:gap-[90px]">
            {values.map((value, index) => (
              <Reveal key={value.id} delay={index * 0.08}>
                <ValueCard value={value} />
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
