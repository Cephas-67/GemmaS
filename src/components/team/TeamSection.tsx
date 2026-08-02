"use client";

import { useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";
import { team } from "./data";
import { TeamCircle } from "./TeamCircle";
import { TeamMemberCard } from "./TeamMemberCard";

const SPRING = { type: "spring", stiffness: 300, damping: 30, mass: 0.9 } as const;
const LAYOUT_TRANSITION = { layout: SPRING };

// Piège vérifié : ne JAMAIS mettre une classe Tailwind `transition-transform`
// (ou toute transition CSS sur `transform`) sur un élément `layout`. Framer
// pilote déjà `transform` en JS pour le FLIP ; une transition CSS sur la même
// propriété se déclenche à chaque frame où Framer la modifie et casse la
// trajectoire (mesuré image par image : l'élément saute à la bonne position
// puis en dérive avant d'y revenir, quel que soit le spring/tween demandé).
// Le survol se fait donc via `whileHover`, pas via une classe CSS.

// Un seul noeud motion par membre, jamais démonté/remonté : c'est LUI qui
// grandit et change de forme (rond → card), pas un second élément qui
// apparaît à côté. Le contenu interne (rond vide vs card) se fond en fondu
// séparément, pendant que la boîte elle-même s'agrandit via `layout` — d'où
// l'impression d'un seul objet qui se transforme plutôt que d'une card qui
// "pop" à côté du rond.
const CONTENT_FADE = { duration: 0.2 };

// Tout est positionné en absolu dans un même repère plutôt que via un flex
// qui bascule row → column : laisser flex re-fluer fait bouger la boîte
// PARENTE (large et courte → étroite et haute), et Framer Motion compense ce
// changement par un scale non-uniforme le temps de la transition, ce qui
// écrase les ronds en ellipses au passage. En donnant à chaque rond une
// position absolue propre (qui ne bouge que par translation), il n'y a plus
// de parent à re-scaler : juste des translations, donc plus de déformation.
const CIRCLE = 64;
const ROW_GAP = 24;
const COL_GAP = 20;
const CARD_WIDTH = 256;
const CARD_TO_STACK_GAP = 40;

const rowWidth = team.length * CIRCLE + (team.length - 1) * ROW_GAP;
const stackHeight = (team.length - 1) * CIRCLE + (team.length - 2) * COL_GAP;
const stageWidth = Math.max(rowWidth, CARD_WIDTH + CARD_TO_STACK_GAP + CIRCLE);
const rowTop = (stackHeight - CIRCLE) / 2;

export function TeamSection() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  // Le membre qu'on vient de quitter est mémorisé à part pour être replacé
  // en haut de la pile (stackIndex 0) plutôt que retomber à sa place dans
  // l'ordre d'origine : c'est ce qui donne l'impression d'une rotation
  // (celui qui sort de la card remonte en haut, celui qu'on vient de cliquer
  // sort de la pile pour prendre sa place).
  const [previousId, setPreviousId] = useState<string | null>(null);
  const selected = team.find((member) => member.id === selectedId) ?? null;
  const otherIds = selected
    ? [
        ...(previousId && previousId !== selected.id ? [previousId] : []),
        ...team
          .filter((m) => m.id !== selected.id && m.id !== previousId)
          .map((m) => m.id),
      ]
    : [];

  function selectMember(id: string) {
    if (id === selectedId) return;
    setPreviousId(selectedId);
    setSelectedId(id);
  }

  return (
    <section
      id="team"
      aria-labelledby="team-title"
      className="relative overflow-hidden bg-background py-20 text-foreground sm:py-28 lg:py-36"
    >
      <Container size="wide">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            id="team-title"
            className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-medium leading-tight tracking-[-0.025em]"
          >
            GemmaS : Team
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            GemmaS repose sur l&apos;alliance de 5 fondateurs aux compétences
            synergiques et complémentaires. Un collectif d&apos;experts
            mobilisés pour concevoir des produits numériques d&apos;exception.
          </p>
        </div>

        <div
          className="relative mx-auto mt-16"
          style={{ width: stageWidth, height: stackHeight }}
        >
          {team.map((member) => {
            const isSelected = member.id === selectedId;
            const idleIndex = team.findIndex((m) => m.id === member.id);
            const stackIndex = otherIds.indexOf(member.id);

            const box = isSelected
              ? { top: 0, left: 0, width: CARD_WIDTH, height: "auto" as const }
              : selected
                ? {
                    top: stackIndex * (CIRCLE + COL_GAP),
                    left: CARD_WIDTH + CARD_TO_STACK_GAP,
                    width: CIRCLE,
                    height: CIRCLE,
                  }
                : {
                    top: rowTop,
                    left: idleIndex * (CIRCLE + ROW_GAP),
                    width: CIRCLE,
                    height: CIRCLE,
                  };

            function handleKeyDown(e: KeyboardEvent<HTMLDivElement>) {
              if (isSelected) return;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectMember(member.id);
              }
            }

            return (
              <motion.div
                key={member.id}
                layoutId={member.id}
                layout
                transition={LAYOUT_TRANSITION}
                whileHover={!isSelected ? { scale: 1.05 } : undefined}
                onClick={() => selectMember(member.id)}
                onKeyDown={handleKeyDown}
                role={!isSelected ? "button" : undefined}
                tabIndex={!isSelected ? 0 : undefined}
                aria-label={!isSelected ? `Voir le profil de ${member.name}` : undefined}
                style={{ position: "absolute", ...box }}
                className={cn(
                  "overflow-hidden transition-colors duration-300",
                  isSelected
                    ? "cursor-default rounded-[28px] border border-border bg-card"
                    : "cursor-pointer rounded-full bg-transparent",
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isSelected ? (
                    <motion.div
                      key="card"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={CONTENT_FADE}
                    >
                      <TeamMemberCard member={member} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="circle"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={CONTENT_FADE}
                      className="h-full w-full"
                    >
                      <TeamCircle className="h-full w-full" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {!selected && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute hidden lg:block"
              style={{ left: 0, top: rowTop + CIRCLE + 24, width: rowWidth }}
            >
              <p className="text-center text-sm text-muted-foreground">
                Cliquez pour en voir plus
              </p>
              <Image
                src="/shapes/team-hint-arrow.svg"
                alt=""
                width={141}
                height={60}
                className="absolute left-0 top-4 h-auto -scale-x-100"
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
