import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { services } from "../lib/services-data";
import { CTASection } from "../components/CTASection";

export const Route = createFileRoute("/services/$slug")({
  component: ServiceDetailPage,
  head: ({ params }) => {
    const service = services.find((s) => s.slug === params.slug);
    const title = service ? `${service.title} — N5 Labs` : "Service — N5 Labs";
    const desc = service?.description ?? "Digital services by N5 Labs.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold">Service not found</h1>
        <p className="mt-4 text-muted-foreground">This service page doesn't exist.</p>
        <Link to="/services" className="mt-6 inline-flex items-center gap-2 text-gold hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to services
        </Link>
      </div>
    </div>
  ),
});

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    throw notFound();
  }

  const currentIndex = services.findIndex((s) => s.slug === slug);
  const nextService = services[(currentIndex + 1) % services.length];
  const prevService = services[(currentIndex - 1 + services.length) % services.length];
  const Icon = service.icon;

  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/services"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" /> All Services
            </Link>

            <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gold/10">
              <Icon className="h-8 w-8 text-gold" />
            </div>

            <h1 className="font-heading text-4xl font-bold md:text-6xl">
              {service.title}
            </h1>
            <p className="mt-2 text-lg font-medium text-gold">{service.tagline}</p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {service.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features grid */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {service.features.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex items-center gap-3 rounded-xl border border-border/50 bg-surface p-5"
            >
              <CheckCircle className="h-5 w-5 shrink-0 text-gold" />
              <span className="text-sm font-medium text-foreground">{feature}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Detailed sections */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="space-y-12">
          {service.details.map((detail, i) => (
            <motion.div
              key={detail.heading}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="grid gap-8 md:grid-cols-2 md:items-center"
            >
              <div className={i % 2 !== 0 ? "md:order-2" : ""}>
                <h2 className="font-heading text-2xl font-bold md:text-3xl">
                  {detail.heading}
                </h2>
                <p className="mt-4 leading-relaxed text-muted-foreground">
                  {detail.text}
                </p>
              </div>
              <div className={`h-48 rounded-2xl bg-gradient-to-br from-gold-dark/10 to-surface border border-border/50 ${i % 2 !== 0 ? "md:order-1" : ""}`} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Navigation between services */}
      <section className="border-t border-border/50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex items-center justify-between">
            <Link
              to="/services/$slug"
              params={{ slug: prevService.slug }}
              className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Previous</p>
                <p className="font-heading font-semibold">{prevService.title}</p>
              </div>
            </Link>
            <Link
              to="/services/$slug"
              params={{ slug: nextService.slug }}
              className="group flex items-center gap-3 text-right text-muted-foreground transition-colors hover:text-foreground"
            >
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Next</p>
                <p className="font-heading font-semibold">{nextService.title}</p>
              </div>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
