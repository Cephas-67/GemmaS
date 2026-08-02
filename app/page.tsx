import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { About } from "@/components/sections/About";
import { Research } from "@/components/sections/Research";
import { Impact } from "@/components/sections/Impact";
import { Poles } from "@/components/sections/Poles";
import { FAQ } from "@/components/sections/FAQ";
import { HumanBrilliance } from "@/components/sections/HumanBrilliance";
import { Manifesto, HowItWorks } from "./_components/DeferredWebGL";
import Values from "@/components/sections/Values";
import RecentProjects from "@/components/sections/RecentProjects";
import { TeamSection } from "@/components/team/TeamSection";

// Ordre des sections · hero → services → équipe → recherche →
// manifesto → impact → comment ça marche → pôles → FAQ → human brilliance.
// "Human brilliance" tient le rôle de cap final juste au-dessus du footer.
export default function Page() {
  return (
    <main>
      <Hero />
      <Values />
      {/* <Services /> */}
      <RecentProjects />
      <TeamSection />
      {/* <About /> */}
      <Research />
      <Manifesto />
      {/* <Impact /> */}
      {/* <HowItWorks /> */}
      <Poles />
      <FAQ />
      <HumanBrilliance />
    </main>
  );
}
