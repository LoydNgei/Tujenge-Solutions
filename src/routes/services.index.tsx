import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { CTASection } from "../components/CTASection";
import { Headline } from "../components/Headline";
import { useServices, useSettings } from "../lib/cms/content";
import { getIcon } from "../lib/cms/icons";

export const Route = createFileRoute("/services/")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Tujenge Solutions" },
      { name: "description", content: "Web development, AI automation, SEO marketing, and custom business systems built by Tujenge Solutions in Kenya." },
      { property: "og:title", content: "Services — Tujenge Solutions" },
      { property: "og:description", content: "Full-stack digital services for growing businesses." },
    ],
  }),
});

function ServicesPage() {
  const services = useServices();
  const { servicesPage } = useSettings();

  return (
    <>
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div
          >
            <p className="mb-3 text-sm font-semibold text-gold">{servicesPage.eyebrow}</p>
            <h1 className="font-heading text-4xl font-extrabold md:text-6xl">
              <Headline {...servicesPage} breaks />
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              {servicesPage.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = getIcon(service.icon);
            const bgImage = service.imageUrl;
            return (
              <div
                key={service.slug}
              >
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="group relative flex h-full overflow-hidden flex-col rounded-xl border border-border bg-card transition-colors hover:border-deep"
                >
                  {bgImage && (
                    <div className="aspect-[16/9] overflow-hidden border-b border-border">
                      <img src={bgImage} alt="" loading="lazy" className="h-full w-full object-cover object-center" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-7">
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Icon className="h-5 w-5" strokeWidth={2.25} />
                    </div>
                    <h3 className="mb-1 font-heading text-2xl font-bold text-foreground">{service.title}</h3>
                    <p className="mb-2 text-base font-semibold text-foreground">{service.tagline}</p>
                    <p className="mb-6 text-base text-muted-foreground line-clamp-2">{service.description}</p>
                    <span className="mt-auto inline-flex items-center gap-2 text-base font-bold text-foreground">
                      Find out more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      <CTASection />
    </>
  );
}
