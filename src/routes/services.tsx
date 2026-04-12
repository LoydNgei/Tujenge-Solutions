import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Code, Zap, TrendingUp, Cog, Globe, Shield } from "lucide-react";
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

const allServices = [
  {
    icon: Code,
    title: "Web Development",
    description: "We craft modern, high-performance websites and web applications using the latest frameworks. Whether it's a sleek landing page or a full-stack SaaS platform, we build it to convert and scale.",
    features: ["React & Next-gen frameworks", "Mobile-first responsive design", "E-commerce platforms", "Progressive Web Apps"],
  },
  {
    icon: Zap,
    title: "AI Automation",
    description: "Streamline your operations with intelligent automation. We integrate AI into your workflows to eliminate manual processes, reduce errors, and free your team to focus on high-value work.",
    features: ["Workflow automation", "AI chatbots & assistants", "Data processing pipelines", "Smart notifications"],
  },
  {
    icon: TrendingUp,
    title: "SEO & Digital Marketing",
    description: "Get found. Get clicks. Get customers. Our data-driven marketing strategies combine SEO, social media, and paid advertising to drive real revenue growth.",
    features: ["Search engine optimization", "Social media campaigns", "Google & Meta ads", "Analytics & reporting"],
  },
  {
    icon: Cog,
    title: "Custom Systems",
    description: "Off-the-shelf software doesn't fit? We design and build bespoke systems tailored to your exact business needs — inventory, HR, logistics, you name it.",
    features: ["ERP & CRM systems", "Inventory management", "Booking platforms", "API integrations"],
  },
  {
    icon: Globe,
    title: "Domain & Hosting",
    description: "We handle your entire web infrastructure — domain registration, secure hosting, SSL, and ongoing maintenance so you never have to worry about uptime.",
    features: ["Cloud hosting setup", "Domain management", "SSL certificates", "99.9% uptime guarantee"],
  },
  {
    icon: Shield,
    title: "Maintenance & Support",
    description: "Your digital assets need ongoing care. We provide proactive monitoring, security updates, and technical support to keep everything running smoothly.",
    features: ["24/7 monitoring", "Security patches", "Performance optimization", "Priority support"],
  },
];

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
          {allServices.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group rounded-2xl border border-border/50 bg-surface p-8 transition-all duration-300 hover:border-gold/30"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                <service.icon className="h-6 w-6 text-gold" />
              </div>
              <h3 className="mb-3 font-heading text-lg font-bold text-foreground">{service.title}</h3>
              <p className="mb-6 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
              <ul className="space-y-2">
                {service.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-1 w-1 rounded-full bg-gold" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
