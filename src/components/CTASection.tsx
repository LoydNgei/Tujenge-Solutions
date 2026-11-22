import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useSettings } from "../lib/cms/content";

export function CTASection() {
  const { cta } = useSettings();

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-6 py-16 md:flex-row md:items-center md:py-20">
        <div className="max-w-2xl">
          <h2 className="font-heading text-3xl font-extrabold md:text-5xl">{cta.title}</h2>
          <p className="mt-3 text-lg text-primary-foreground/80">{cta.subtitle}</p>
        </div>
        <Link
          to="/contact"
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-deep px-7 py-4 text-base font-bold text-deep-foreground transition-colors hover:bg-deep/90"
        >
          {cta.buttonLabel}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
