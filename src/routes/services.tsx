import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { services } from "../lib/services-data";
import { CTASection } from "../components/CTASection";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — N5 Labs" },
      { name: "description", content: "Web development, AI automation, SEO marketing, and custom business systems built by N5 Labs in Kenya." },
      { property: "og:title", content: "Services — N5 Labs" },
      { property: "og:description", content: "Full-stack digital services for growing businesses." },
    ],
  }),
});

function ServicesPage() {
  return (
    <>
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">Our Services</p>
            <h1 className="font-heading text-4xl font-bold md:text-6xl">
              Everything you need to
              <br />
              <span className="text-gradient-gold">win online</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              End-to-end digital solutions designed for businesses that want to grow fast and operate lean.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="group block rounded-2xl border border-border/50 bg-surface p-8 transition-all duration-300 hover:border-gold/30"
                >
                  <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                    <Icon className="h-6 w-6 text-gold" />
                  </div>
                  <h3 className="mb-1 font-heading text-lg font-bold text-foreground">{service.title}</h3>
                  <p className="mb-1 text-sm font-medium text-gold">{service.tagline}</p>
                  <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
                  <ul className="mb-6 space-y-2">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span className="h-1 w-1 rounded-full bg-gold" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-all group-hover:gap-3">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      <CTASection />
    </>
  );
}
