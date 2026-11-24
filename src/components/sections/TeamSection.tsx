"use client";

import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { CTAButton } from "@/components/ui/CTAButton";
import { cn } from "@/lib/utils";
import { team, type TeamMember } from "@/data/team";
import { useLang } from "@/contexts/LanguageContext";
import SplitText from "@/components/effects/SplitText";

// Une rangée de portraits ronds. Au survol, le rond grandit, reprend sa
// couleur et le prénom se lève lettre par lettre. Au clic, le rond choisi
// devient la carte du membre, à droite, et les autres se rangent en colonne
// à gauche (en ligne dessous sur téléphone).
//
// Chaque membre est une seule boîte posée en absolu. Toute la mise en place
// est une fonction de (largeur, choisi, survol) : les boîtes reçoivent leur
// géométrie, une transition CSS fait le trajet. Pas de `layout` Framer ici :
// son FLIP passe par un scale qui écrase les ronds en ellipses pendant le
// trajet, alors que largeur et hauteur animées gardent le rond rond.

const COURBE = "cubic-bezier(0.16, 1, 0.3, 1)";
const TRAJET = `left 0.8s ${COURBE}, top 0.8s ${COURBE}, width 0.8s ${COURBE}, height 0.8s ${COURBE}, border-radius 0.8s ${COURBE}`;

type Boite = { l: number; t: number; w: number; h: number };
type Etiquette = { l: number; t: number; w: number };

function rangee(W: number, etroit: boolean, survol: number | null) {
  const base = etroit ? Math.min(64, (W - 48) / 5) : 160;
  const grand = etroit ? base : 240;
  const ecart = etroit ? 12 : 32;
  const tailles = team.map((_, i) => (i === survol ? grand : base));
  let x = (W - tailles.reduce((a, b) => a + b, 0) - ecart * (team.length - 1)) / 2;
  const milieu = grand / 2;
  const boites: Boite[] = [];
  const etiquettes: Etiquette[] = [];
  tailles.forEach((t, i) => {
    boites[i] = { l: x, t: milieu - t / 2, w: t, h: t };
    const lw = etroit ? t + 20 : 180;
    etiquettes[i] = { l: x + t / 2 - lw / 2, t: milieu + t / 2 + 14, w: lw };
    x += t + ecart;
  });
  return { boites, etiquettes, hauteur: grand + (etroit ? 40 : 90) };
}

function disposer(W: number, choisi: number | null, survol: number | null) {
  const etroit = W < 640;
  let boites: Boite[] = [];
  // Les étiquettes gardent toujours leur place de rangée : à l'ouverture
  // elles s'effacent sur place. Sans position, elles sautaient toutes dans
  // le coin de la scène et s'y superposaient le temps de leur fondu.
  const { etiquettes, ...repos } = rangee(W, etroit, choisi === null ? survol : null);
  let hauteur: number;
  // Hauteur calée sur la phrase la plus longue (quatre lignes) plus le bouton.
  let carte = { w: 460, h: 590 };

  if (choisi === null) {
    boites = repos.boites;
    hauteur = repos.hauteur;
  } else {
    const autres = team.map((_, i) => i).filter((i) => i !== choisi);
    if (!etroit) {
      const c = 72, g = 16, ecart = 48;
      const x0 = (W - (c + ecart + carte.w)) / 2;
      const haut = (carte.h - (autres.length * c + (autres.length - 1) * g)) / 2;
      autres.forEach((i, k) => (boites[i] = { l: x0, t: haut + k * (c + g), w: c, h: c }));
      boites[choisi] = { l: x0 + c + ecart, t: 0, w: carte.w, h: carte.h };
      hauteur = carte.h;
    } else {
      const c = 56, g = 14;
      // La photo est en 4/3 sur toute la largeur moins la marge : la carte
      // prend sa hauteur, plus la place du texte et du bouton.
      carte = { w: W, h: Math.round((W - 32) * 0.75) + 210 };
      const x0 = (W - (autres.length * c + (autres.length - 1) * g)) / 2;
      boites[choisi] = { l: 0, t: 0, w: carte.w, h: carte.h };
      autres.forEach((i, k) => (boites[i] = { l: x0 + k * (c + g), t: carte.h + 24, w: c, h: c }));
      hauteur = carte.h + 24 + c;
    }
  }
  return { etroit, boites, etiquettes, hauteur, carte };
}

