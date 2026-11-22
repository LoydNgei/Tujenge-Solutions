import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Headline } from "./Headline";
import { useSettings } from "../lib/cms/content";

export function Hero() {
  const { hero } = useSettings();

  return (
    <section className="bg-background pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <h1 className="font-heading text-[2.75rem] font-extrabold text-foreground sm:text-6xl lg:text-7xl">
            <Headline before={hero.before} highlight={hero.highlight} after={hero.after} breaks />
          </h1>

          <p className="mt-6 max-w-xl text-lg text-muted-foreground md:text-xl">
            {hero.subtitle}
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-base font-bold text-primary-foreground transition-colors hover:bg-gold-light/85"
            >
              {hero.primaryCta}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-deep px-6 py-3 text-base font-bold text-deep transition-colors hover:bg-deep hover:text-deep-foreground"
            >
              {hero.secondaryCta}
            </Link>
          </div>

          {hero.stats.length > 0 && (
            <dl className="mt-12 flex max-w-xl divide-x divide-border border-y border-border">
              {hero.stats.map((stat, i) => (
                <div key={i} className="px-6 py-5 first:pl-0 sm:px-8">
                  <dt className="sr-only">{stat.label}</dt>
                  <dd className="font-heading text-3xl font-extrabold text-foreground md:text-4xl">{stat.value}</dd>
                  <dd className="mt-1 text-sm text-muted-foreground">{stat.label}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {hero.imageUrl && (
          <div className="lg:col-span-5">
            <img
              src={hero.imageUrl}
              alt=""
              className="aspect-[4/3] w-full rounded-xl object-cover object-center lg:aspect-[4/5]"
            />
          </div>
        )}
      </div>
    </section>
  );
}
