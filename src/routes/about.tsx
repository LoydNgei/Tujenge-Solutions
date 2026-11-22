import { createFileRoute } from "@tanstack/react-router";
import { CTASection } from "../components/CTASection";
import { Headline, RichText } from "../components/Headline";
import { TeamSection } from "../components/TeamSection";
import { useSettings } from "../lib/cms/content";
import { getIcon } from "../lib/cms/icons";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Tujenge Solutions" },
      { name: "description", content: "Tujenge Solutions is a Nairobi-based digital studio helping SMEs and businesses across Kenya build and scale with technology." },
      { property: "og:title", content: "About — Tujenge Solutions" },
      { property: "og:description", content: "Meet the team behind Tujenge Solutions." },
    ],
  }),
});

function AboutPage() {
  const { about } = useSettings();

  return (
    <>
      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <div
            className="max-w-3xl"
          >
            <p className="mb-3 text-sm font-semibold text-gold">{about.eyebrow}</p>
            <h1 className="font-heading text-4xl font-extrabold text-foreground md:text-6xl">
              <Headline {...about} breaks />
            </h1>
            {about.paragraphs.map((paragraph, i) => (
              <p key={i} className={`${i === 0 ? "mt-6" : "mt-4"} text-lg leading-relaxed text-muted-foreground`}>
                <RichText text={paragraph} />
              </p>
            ))}
          </div>

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {about.pillars.map((item, i) => {
              const Icon = getIcon(item.icon);
              return (
                <div
                  key={i}
                  className="rounded-xl border border-border/60 bg-card p-8"
                >
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="mb-2 font-heading text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                </div>
              );
            })}
          </div>

          {/* Team Section */}
          <TeamSection />
        </div>
      </section>

      <CTASection />
    </>
  );
}
