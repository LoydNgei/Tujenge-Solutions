import { motion } from "framer-motion";
import { Code, Zap, TrendingUp, Cog, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Modern, fast websites and web apps built with cutting-edge technology. From landing pages to complex platforms.",
    span: "md:col-span-2 md:row-span-1",
    accent: true,
  },
  {
    icon: Zap,
    title: "AI Automation",
    description: "Automate repetitive tasks with intelligent workflows. Let AI handle the grunt work while you focus on growth.",
    span: "md:col-span-1 md:row-span-2",
    accent: false,
  },
  {
    icon: TrendingUp,
    title: "SEO & Digital Marketing",
    description: "Data-driven campaigns that put your business in front of the right audience. Social media, SEO, and performance marketing.",
    span: "md:col-span-1 md:row-span-1",
    accent: false,
  },
  {
    icon: Cog,
    title: "Custom Systems",
    description: "Bespoke software solutions tailored to your unique business challenges. ERP, CRM, inventory — whatever you need.",
    span: "md:col-span-1 md:row-span-1",
    accent: false,
  },
];

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
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={cardVariants}
            className={`group relative overflow-hidden rounded-2xl border border-border/50 p-8 transition-all duration-300 hover:border-gold/30 ${service.span} ${
              service.accent
                ? "bg-gradient-to-br from-gold-dark/10 to-surface"
                : "bg-surface"
            }`}
          >
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
              <service.icon className="h-6 w-6 text-gold" />
            </div>
            <h3 className="mb-3 font-heading text-xl font-bold text-foreground">
              {service.title}
            </h3>
            <p className="mb-6 text-sm leading-relaxed text-muted-foreground">
              {service.description}
            </p>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-all group-hover:gap-3"
            >
              Learn more <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
