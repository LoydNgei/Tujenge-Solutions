import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { services } from "../lib/services-data";
import serviceWeb from "../assets/service-web.jpg";
import serviceAi from "../assets/service-ai.jpg";
import serviceSeo from "../assets/service-seo.jpg";
import serviceSystems from "../assets/service-systems.jpg";

const bentoServices = services.slice(0, 4);

const imageMap: Record<string, string> = {
  "web-development": serviceWeb,
  "ai-automation": serviceAi,
  "seo-digital-marketing": serviceSeo,
  "custom-systems": serviceSystems,
};

const spanMap: Record<number, string> = {
  0: "md:col-span-2 md:row-span-1",
  1: "md:col-span-1 md:row-span-2",
  2: "md:col-span-1 md:row-span-1",
  3: "md:col-span-1 md:row-span-1",
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
  }),
};

export function BentoGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">What We Do</p>
        <h2 className="font-heading text-3xl font-bold md:text-5xl">
          Solutions that <span className="text-gradient-gold">move the needle</span>
        </h2>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3 md:grid-rows-2">
        {bentoServices.map((service, i) => {
          const Icon = service.icon;
          const bgImage = imageMap[service.slug];
          return (
            <motion.div
              key={service.slug}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={cardVariants}
              className={`group relative overflow-hidden rounded-2xl border border-border/50 transition-all duration-300 hover:border-gold/30 ${spanMap[i] ?? ""}`}
            >
              {/* Background image */}
              {bgImage && (
                <div className="absolute inset-0">
                  <img
                    src={bgImage}
                    alt=""
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover opacity-30 transition-opacity duration-500 group-hover:opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
                </div>
              )}

              <div className="relative p-8">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10 backdrop-blur-sm">
                  <Icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mb-3 font-heading text-xl font-bold text-foreground">
                  {service.title}
                </h3>
                <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <Link
                  to="/services/$slug"
                  params={{ slug: service.slug }}
                  className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-all group-hover:gap-3"
                >
                  Learn more <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
