"use client";

import { Container } from "@/components/ui/Container";
import { site } from "@/data/site";
import type { LegalField, LegalPageData } from "@/data/legal";
import { useLang } from "@/contexts/LanguageContext";

const dynamicValue: Record<NonNullable<LegalField["dynamic"]>, string> = {
  denomination: site.name,
  address: site.contact.address,
  email: site.contact.email,
};

function Field({ field, isEn }: { field: LegalField; isEn: boolean }) {
  const label = isEn ? field.labelEn : field.label;
  const value = field.dynamic
    ? dynamicValue[field.dynamic]
    : isEn
      ? field.valueEn
      : field.value;

  return (
    <p>
      <span className="text-foreground/60">{label} : </span>
      <span>{value}</span>
    </p>
  );
}

export function LegalPage({ page }: { page: LegalPageData }) {
  const { lang } = useLang();
  const isEn = lang === "en";

  return (
    <main className="min-h-screen bg-background pb-20 pt-32 text-foreground whitespace-pre-line sm:pb-28 sm:pt-36">
      <Container size="tight">
        <h1 className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-medium tracking-[-0.02em]">
          {isEn ? page.titleEn : page.title}
        </h1>

        {page.sections.map((section) => {
          const paragraphs = isEn ? section.paragraphsEn : section.paragraphs;
          const contactIntro = isEn ? section.contactIntroEn : section.contactIntro;

          return (
            <section
              key={section.heading}
              id={section.id}
              className="mt-10 space-y-2 text-sm leading-relaxed text-muted-foreground sm:text-base"
            >
              <h2 className="font-display text-lg font-medium text-foreground">
                {isEn ? section.headingEn : section.heading}
              </h2>

              {paragraphs?.map((p) => <p key={p}>{p}</p>)}

              {section.fields?.map((f) => (
                <Field key={f.label} field={f} isEn={isEn} />
              ))}

              {contactIntro && (
                <p>
                  {contactIntro}{" "}
                  <a
                    href={`mailto:${site.contact.email}`}
                    className="text-foreground underline-offset-4 hover:underline"
                  >
                    {site.contact.email}
                  </a>
                  .
                </p>
              )}
            </section>
          );
        })}
      </Container>
    </main>
  );
}
