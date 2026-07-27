import { ValueCard } from "@/components/values/ValueCard";
import { ValuesConnector } from "@/components/values/ValuesConnector";
import { values } from "@/components/values/data";

export default function Values() {
  return (
    <section
      id="values"
      aria-labelledby="value-title"
      className="relative overflow-hidden bg-background px-5 py-20 text-foreground sm:px-8 sm:py-24 lg:min-h-[42rem] lg:px-12 lg:py-28"
    >
      <div className="mx-auto w-full max-w-page">
        <h2
          id="value-title"
          className="text-center font-display text-[clamp(1.75rem,3vw,2.25rem)] font-medium leading-tight tracking-[-0.025em]"
        >
          L&apos;exigence de la performance
        </h2>

        <div className="relative mx-auto mt-16 lg:mt-20">
          <ValuesConnector />

          <div className="relative flex flex-col items-center gap-10 sm:flex-row sm:flex-wrap sm:justify-center lg:flex-nowrap lg:justify-between lg:gap-12">
            {values.map((value) => (
              <ValueCard key={value.id} value={value} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
