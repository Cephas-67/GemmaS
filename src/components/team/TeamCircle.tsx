// Reproduction fidèle du rond Figma : anneau très translucide, sans contenu.
// Reste un composant purement visuel — c'est le wrapper motion.button dans
// TeamSection qui porte le layoutId et gère l'expansion en carte.
export function TeamCircle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <circle cx="50" cy="50" r="50" fill="white" fillOpacity="0.05" />
      <circle cx="50" cy="50" r="49" stroke="white" strokeOpacity="0.2" strokeWidth="2" />
    </svg>
  );
}
