import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Headline } from "./Headline";
import { useServices, useSettings } from "../lib/cms/content";
import { getIcon } from "../lib/cms/icons";

export function BentoGrid() {
  const bentoServices = useServices().slice(0, 4);
  const { homeServices } = useSettings();

  return (
    <section className="bg-surface py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
          <div className="max-w-2xl">
            {homeServices.eyebrow && (
              <p className="mb-3 text-base font-bold text-gold">{homeServices.eyebrow}</p>
            )}
            <h2 className="font-heading text-4xl font-extrabold md:text-5xl">
              <Headline {...homeServices} />
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-base font-bold text-foreground transition-colors hover:text-gold"
          >
            All services <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {bentoServices.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <Link
                key={service.slug}
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="group flex h-full flex-col rounded-xl border border-border bg-card p-7 transition-colors hover:border-deep md:p-8"
              >
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Icon className="h-6 w-6" strokeWidth={2.25} />
                </div>
                <h3 className="font-heading text-2xl font-bold text-foreground">{service.title}</h3>
                <p className="mt-2 line-clamp-2 text-base text-muted-foreground">{service.tagline}</p>
                <span className="mt-auto inline-flex items-center gap-2 pt-6 text-base font-bold text-foreground">
                  Find out more
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
