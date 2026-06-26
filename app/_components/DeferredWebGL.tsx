"use client";

import dynamic from "next/dynamic";

// Sections WebGL (three + r3f / ogl) chargées en différé côté client uniquement —
// ssr:false évite tout crash sur `window` au rendu serveur,
// et leur skeleton garde la place pendant le download du chunk.

function SilkSkeleton({ minH = "60vh" }: { minH?: string }) {
  return <div aria-hidden className="bg-[#3a3540]" style={{ minHeight: minH }} />;
}

export const Manifesto = dynamic(
  () => import("@/components/sections/Manifesto").then((m) => m.Manifesto),
  { ssr: false, loading: () => <SilkSkeleton minH="60vh" /> },
);

export const HowItWorks = dynamic(
  () => import("@/components/sections/HowItWorks").then((m) => m.HowItWorks),
  { ssr: false, loading: () => <SilkSkeleton minH="100vh" /> },
);
