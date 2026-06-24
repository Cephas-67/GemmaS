import { lazy, Suspense } from "react";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Impact } from "@/components/sections/Impact";
import { Poles } from "@/components/sections/Poles";
import { FAQ } from "@/components/sections/FAQ";

// Sections WebGL (three + r3f) chargées en différé — chunks pesants
// qu'on ne veut pas bloquer le premier paint.
const Manifesto = lazy(() =>
  import("@/components/sections/Manifesto").then((m) => ({ default: m.Manifesto })),
);
const HowItWorks = lazy(() =>
  import("@/components/sections/HowItWorks").then((m) => ({ default: m.HowItWorks })),
);

function SilkSkeleton({ minH = "60vh" }: { minH?: string }) {
  return <div aria-hidden className="bg-[#3a3540]" style={{ minHeight: minH }} />;
}

// Ordre des sections : hero → services → à propos → impact → comment ça marche → pôles.
export default function Index() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Suspense fallback={<SilkSkeleton minH="60vh" />}>
        <Manifesto />
      </Suspense>
      <Impact />
      <Suspense fallback={<SilkSkeleton minH="100vh" />}>
        <HowItWorks />
      </Suspense>
      <Poles />
      <FAQ />
    </main>
  );
}
