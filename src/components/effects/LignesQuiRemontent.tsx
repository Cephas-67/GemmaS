"use client";

import { useEffect, useRef, type HTMLAttributes, type Ref } from "react";

type Balise = "h1" | "h2" | "h3" | "p" | "span";

type Props = {
  texte: string;
  /** La balise rendue : un titre, un paragraphe, un span. */
  as?: Balise;
  className?: string;
  /** Retard du bloc entier, en secondes, pour enchaîner plusieurs blocs. */
  delai?: number;
};

// Réglages de l'effet : une ligne se pose en une seconde, chacune un dixième
// après la précédente, sur une courbe qui ralentit fort à l'arrivée.
const DUREE = 1;
const DECALAGE = 0.1;
const COURBE = "cubic-bezier(0.16, 1, 0.3, 1)";
// Le bloc part quand son sommet passe aux trois quarts de l'écran.
const REPERE = 0.75;

/**
 * Coupe le texte en lignes telles que le navigateur les compose : on pose les
 * mots, on relève leur hauteur pour savoir où il a coupé, puis chaque ligne va
 * dans un masque. Elle dépend de la largeur réelle, donc se refait au
 * redimensionnement et quand la police arrive. On ne coupe que sur les espaces
 * ordinaires : une espace insécable tient deux mots ensemble, comme pour le
 * navigateur.
 */
function decouper(bloc: HTMLElement, texte: string, delai: number) {
  const mots = texte.split(/[ \t\n\r]+/).filter(Boolean).map((mot) => {
    const span = document.createElement("span");
    span.textContent = mot;
    return span;
  });
  bloc.replaceChildren(...mots.flatMap((mot, i) => (i ? [document.createTextNode(" "), mot] : [mot])));

  const lignes: string[][] = [];
  let sommet = Number.NaN;
  for (const mot of mots) {
    // Deux pixels de tolérance : accents et jambages bougent le sommet d'une
    // même ligne de quelques dixièmes.
    if (Number.isNaN(sommet) || Math.abs(mot.offsetTop - sommet) > 2) {
      lignes.push([]);
      sommet = mot.offsetTop;
    }
    lignes[lignes.length - 1].push(mot.textContent ?? "");
  }

  const poses = lignes.map((groupe, rang) => {
    const masque = document.createElement("span");
    // Un peu de marge sous la ligne, rendue aussitôt : sans elle le masque
    // couperait les jambages (g, p, ç).
    masque.style.cssText = "display:block;overflow:hidden;padding-bottom:0.12em;margin-bottom:-0.12em";
    const ligne = document.createElement("span");
    ligne.style.cssText = `display:block;transform:translateY(105%);transition:transform ${DUREE}s ${COURBE} ${delai + rang * DECALAGE}s`;
    // Une espace en fin de ligne : invisible, mais le texte copié ou lu à voix
    // haute ne soude pas les deux mots de la coupure.
    ligne.textContent = groupe.join(" ") + (rang < lignes.length - 1 ? " " : "");
    masque.append(ligne);
    return masque;
  });
  bloc.replaceChildren(...poses);
  return poses.map((masque) => masque.firstElementChild as HTMLElement);
}

/**
 * Un bloc de texte dont les lignes remontent de sous leur masque, l'une après
 * l'autre, quand il entre dans l'écran. On remonte au-dessus et qu'il sort par
 * le bas, il se range ; on redescend, il se rejoue.
 *
 * Le texte est rendu tel quel côté serveur : sans script, ou avec le mouvement
 * réduit, il reste simplement lisible.
 */
export default function LignesQuiRemontent({ texte, as = "span", className, delai = 0 }: Props) {
  const bloc = useRef<HTMLElement>(null);
  const Element = as as unknown as (props: HTMLAttributes<HTMLElement> & { ref?: Ref<HTMLElement> }) => React.ReactNode;

  useEffect(() => {
    const element = bloc.current;
    if (!element) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let lignes: HTMLElement[] = [];
    let pose = false;

    const placer = (enPlace: boolean, anime: boolean) => {
      pose = enPlace;
      for (const ligne of lignes) {
        if (!anime) ligne.style.transitionProperty = "none";
        ligne.style.transform = enPlace ? "translateY(0)" : "translateY(105%)";
      }
      if (!anime) {
        void element.offsetHeight;
        for (const ligne of lignes) ligne.style.transitionProperty = "";
      }
    };

    const preparer = () => {
      lignes = decouper(element, texte, delai);
      // Déjà passé au chargement (page rouverte plus bas) : posé d'emblée.
      const haut = element.getBoundingClientRect().top;
      placer(pose || haut < innerHeight * REPERE, false);
    };
    preparer();

    const depart = new IntersectionObserver(
      ([entree]) => {
        if (entree.isIntersecting && !pose) placer(true, true);
      },
      { rootMargin: `0px 0px -${Math.round((1 - REPERE) * 100)}% 0px` },
    );
    // Le bloc ne se range qu'une fois sorti de l'écran par le bas, jamais sous
    // les yeux.
    const sortie = new IntersectionObserver(([entree]) => {
      if (!entree.isIntersecting && entree.boundingClientRect.top > 0 && pose) placer(false, false);
    });
    depart.observe(element);
    sortie.observe(element);

    let attente = 0;
    const auRedimensionnement = () => {
      clearTimeout(attente);
      attente = window.setTimeout(preparer, 150);
    };
    window.addEventListener("resize", auRedimensionnement);
    document.fonts?.ready.then(preparer);

    return () => {
      depart.disconnect();
      sortie.disconnect();
      clearTimeout(attente);
      window.removeEventListener("resize", auRedimensionnement);
      element.replaceChildren(document.createTextNode(texte));
    };
  }, [texte, delai]);

  // La clé suit le texte : à un changement de langue, React repart d'un élément
  // neuf au lieu de réécrire un nœud que le découpage a remplacé.
  return (
    <Element key={texte} ref={bloc} className={className}>
      {texte}
    </Element>
  );
}
