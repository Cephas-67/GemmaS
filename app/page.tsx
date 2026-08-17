import { Hero } from "@/components/sections/Hero";
import { Research } from "@/components/sections/Research";
import { FAQ } from "@/components/sections/FAQ";
import { HumanBrilliance } from "@/components/sections/HumanBrilliance";
import { Manifesto } from "./_components/DeferredWebGL";
import Values from "@/components/sections/Values";
import RecentProjects from "@/components/sections/RecentProjects";
import { TeamSection } from "@/components/sections/TeamSection";
import { PolesExcellence } from "@/components/sections/PolesExcellence";
import GamifiedHowItWorks from "@/components/sections/GamifiedHowItWorks";

// Ordre des sections · hero → pôles → valeurs → projets → équipe →
// recherche → manifesto → comment ça marche → FAQ → human brilliance.
// "Human brilliance" tient le rôle de cap final juste au-dessus du footer.
// Services / About / Impact restent en retrait le temps du rebrand GemmaS.
export default function Page() {
  return (
    <main>
      <Hero />
      <PolesExcellence />
      <Values />
      {/* <Services /> */}
      <RecentProjects />
      <TeamSection />
      {/* <About /> */}
      <Research />
      <Manifesto />
      <GamifiedHowItWorks />
      <FAQ />
      <HumanBrilliance />
    </main>
  );
}
