"use client";

import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { CTAButton } from "@/components/ui/CTAButton";
import { cn } from "@/lib/utils";
import { useLang } from "@/contexts/LanguageContext";

// Specs des sources (valeurs stables, labels résolus via t()).
const SOURCE_SPECS = [
  { value: "linkedin", labelKey: "contact.src.linkedin" },
  { value: "google", labelKey: "contact.src.google" },
  { value: "recommandation", labelKey: "contact.src.reco" },
  { value: "evenement", labelKey: "contact.src.event" },
  { value: "autre", labelKey: "contact.src.other" },
] as const;

// Contact · section "Get in touch" plein écran centré, fond très sombre,
// gros titre, sous-titre court, puis form compact en dessous (centré, max 640px).
// Pattern de référence · un seul CTA fort, ambiance presque conversationnelle.
export function Contact() {
  const { t } = useLang();
  const [sending, setSending] = useState(false);

  // Schéma Zod recalculé quand la langue change, pour que les messages
  // d'erreur basculent eux aussi (sinon Zod garde la première version).
  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(2, t("contact.err.short")),
        email: z.string().email(t("contact.err.email")),
        org: z.string().optional(),
        source: z.enum(["linkedin", "google", "recommandation", "evenement", "autre"]).optional(),
        message: z.string().min(20, t("contact.err.msg")),
      }),
    [t],
  );
  type FormValues = z.infer<typeof schema>;

  const sources = SOURCE_SPECS.map((s) => ({ value: s.value, label: t(s.labelKey as never) }));

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onBlur",
  });

  const onSubmit = async (values: FormValues) => {
    setSending(true);
    await new Promise((r) => setTimeout(r, 900));
    setSending(false);
    reset();
    toast.success(t("contact.success"), {
      description: `${t("contact.thanks")} ${values.name.split(" ")[0]}.`,
    });
  };

  const source = watch("source");

  return (
    <section
      id="contact"
      className="relative bg-[#050505] text-white overflow-hidden"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-24 sm:py-32 lg:py-40 text-center">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/50"
        >
          {t("contact.eyebrow")}
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 font-display font-bold tracking-tight text-white text-[clamp(2.5rem,7vw,5.5rem)] leading-[1.02]"
        >
          {t("contact.title")}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-lg text-white/65 leading-relaxed max-w-xl mx-auto"
        >
          {t("contact.intro")}
        </motion.p>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="mt-12 sm:mt-14 text-left space-y-5"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <DarkField label={t("contact.field.name")} error={errors.name?.message} htmlFor="name" optionalLabel={t("contact.field.optional")}>
              <input
                id="name"
                type="text"
                autoComplete="name"
                placeholder={t("contact.field.namePh")}
                {...register("name")}
                className="dark-field"
              />
            </DarkField>
            <DarkField label={t("contact.field.email")} error={errors.email?.message} htmlFor="email" optionalLabel={t("contact.field.optional")}>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder={t("contact.field.emailPh")}
                {...register("email")}
                className="dark-field"
              />
            </DarkField>
          </div>

          <DarkField label={t("contact.field.org")} htmlFor="org" optional optionalLabel={t("contact.field.optional")}>
            <input
              id="org"
              type="text"
              placeholder={t("contact.field.orgPh")}
              {...register("org")}
              className="dark-field"
            />
          </DarkField>

          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-white/45 mb-3">
              {t("contact.field.source")}
            </p>
            <div className="flex flex-wrap gap-2">
              {sources.map((s) => {
                const active = source === s.value;
                return (
                  <button
                    key={s.value}
                    type="button"
                    onClick={() => setValue("source", s.value, { shouldValidate: true })}
                    className={cn(
                      "rounded-md px-3 py-1.5 text-xs font-medium transition-colors ring-1",
                      active
                        ? "bg-white text-black ring-white"
                        : "ring-white/15 text-white/70 hover:ring-white/30 hover:text-white",
                    )}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          <DarkField label={t("contact.field.message")} error={errors.message?.message} htmlFor="message" optionalLabel={t("contact.field.optional")}>
            <textarea
              id="message"
              rows={5}
              placeholder={t("contact.field.messagePh")}
              {...register("message")}
              className="dark-field resize-none"
            />
          </DarkField>

          <div className="pt-4 flex justify-center">
            <CTAButton as="button" type="submit" disabled={sending} className="!bg-white !text-black">
              {sending ? t("contact.submitting") : t("contact.submit")}
            </CTAButton>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

function DarkField({
  label,
  htmlFor,
  error,
  optional,
  optionalLabel,
  children,
}: {
  label: string;
  htmlFor: string;
  error?: string;
  optional?: boolean;
  optionalLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={htmlFor} className="flex items-baseline justify-between mb-2">
        <span className="text-[11px] uppercase tracking-[0.18em] text-white/45">{label}</span>
        {optional && optionalLabel && <span className="text-[10px] text-white/35">{optionalLabel}</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-red-400/90">
          {error}
        </p>
      )}
    </div>
  );
}