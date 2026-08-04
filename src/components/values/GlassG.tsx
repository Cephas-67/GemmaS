import type { CSSProperties } from "react";

const RIM_FILTER_ID = "glass-g-rim";

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

export function GlassG() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none z-[1] aspect-square w-[min(80vw,58rem,100vh)] select-none"
    >
      <svg width="0" height="0" className="absolute" aria-hidden="true">
        <defs>
          {/*
            Highlight = un anneau dérivé de la géométrie du masque lui-même
            (érosion + soustraction), pas d'un tracé dessiné à la main qui ne
            suit que certains arcs. feSpecularLighting relit cet anneau flouté
            (= une pente, comme un chanfrein) avec une lumière directionnelle,
            ce qui donne un reflet qui longe tout le contour, intérieur et
            extérieur compris, comme le fait l'effet Glass natif de Figma.
          */}
          <filter
            id={RIM_FILTER_ID}
            x="0%"
            y="0%"
            width="100%"
            height="100%"
            colorInterpolationFilters="sRGB"
          >
            <feImage
              href="/shapes/translucide-g-mask.svg"
              x="0"
              y="0"
              width="100%"
              height="100%"
              result="shape"
              preserveAspectRatio="xMidYMid meet"
            />

            <feMorphology in="shape" operator="erode" radius="1.3" result="eroded" />
            <feComposite in="shape" in2="eroded" operator="out" result="ring" />
            <feGaussianBlur in="ring" stdDeviation="10" result="bump" />

            <feSpecularLighting
              in="bump"
              surfaceScale="6"
              specularConstant="1.1"
              specularExponent="14"
              lightingColor="#ffffff"
              result="specular"
            >
              <feDistantLight azimuth="225" elevation="35" />
            </feSpecularLighting>
            <feComposite in="specular" in2="shape" operator="in" result="specularClipped" />

            {/* fin filet visible partout, sous le reflet directionnel */}
            <feColorMatrix
              in="ring"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 0.35 0"
              result="ringDim"
            />
            <feBlend in="specularClipped" in2="ringDim" mode="screen" />
          </filter>
        </defs>
      </svg>

      <div
        style={{ ...shapeMask, backgroundColor: "white" }}
        className="absolute inset-0 opacity-30 [filter:url(#glass-g-rim)]"
      />
    </div>
  );
}
