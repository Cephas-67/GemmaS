import Image from "next/image";
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
  main: {
    WebkitMaskImage:
      "linear-gradient(135deg, transparent 20%, transparent 48%, black 70%, black 100%)",
    maskImage:
      "linear-gradient(135deg, transparent 20%, transparent 48%, black 70%, black 100%)",
  },
  cool: {
    WebkitMaskImage:
      "linear-gradient(145deg, transparent 46%, black 60%, black 78%, transparent 92%)",
    maskImage:
      "linear-gradient(145deg, transparent 46%, black 60%, black 78%, transparent 92%)",
  },
  warm: {
    WebkitMaskImage:
      "linear-gradient(325deg, transparent 42%, black 57%, black 72%, transparent 88%)",
    maskImage:
      "linear-gradient(325deg, transparent 42%, black 57%, black 72%, transparent 88%)",
  },
} satisfies Record<string, CSSProperties>;

const edgeImageProps = {
  src: "/shapes/translucide-g-edge.svg",
  alt: "",
  fill: true,
  sizes: "(min-width: 890px) 44.5rem, 80vw",
} as const;

export function GlassGRightLight() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute right-0 bottom-0 z-[1] aspect-square w-[min(80vw,44.5rem)] select-none"
    >
      <div
        style={shapeMask}
        className="absolute inset-0 bg-white/[0.015] backdrop-blur-[10px] backdrop-saturate-150"
      />

      <div style={edgeMasks.cool} className="absolute inset-0 opacity-25">
        <Image
          {...edgeImageProps}
          className="translate-x-[1.5px] [filter:sepia(1)_saturate(7)_hue-rotate(175deg)]"
        />
      </div>

      <div style={edgeMasks.warm} className="absolute inset-0 opacity-25">
        <Image
          {...edgeImageProps}
          className="-translate-x-[1.5px] [filter:sepia(1)_saturate(7)_hue-rotate(350deg)]"
        />
      </div>

      <div style={edgeMasks.main} className="absolute inset-0 opacity-65">
        <Image
          {...edgeImageProps}
          className="drop-shadow-[0_1px_2px_rgba(255,255,255,0.24)]"
        />
      </div>
    </div>
  );
}
