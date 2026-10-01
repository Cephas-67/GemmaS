import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { politiqueConfidentialite } from "@/data/legal";

export const metadata: Metadata = {
  title: "Politique de confidentialité · GemmaS",
};

export default function PolitiqueConfidentialitePage() {
  return <LegalPage page={politiqueConfidentialite} />;
}
