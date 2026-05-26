import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { services } from "../lib/services-data";
import serviceWeb from "../assets/service-web.jpg";
import serviceAi from "../assets/service-ai.jpg";
import serviceSeo from "../assets/service-seo.jpg";
import serviceSystems from "../assets/service-custom.jpg";
import ServiceSupport from "../assets/service-support.jpeg";
import ServiceDomain from "../assets/service-domain.jpg";

const bentoServices = services.slice(0, 4);

const imageMap: Record<string, string> = {
  "web-development": serviceWeb,
  "ai-automation": serviceAi,
  "seo-digital-marketing": serviceSeo,
  "custom-systems": serviceSystems,
  "maintenance-support": ServiceSupport,
  "domain-hosting": ServiceDomain
};

export function BentoGrid() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12 flex items-end justify-between"
      >
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">What We Do</p>
          <h2 className="font-heading text-3xl font-bold md:text-5xl">
            Solutions that <span className="text-gradient-gold">move the needle</span>
          </h2>
        </div>
        <Link
          to="/services"
          className="hidden items-center gap-2 text-sm font-medium text-gold transition-all hover:gap-3 md:inline-flex"
        >
          All services <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>

      {/* Horizontal scroll cards on mobile, staggered grid on desktop */}
      <div className="grid gap-5 md:grid-cols-2">
        {bentoServices.map((service, i) => {
          const Icon = service.icon;
          const bgImage = imageMap[service.slug];
          return (
            <motion.div
              key={service.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.6, ease: "easeOut" }}
            >
              <Link
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="group relative flex h-full min-h-[260px] overflow-hidden rounded-2xl border border-border/60 bg-card shadow-warm transition-all duration-300 hover:border-gold/30 hover:shadow-warm-lg"
              >
                <div className="relative flex flex-1 flex-col justify-between p-8">
                  <div>
                    <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-gold/10 backdrop-blur-sm">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <h3 className="mb-2 font-heading text-xl font-bold text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground line-clamp-2">
                      {service.tagline}
                    </p>
                  </div>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold transition-all group-hover:gap-3">
                    Explore <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
      </div>

      <Link
        to="/services"
        className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-gold transition-all hover:gap-3 md:hidden"
      >
        View all services <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
