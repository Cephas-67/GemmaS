"use client";

import { motion } from "framer-motion";
import { useLang } from "@/contexts/LanguageContext";

// Section "Human brilliance" · cap final juste avant le footer.
// Pattern inspiré du Manifesto : un seul bloc centré, sobre, sans grille
// ni CTA ni body redondant. Tout est dans le statement, le sous-titre
// court qui le tranche, et la citation qui ferme. C'est la dernière voix
// de la page · elle doit frapper, pas remplir.
const ease = [0.16, 1, 0.3, 1] as const;

export function HumanBrilliance() {
  const { t } = useLang();

  return (
    <section
      id="brilliance"
      className="relative overflow-hidden bg-[#050505] text-white"
    >
      {/* Halo radial discret en bas-centre · donne du relief sans décor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(79,103,158,0.22),transparent_60%)]"
      />

      <div className="relative mx-auto flex max-w-[60rem] flex-col items-center px-5 py-20 text-center sm:px-6 sm:py-24 md:py-28">
        {/* Eyebrow discret */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease }}
          className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/40"
        >
          {t("brilliance.eyebrow")}
        </motion.p>

        {/* Headline · le statement central */}
        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.05, ease }}
          className="mt-6 font-display font-normal tracking-[-0.025em] text-white text-[clamp(2rem,5vw,3.75rem)] leading-[1.08]"
        >
          {t("brilliance.title")}
        </motion.h2>

        {/* Sous-titre court qui tranche · IA outil, humain vedette */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.15, ease }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/65 sm:text-lg"
        >
          {t("brilliance.subtitle")}
        </motion.p>

        {/* Citation · ferme la voix, glissement vers l'aphorisme universel */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.25, ease }}
          className="mt-10 max-w-xl font-display italic text-white/75 text-[15px] sm:text-base"
        >
          « {t("brilliance.quote")} »
        </motion.p>
      </div>
    </section>
  );
}
