"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

// Les deux arcs qui relient les valeurs se tracent au défilement : le premier
// d'Agilité vers Technologies, puis le second de Technologies vers Culture, le
// point en tête du trait. Le tracé suit la position dans la page : on remonte
// au-dessus de la section, il se défait ; on redescend, il se refait.
//
// Les arcs ne sont pas placés à la main : ils se calculent sur la position
// réelle des cercles, donc ils suivent la grille à toutes les tailles d'écran
// (trois cercles en ligne, deux plus un, plus petits ou plus grands).
//
// `?arcs=0.5` fige l'avancement (0 à 1) pour regarder un instant précis.

type Cercle = { x: number; y: number; r: number };
type Trace = { d: string; fin: { x: number; y: number }; point: number };

function avancementFige(): number | null {
  if (typeof window === "undefined") return null;
  const brut = new URLSearchParams(window.location.search).get("arcs");
  if (brut === null) return null;
  const valeur = Number(brut);
  return Number.isFinite(valeur) ? Math.min(1, Math.max(0, valeur)) : null;
}

/**
 * L'arc entre deux cercles. Sur une même ligne, il part du haut (ou du bas) du
 * premier et retombe sur le haut (ou le bas) du second, bombé d'un quart de
 * leur écart, comme le dessin d'origine. Si le second est sur la ligne
 * d'en dessous, l'arc descend du premier et vient le prendre par le côté.
 */
function arcEntre(a: Cercle, b: Cercle, parDessous: boolean): Trace {
  const point = Math.max(3.5, a.r * 0.036);
  if (Math.abs(a.y - b.y) < a.r * 0.5) {
    const sens = parDessous ? 1 : -1;
    const depart = { x: a.x, y: a.y + sens * a.r };
    const fin = { x: b.x, y: b.y + sens * b.r };
    const bombe = 0.27 * Math.abs(fin.x - depart.x) * 1.33 * sens;
    return {
      d: `M${depart.x} ${depart.y}C${depart.x} ${depart.y + bombe} ${fin.x} ${fin.y + bombe} ${fin.x} ${fin.y}`,
      fin,
      point,
    };
  }
  const cote = Math.sign(a.x - b.x) || 1;
  const depart = { x: a.x, y: a.y + a.r };
  const fin = { x: b.x + cote * b.r, y: b.y };
  return {
    d: `M${depart.x} ${depart.y}C${depart.x} ${depart.y + 0.6 * (fin.y - depart.y)} ${fin.x + 0.6 * (depart.x - fin.x)} ${fin.y} ${fin.x} ${fin.y}`,
    fin,
    point,
  };
}

function Arc({ avancement, trace }: { avancement: MotionValue<number>; trace: Trace }) {
  const trait = useRef<SVGPathElement>(null);
  const point = useRef<SVGCircleElement>(null);
  // Un trait de longueur nulle à bout arrondi se dessine quand même en point :
  // il reste caché tant que le tracé n'a pas commencé.
  const visibilite = useTransform(avancement, (p) => (p > 0 ? 1 : 0));

  // Le point suit la tête du trait ; il se pose sur la fin quand l'arc est complet.
  const placerLePoint = useCallback(
    (p: number) => {
      const chemin = trait.current;
      const rond = point.current;
      if (!chemin || !rond) return;
      const tete = p >= 1 ? trace.fin : chemin.getPointAtLength(chemin.getTotalLength() * p);
      rond.setAttribute("cx", String(tete.x));
      rond.setAttribute("cy", String(tete.y));
      rond.style.opacity = p > 0 ? "1" : "0";
    },
    [trace],
  );
  useMotionValueEvent(avancement, "change", placerLePoint);
  useEffect(() => placerLePoint(avancement.get()), [placerLePoint, avancement]);

  return (
    <>
      <motion.path
        ref={trait}
        d={trace.d}
        stroke="white"
        strokeOpacity={0.4}
        strokeWidth={2}
        strokeLinecap="round"
        style={{ pathLength: avancement, opacity: visibilite }}
      />
      <circle ref={point} r={trace.point} fill="white" fillOpacity={0.4} style={{ opacity: 0 }} />
    </>
  );
}

// Les arcs sont traces en blanc : `invert` les rend lisibles en theme clair.
export function ValuesConnector() {
  const cadre = useRef<HTMLDivElement>(null);
  const reduit = useReducedMotion();
  const [fige, setFige] = useState<number | null>(null);
  const [plan, setPlan] = useState<{ l: number; h: number; traces: Trace[] } | null>(null);
  useEffect(() => setFige(avancementFige()), []);

  // Les cercles se lisent par offsetLeft/offsetTop : la position de mise en
  // page, sans la translation de leur apparition (getBoundingClientRect la
  // compterait et les arcs viseraient à côté pendant l'entrée). Chaque cercle
  // est dans le conteneur de son apparition, qui sert de repère à ses offsets :
  // on remonte la chaîne jusqu'au cadre commun.
  useEffect(() => {
    const boite = cadre.current?.parentElement;
    if (!boite) return;
    const position = (element: HTMLElement) => {
      let x = 0;
      let y = 0;
      let courant: HTMLElement | null = element;
      while (courant && courant !== boite) {
        x += courant.offsetLeft;
        y += courant.offsetTop;
        courant = courant.offsetParent as HTMLElement | null;
      }
      return { x, y };
    };
    const relever = () => {
      const cartes = [...boite.querySelectorAll<HTMLElement>("article")];
      if (cartes.length < 2) return;
      const cercles = cartes.map((carte) => {
        const { x, y } = position(carte);
        return { x: x + carte.offsetWidth / 2, y: y + carte.offsetHeight / 2, r: carte.offsetWidth / 2 };
      });
      const traces = cercles.slice(1).map((suivant, i) => arcEntre(cercles[i], suivant, i % 2 === 1));
      setPlan({ l: boite.offsetWidth, h: boite.offsetHeight, traces });
    };
    relever();
    const guetteur = new ResizeObserver(relever);
    guetteur.observe(boite);
    document.fonts?.ready.then(relever);
    return () => guetteur.disconnect();
  }, []);

  // 0 quand le haut de la rangée entre par le bas de l'écran, 1 quand son
  // milieu atteint le centre : le tracé finit pendant qu'on regarde les
  // cartes, pas après les avoir quittées (environ 500 px de défilement).
  const { scrollYProgress } = useScroll({ target: cadre, offset: ["start 90%", "center 50%"] });
  const premier = useTransform(scrollYProgress, (p) => {
    if (reduit) return 1;
    const v = fige ?? p;
    return Math.min(1, Math.max(0, v * 2));
  });
  const second = useTransform(scrollYProgress, (p) => {
    if (reduit) return 1;
    const v = fige ?? p;
    return Math.min(1, Math.max(0, v * 2 - 1));
  });
  const avancements = [premier, second];

  return (
    <div ref={cadre} aria-hidden="true" className="pointer-events-none absolute inset-0">
      {plan && (
        <svg
          width={plan.l}
          height={plan.h}
          viewBox={`0 0 ${plan.l} ${plan.h}`}
          fill="none"
          className="absolute left-0 top-0 overflow-visible invert dark:invert-0"
        >
          {plan.traces.slice(0, 2).map((trace, i) => (
            <Arc key={i} avancement={avancements[i]} trace={trace} />
          ))}
        </svg>
      )}
    </div>
  );
}
