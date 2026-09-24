import { PageHero } from "./page-hero";

interface LegalSection {
  heading: string;
  body: string[];
}

export function LegalPage({ title, path, updated, sections }: { title: string; path: string; updated: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero size="sm" image="/images/hero/legal-hero.jpg" imageAlt="" title={title} breadcrumbs={[{ name: title, href: path }]} />
      <article className="container-page max-w-3xl py-14 sm:py-20">
        <p className="text-sm text-muted-foreground">Last updated: {updated}</p>
        <div className="mt-8 space-y-10">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2 className="font-display text-2xl font-semibold">{s.heading}</h2>
              <div className="mt-3 space-y-3 leading-relaxed text-ink/80">
                {s.body.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
