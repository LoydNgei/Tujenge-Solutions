import { motion } from "framer-motion";
import { MessageSquare, Search, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Discovery Call",
    description:
      "We start with a conversation. Tell us about your business, goals, and pain points. No jargon, just a real chat about where you want to go.",
  },
  {
    icon: Search,
    number: "02",
    title: "Research & Strategy",
    description:
      "We dig into your market, competitors, and audience. Then we craft a tailored strategy with clear milestones and deliverables.",
  },
  {
    icon: Code,
    number: "03",
    title: "Design & Build",
    description:
      "Our team gets to work: designing, coding, and testing. You get regular updates and previews so nothing catches you off guard.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch & Grow",
    description:
      "We launch your project and stick around. Ongoing support, performance monitoring, and optimizations to keep you growing.",
  },
];

export function ProcessSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
          Our Process
        </p>
        <h2 className="font-heading text-3xl font-bold md:text-5xl">
          How we <span className="text-gradient-gold">make it happen</span>
        </h2>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="group relative rounded-2xl border border-border/60 bg-card p-8 shadow-warm transition-all duration-300 hover:border-gold/30 hover:shadow-warm-lg"
            >
              {/* Step number */}
              <span className="absolute right-6 top-6 font-heading text-4xl font-bold text-gold/10 transition-colors group-hover:text-gold/20">
                {step.number}
              </span>

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                <Icon className="h-6 w-6 text-gold" />
              </div>

              <h3 className="mb-3 font-heading text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>

              {/* Connector line on desktop */}
              {i < steps.length - 1 && (
                <div className="pointer-events-none absolute right-0 top-1/2 hidden h-px w-6 translate-x-full bg-gradient-to-r from-gold/30 to-transparent lg:block" />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
