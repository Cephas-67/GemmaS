import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { mentionsLegales } from "@/data/legal";

export const metadata: Metadata = {
  title: "Mentions légales · GemmaS",
};

export default function MentionsLegalesPage() {
  return <LegalPage page={mentionsLegales} />;
}
