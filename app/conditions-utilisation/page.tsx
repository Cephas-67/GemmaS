import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/LegalPage";
import { termsOfUse } from "@/data/legal";

export const metadata: Metadata = {
  title: "Conditions d'utilisation · GemmaS",
};

export default function TermsOfUsePage() {
  return <LegalPage page={termsOfUse} />;
}
