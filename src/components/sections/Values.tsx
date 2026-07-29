import { ValueCard } from "@/components/values/ValueCard";
import { ValuesConnector } from "@/components/values/ValuesConnector";
import { values } from "@/components/values/data";
import { GlassG } from "@/components/values/GlassG";
import Image from "next/image";

export default function Values() {
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
      <GlassG />

      <div className="relative z-10 mx-auto w-full max-w-page">
        <h2
          id="value-title"
          className="text-center font-display text-[clamp(1.75rem,3vw,2.25rem)] font-medium leading-tight tracking-[-0.025em]"
        >
          L&apos;exigence de la performance
        </h2>

        <div className="relative mx-auto mt-20 lg:mt-[12rem]">
          <ValuesConnector />

          <div className="relative flex items-center gap-5 sm:flex-row sm:flex-wrap sm:justify-center //lg:flex-nowrap //lg:justify-between lg:gap-[90px]">
            {values.map((value) => (
              <ValueCard key={value.id} value={value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