// Le prénom qui se lève : chaque lettre monte de sous sa fenêtre, le milieu
// du mot d'abord, les bords ensuite.
function PrenomQuiSeLeve({ prenom, leve, delai = 0 }: { prenom: string; leve: boolean; delai?: number }) {
  const lettres = [...prenom];
  const milieu = (lettres.length - 1) / 2;
  return (
    <span aria-hidden="true" className="inline-flex overflow-hidden pb-[0.15em] leading-[1.05]">
      {lettres.map((lettre, i) => (
        <span
          key={i}
          className="inline-block motion-reduce:!transition-none"
          style={{
            transform: leve ? "translateY(0)" : "translateY(110%)",
            transition: `transform 0.7s ${COURBE} ${delai + Math.round(Math.abs(i - milieu)) * 0.035}s`,
          }}
        >
          {lettre}
        </span>
      ))}
    </span>
  );
}

const cadrage = (member: TeamMember) =>
  cn(
    "object-cover",
    member.focus === "top" && "object-top",
    member.focus === "topZoom" && "object-top scale-125",
    member.focus === "center" && "object-center",
  );

export function TeamSection() {
  const { t, lang } = useLang();
  const scene = useRef<HTMLDivElement>(null);
  const [largeur, setLargeur] = useState(0);
  const [choisi, setChoisi] = useState<number | null>(null);
  const [survol, setSurvol] = useState<number | null>(null);
  // Pas de transition tant que la scène n'a pas été mesurée une première fois :
  // sinon les ronds glisseraient depuis le coin au chargement.
  const [pret, setPret] = useState(false);

  useLayoutEffect(() => {
    const element = scene.current;
    if (!element) return;
    const mesurer = () => setLargeur(element.clientWidth);
    mesurer();
    const observateur = new ResizeObserver(mesurer);
    observateur.observe(element);
    return () => observateur.disconnect();
  }, []);

  useEffect(() => {
    if (!largeur || pret) return;
    const image = requestAnimationFrame(() => requestAnimationFrame(() => setPret(true)));
    return () => cancelAnimationFrame(image);
  }, [largeur, pret]);

  // ?equipe=n ouvre le membre n au chargement, pour regarder la carte sans clic.
  useEffect(() => {
    const n = new URLSearchParams(location.search).get("equipe");
    if (n !== null && team[Number(n)]) setChoisi(Number(n));
  }, []);

  // Un clic hors de la scène, ou Échap, et tout revient en rangée.
  useEffect(() => {
    if (choisi === null) return;
    const dehors = (e: PointerEvent) => {
      if (scene.current && !scene.current.contains(e.target as Node)) setChoisi(null);
    };
    const echap = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setChoisi(null);
    };
    document.addEventListener("pointerdown", dehors);
    document.addEventListener("keydown", echap);
    return () => {
      document.removeEventListener("pointerdown", dehors);
      document.removeEventListener("keydown", echap);
    };
  }, [choisi]);

  const choisir = (i: number) => {
    if (i === choisi) return;
    setChoisi(i);
    setSurvol(null);
  };

  const { etroit, boites, etiquettes, hauteur, carte } = disposer(largeur || 1, choisi, survol);
  const transition = pret ? TRAJET : "none";

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
            <SplitText text={t("team.title")} />
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">{t("team.intro")}</p>
        </div>

        <div
          ref={scene}
          className={cn("relative mt-16 sm:mt-[72px]", !largeur && "invisible")}
          style={{ height: hauteur, transition: pret ? `height 0.8s ${COURBE}` : "none" }}
          onPointerLeave={() => setSurvol(null)}
        >
          {team.map((member, i) => {
            const ouvert = i === choisi;
            const actif = choisi === null && i === survol;
            const b = boites[i];
            const portfolio = member.portfolioUrl && member.portfolioUrl !== "#";

            function auClavier(e: KeyboardEvent<HTMLDivElement>) {
              if (ouvert) return;
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                choisir(i);
              }
            }

            return (
              <div
                key={member.id}
                role={ouvert ? undefined : "button"}
                tabIndex={ouvert ? undefined : 0}
                aria-label={ouvert ? undefined : lang === "en" ? `View ${member.name}'s profile` : `Voir le profil de ${member.name}`}
                onPointerEnter={() => choisi === null && !etroit && setSurvol(i)}
                onClick={() => choisir(i)}
                onKeyDown={auClavier}
                className={cn(
                  "group absolute overflow-hidden border border-border bg-card",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-foreground",
                  ouvert ? "cursor-default" : "cursor-pointer",
                )}
                style={{
                  left: b.l,
                  top: b.t,
                  width: b.w,
                  height: b.h,
                  borderRadius: ouvert ? 28 : 9999,
                  transition,
                }}
              >
                {/* Le rond : le portrait seul, en gris au repos sur ordinateur. */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 transition-opacity duration-300"
                  style={{ opacity: ouvert ? 0 : 1 }}
                >
                  <Image
                    src={member.avatar}
                    alt=""
                    fill
                    sizes="240px"
                    className={cn(
                      cadrage(member),
                      "transition-[filter,transform] duration-500",
                      !etroit && !actif && "grayscale brightness-[0.8] group-hover:grayscale-0 group-hover:brightness-100",
                      choisi !== null && "group-hover:scale-[1.08]",
                    )}
                  />
                </div>

                {/* La carte : posée à sa taille finale dès le départ, la boîte qui
                    grandit la découvre. Inerte tant qu'elle est fermée. */}
                <div
                  inert={!ouvert}
                  className="absolute left-0 top-0 flex flex-col gap-[18px] p-4"
                  style={{
                    width: carte.w,
                    height: carte.h,
                    opacity: ouvert ? 1 : 0,
                    transition: ouvert ? "opacity 0.5s ease 0.3s" : "opacity 0.2s ease",
                  }}
                >
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-[18px]">
                    <Image src={member.avatar} alt={member.name} fill sizes="(max-width: 639px) 100vw, 430px" className={cadrage(member)} />
                    <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    <span className="absolute bottom-3.5 left-5 z-[1] font-display text-[clamp(2.25rem,4vw,3rem)] font-medium tracking-[-0.03em] text-white">
                      <PrenomQuiSeLeve prenom={member.name} leve={ouvert} delai={0.35} />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col gap-2.5 px-1 pb-1">
                    <p className="text-sm text-muted-foreground">{lang === "en" ? member.roleEn : member.role}</p>
                    <p className="text-base leading-[1.45] tracking-[-0.01em] text-foreground sm:text-lg">
                      {t(`team.phrase.${member.id}` as Parameters<typeof t>[0])}
                    </p>
                    {portfolio ? (
                      <CTAButton as="a" href={member.portfolioUrl} target="_blank" rel="noopener noreferrer" className="mt-auto">
                        {t("teamCard.portfolio")}
                      </CTAButton>
                    ) : (
                      <span className="mt-auto self-start rounded-full border border-border px-5 py-3 text-sm text-muted-foreground">
                        {t("teamCard.soon")}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Prénom et rôle sous chaque rond, en rangée seulement. Au survol le
              prénom gris monte et cède la place au prénom qui se lève. */}
          {team.map((member, i) => {
            const e = etiquettes[i];
            const actif = choisi === null && i === survol;
            const style: CSSProperties = { left: e.l, top: e.t, width: e.w, opacity: choisi === null ? 1 : 0 };
            return (
              <div
                key={member.id}
                aria-hidden="true"
                onClick={() => choisir(i)}
                className={cn("absolute cursor-pointer text-center", choisi !== null && "pointer-events-none")}
                style={{
                  ...style,
                  // Sortie rapide au clic, retour après que les ronds ont repris leur place.
                  transition: !pret
                    ? "none"
                    : `left 0.8s ${COURBE}, top 0.8s ${COURBE}, ${choisi === null ? "opacity 0.4s ease 0.4s" : "opacity 0.15s ease"}`,
                }}
              >
                <div
                  className={cn(
                    // Fenêtre assez haute pour les jambages (le y de Gaby).
                    "relative h-[1.35em] w-full overflow-hidden font-medium leading-[1.2] tracking-[-0.02em]",
                    etroit ? "text-[13px]" : "text-[22px]",
                  )}
                >
                  <span
                    className="absolute left-1/2 top-0 whitespace-nowrap text-muted-foreground motion-reduce:!transition-none"
                    style={{
                      transform: actif ? "translate(-50%, -110%)" : "translate(-50%, 0)",
                      transition: `transform 0.7s ${COURBE}`,
                      display: etroit ? "none" : undefined,
                    }}
                  >
                    {member.name}
                  </span>
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 whitespace-nowrap text-foreground">
                    <PrenomQuiSeLeve prenom={member.name} leve={actif || etroit} />
                  </span>
                </div>
                {!etroit && (
                  <p className="-mt-0.5 min-h-[2.7em] pt-2 text-[13px] leading-[1.35] text-muted-foreground">{lang === "en" ? member.roleEn : member.role}</p>
                )}
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
