"use client";

import {
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import "./Folder.css";
import { cn } from "@/lib/utils";

// Folder reactbits + extension GemmaS :
//   - click sur le dossier → ouverture / fermeture (animation papiers déployés)
//   - click sur un papier ouvert → ce papier se centre + grossit, les autres
//     reculent et perdent en opacité. Re-click → retour fan.
// Extension à 5 papiers pour accueillir l'équipe des 5 co-fondateurs.
type Props = {
  color?: string;
  size?: number;
  items?: ReactNode[];
  className?: string;
};

const MAX_ITEMS = 5;

function darkenColor(hex: string, percent: number) {
  let color = hex.startsWith("#") ? hex.slice(1) : hex;
  if (color.length === 3) {
    color = color
      .split("")
      .map((c) => c + c)
      .join("");
  }
  const num = parseInt(color, 16);
  let r = (num >> 16) & 0xff;
  let g = (num >> 8) & 0xff;
  let b = num & 0xff;
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))));
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))));
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))));
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

export function Folder({ color = "#3D2EE0", size = 1, items = [], className = "" }: Props) {
  const papers: (ReactNode | null)[] = items.slice(0, MAX_ITEMS);
  while (papers.length < MAX_ITEMS) papers.push(null);

  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState<number | null>(null);
  const [offsets, setOffsets] = useState(
    Array.from({ length: MAX_ITEMS }, () => ({ x: 0, y: 0 })),
  );

  const folderBackColor = darkenColor(color, 0.08);
  const paper1 = darkenColor("#ffffff", 0.1);
  const paper2 = darkenColor("#ffffff", 0.05);
  const paper3 = "#ffffff";

  const toggleOpen = () => {
    setOpen((prev) => {
      if (prev) {
        setOffsets(Array.from({ length: MAX_ITEMS }, () => ({ x: 0, y: 0 })));
        setFocused(null);
      }
      return !prev;
    });
  };

  const handleKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleOpen();
    }
  };

  const handlePaperClick = (e: MouseEvent<HTMLDivElement>, i: number) => {
    if (!open) return;
    e.stopPropagation(); // ne pas fermer le dossier
    setFocused((curr) => (curr === i ? null : i));
  };

  const handleMove = (e: MouseEvent<HTMLDivElement>, i: number) => {
    if (!open || focused !== null) return; // magnet désactivé quand un papier est focus
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    setOffsets((prev) => {
      const next = [...prev];
      next[i] = { x: (e.clientX - cx) * 0.15, y: (e.clientY - cy) * 0.15 };
      return next;
    });
  };

  const handleLeave = (_e: MouseEvent<HTMLDivElement>, i: number) => {
    setOffsets((prev) => {
      const next = [...prev];
      next[i] = { x: 0, y: 0 };
      return next;
    });
  };

  const folderStyle = {
    "--folder-color": color,
    "--folder-back-color": folderBackColor,
    "--paper-1": paper1,
    "--paper-2": paper2,
    "--paper-3": paper3,
  } as CSSProperties;

  // Style appliqué quand un papier est en focus : il vient au centre, grossit
  // et passe au-dessus de tout. Les autres reculent + s'estompent.
  const focusedStyle = (i: number): CSSProperties | undefined => {
    if (focused === null) return undefined;
    if (i === focused) {
      return {
        transform: "translate(-50%, -100%) rotateZ(0deg) scale(1.5)",
        zIndex: 50,
        transition: "transform 0.4s ease-in-out, opacity 0.4s",
      };
    }
    return {
      opacity: 0.25,
      transition: "opacity 0.4s",
    };
  };

  return (
    <div style={{ transform: `scale(${size})` }} className={className}>
      <div
        className={cn("zl-folder", open && "open")}
        style={folderStyle}
        onClick={toggleOpen}
        onKeyDown={handleKey}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-label={open ? "Fermer le dossier" : "Ouvrir le dossier"}
      >
        <div className="zl-folder__back">
          {papers.map((item, i) => {
            const focusOverride = focusedStyle(i);
            return (
              <div
                key={i}
                className="zl-paper"
                onClick={(e) => handlePaperClick(e, i)}
                onMouseMove={(e) => handleMove(e, i)}
                onMouseLeave={(e) => handleLeave(e, i)}
                style={
                  focusOverride ??
                  (open
                    ? ({
                        "--magnet-x": `${offsets[i]?.x || 0}px`,
                        "--magnet-y": `${offsets[i]?.y || 0}px`,
                      } as CSSProperties)
                    : undefined)
                }
              >
                {item}
              </div>
            );
          })}
          <div className="zl-folder__front" />
          <div className="zl-folder__front right" />
        </div>
      </div>
    </div>
  );
}