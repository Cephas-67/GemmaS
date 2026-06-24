// FlowingMenu, issu de React Bits.
// Adapté en TSX : marquee continu en hover, edge-aware (le voile entre par
// l'arête la plus proche du curseur, sort par la même).
import { useRef, useEffect, useState, type MouseEvent } from "react";
import { gsap } from "gsap";

import "./FlowingMenu.css";

export type FlowingMenuItem = {
  link: string;
  text: string;
  image: string;
};

type Props = {
  items?: FlowingMenuItem[];
  speed?: number;
  textColor?: string;
  bgColor?: string;
  marqueeBgColor?: string;
  marqueeTextColor?: string;
  borderColor?: string;
};

export default function FlowingMenu({
  items = [],
  speed = 15,
  textColor = "#fff",
  bgColor = "#120F17",
  marqueeBgColor = "#fff",
  marqueeTextColor = "#120F17",
  borderColor = "#fff",
}: Props) {
  return (
    <div className="menu-wrap" style={{ backgroundColor: bgColor }}>
      <nav className="menu">
        {items.map((item, idx) => (
          <MenuItem
            key={idx}
            {...item}
            speed={speed}
            textColor={textColor}
            marqueeBgColor={marqueeBgColor}
            marqueeTextColor={marqueeTextColor}
            borderColor={borderColor}
          />
        ))}
      </nav>
    </div>
  );
}

type ItemProps = FlowingMenuItem & {
  speed: number;
  textColor: string;
  marqueeBgColor: string;
  marqueeTextColor: string;
  borderColor: string;
};

function MenuItem({
  link,
  text,
  image,
  speed,
  textColor,
  marqueeBgColor,
  marqueeTextColor,
  borderColor,
}: ItemProps) {
  const itemRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeInnerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);
  const [repetitions, setRepetitions] = useState(4);

  // Sur tactile (pas de hover natif) : on remplace le hover par un tap toggle.
  // Le tap n'ouvre PAS le lien — il déclenche la même animation marquee que
  // le hover desktop. Re-tap = sortie.
  const [supportsHover] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(hover: hover)").matches
      : true,
  );
  const [tapActive, setTapActive] = useState(false);

  const animationDefaults = { duration: 0.6, ease: "expo" as const };

  const distMetric = (x: number, y: number, x2: number, y2: number) => {
    const xDiff = x - x2;
    const yDiff = y - y2;
    return xDiff * xDiff + yDiff * yDiff;
  };

  const findClosestEdge = (mx: number, my: number, w: number, h: number) => {
    const top = distMetric(mx, my, w / 2, 0);
    const bottom = distMetric(mx, my, w / 2, h);
    return top < bottom ? "top" : "bottom";
  };

  useEffect(() => {
    const calc = () => {
      if (!marqueeInnerRef.current) return;
      const part = marqueeInnerRef.current.querySelector(".marquee__part") as HTMLElement | null;
      if (!part) return;
      const contentWidth = part.offsetWidth;
      const viewportWidth = window.innerWidth;
      const needed = Math.ceil(viewportWidth / contentWidth) + 2;
      setRepetitions(Math.max(4, needed));
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [text, image]);

  useEffect(() => {
    const setup = () => {
      if (!marqueeInnerRef.current) return;
      const part = marqueeInnerRef.current.querySelector(".marquee__part") as HTMLElement | null;
      if (!part) return;
      const contentWidth = part.offsetWidth;
      if (contentWidth === 0) return;
      animationRef.current?.kill();
      animationRef.current = gsap.to(marqueeInnerRef.current, {
        x: -contentWidth,
        duration: speed,
        ease: "none",
        repeat: -1,
      });
    };
    const timer = setTimeout(setup, 50);
    return () => {
      clearTimeout(timer);
      animationRef.current?.kill();
    };
  }, [text, image, repetitions, speed]);

  // Animations factorisées : prennent une edge déjà calculée, ce qui permet
  // de les réutiliser depuis le hover (souris) ET depuis le tap (touch).
  const playEnter = (edge: "top" | "bottom") => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return;
    gsap
      .timeline({ defaults: animationDefaults })
      .set(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .set(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0)
      .to([marqueeRef.current, marqueeInnerRef.current], { y: "0%" }, 0);
  };

  const playLeave = (edge: "top" | "bottom") => {
    if (!marqueeRef.current || !marqueeInnerRef.current) return;
    gsap
      .timeline({ defaults: animationDefaults })
      .to(marqueeRef.current, { y: edge === "top" ? "-101%" : "101%" }, 0)
      .to(marqueeInnerRef.current, { y: edge === "top" ? "101%" : "-101%" }, 0);
  };

  const edgeFromEvent = (ev: MouseEvent) => {
    if (!itemRef.current) return "top" as const;
    const rect = itemRef.current.getBoundingClientRect();
    return findClosestEdge(
      ev.clientX - rect.left,
      ev.clientY - rect.top,
      rect.width,
      rect.height,
    );
  };

  const onEnter = (ev: MouseEvent) => playEnter(edgeFromEvent(ev));
  const onLeave = (ev: MouseEvent) => playLeave(edgeFromEvent(ev));

  // Tap sur tactile : on bloque la navigation et on toggle l'animation.
  // L'edge est forcé à "top" pour un mouvement constant et prévisible.
  const onClick = (ev: React.MouseEvent) => {
    if (supportsHover) return; // desktop : laisse le lien naviguer
    ev.preventDefault();
    if (tapActive) {
      playLeave("top");
      setTapActive(false);
    } else {
      playEnter("top");
      setTapActive(true);
    }
  };

  return (
    <div className="menu__item" ref={itemRef} style={{ borderColor }}>
      <a
        className="menu__item-link"
        href={link}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        onClick={onClick}
        style={{ color: textColor }}
      >
        {text}
      </a>
      <div className="marquee" ref={marqueeRef} style={{ backgroundColor: marqueeBgColor }}>
        <div className="marquee__inner-wrap">
          <div className="marquee__inner" ref={marqueeInnerRef} aria-hidden="true">
            {Array.from({ length: repetitions }).map((_, idx) => (
              <div className="marquee__part" key={idx} style={{ color: marqueeTextColor }}>
                <span>{text}</span>
                <div className="marquee__img" style={{ backgroundImage: `url(${image})` }} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
