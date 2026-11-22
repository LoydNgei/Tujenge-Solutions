import { Headline } from "./Headline";
import { useSettings } from "../lib/cms/content";

export function ProcessSection() {
  const { process } = useSettings();
  const steps = process.steps;

  return (
    <section className="bg-deep py-20 text-deep-foreground md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-12 max-w-2xl md:mb-16">
          {process.eyebrow && (
            <p className="mb-3 text-base font-bold text-gold-light">{process.eyebrow}</p>
          )}
          <h2 className="font-heading text-4xl font-extrabold text-white md:text-5xl">
            <Headline {...process} />
          </h2>
        </div>

        <ol className="grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {steps.map((step, i) => (
            <li key={i} className="border-t-2 border-white/15 pt-6">
              <span className="font-heading text-5xl font-extrabold leading-none text-gold-light">
                {i + 1}
              </span>
              <h3 className="mt-5 font-heading text-xl font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-base text-white/70">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
