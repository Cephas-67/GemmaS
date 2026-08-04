"use client";

import Image from "next/image";
import LiquidGlass from "liquid-glass-react";
import type { CSSProperties } from "react";

const shapeMask: CSSProperties = {
  WebkitMaskImage: "url('/shapes/translucide-g-mask.svg')",
  maskImage: "url('/shapes/translucide-g-mask.svg')",
  WebkitMaskPosition: "center",
  maskPosition: "center",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskSize: "contain",
  maskSize: "contain",
};

const edgeMasks = {
  dispersion: {
    WebkitMaskImage:
      "linear-gradient(135deg, black 0%, black 30%, transparent 52%, transparent 100%)",
    maskImage:
      "linear-gradient(135deg, black 0%, black 30%, transparent 52%, transparent 100%)",
  },
  bar: {
    WebkitMaskImage:
      "radial-gradient(ellipse 18% 2.5% at 66% 62.5%, black 0%, black 45%, transparent 100%)",
    maskImage:
      "radial-gradient(ellipse 18% 2.5% at 66% 62.5%, black 0%, black 45%, transparent 100%)",
  },
} satisfies Record<string, CSSProperties>;

const edgeImageProps = {
  src: "/shapes/translucide-g-edge.svg",
  alt: "",
  fill: true,
} as const;

function CustomGlassG() {
  return (
    <div className="relative h-full w-full">
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          <filter id="glass-g-dispersion" x="-30%" y="-30%" width="160%" height="160%" colorInterpolationFilters="sRGB">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.4" result="soft" />
            <feColorMatrix in="soft" type="matrix" values="1 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.6 0" result="redSoft" />
            <feOffset in="redSoft" dx="-1.1" dy="0" result="redGlow" />
            <feColorMatrix in="soft" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 1 0 0  0 0 0 0.6 0" result="blueSoft" />
            <feOffset in="blueSoft" dx="1.1" dy="0" result="blueGlow" />
            <feBlend in="redGlow" in2="blueGlow" mode="screen" result="glow" />
            <feBlend in="glow" in2="SourceGraphic" mode="screen" />
          </filter>
          <filter id="glass-g-refraction" x="0%" y="0%" width="100%" height="100%" colorInterpolationFilters="sRGB">
            <feImage href="/shapes/translucide-g-mask.svg" x="0" y="0" width="100%" height="100%" result="shape" preserveAspectRatio="xMidYMid meet" />
            <feGaussianBlur in="shape" stdDeviation="24" result="bump" />
            <feDisplacementMap in="SourceGraphic" in2="bump" scale="18" xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>

      <div style={shapeMask} className="absolute inset-0 bg-white/[0.015] backdrop-blur-[10px] backdrop-saturate-150" />
      <div style={shapeMask} className="absolute inset-0 [backdrop-filter:url(#glass-g-refraction)]" />

      <div style={edgeMasks.dispersion} className="absolute inset-0 opacity-70">
        <Image {...edgeImageProps} className="[filter:url(#glass-g-dispersion)_drop-shadow(0_1px_2px_rgba(255,255,255,0.24))]" />
      </div>
      <div style={edgeMasks.bar} className="absolute inset-0 opacity-45">
        <Image {...edgeImageProps} className="drop-shadow-[0_1px_2px_rgba(255,255,255,0.2)]" />
      </div>
    </div>
  );
}

export default function GlassTestPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at 20% 30%, #2fd97f 0%, transparent 45%), radial-gradient(circle at 75% 60%, #3fa9ff 0%, transparent 50%), radial-gradient(circle at 50% 90%, #ffd23f 0%, transparent 40%), #0b0f1a",
        display: "flex",
        gap: "4rem",
        padding: "4rem",
        flexWrap: "wrap",
      }}
    >
      <div>
        <p style={{ color: "white", marginBottom: 16 }}>Actuel (fait main)</p>
        <div style={{ position: "relative", width: 500, height: 500 }}>
          <CustomGlassG />
        </div>
      </div>

      <div>
        <p style={{ color: "white", marginBottom: 16 }}>liquid-glass-react + masque G</p>
        <div style={{ position: "relative", width: 500, height: 500 }}>
          <div style={{ ...shapeMask, position: "absolute", inset: 0 }}>
            <LiquidGlass
              style={{ width: "100%", height: "100%", position: "absolute" }}
              cornerRadius={0}
              padding="0"
              displacementScale={70}
              blurAmount={0.08}
              saturation={150}
              aberrationIntensity={2}
              elasticity={0}
            >
              <div style={{ width: "100%", height: "100%" }} />
            </LiquidGlass>
          </div>
        </div>
      </div>

      <div>
        <p style={{ color: "white", marginBottom: 16 }}>liquid-glass-react tel quel (pilule, sans masque G)</p>
        <div style={{ position: "relative", width: 320, height: 140 }}>
          <LiquidGlass
            style={{ width: 300, height: 100 }}
            cornerRadius={50}
            padding="0"
            displacementScale={70}
            blurAmount={0.08}
            saturation={150}
            aberrationIntensity={2}
            elasticity={0}
          >
            <div style={{ width: 300, height: 100 }} />
          </LiquidGlass>
        </div>
      </div>
    </div>
  );
}
