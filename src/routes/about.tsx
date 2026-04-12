import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Users } from "lucide-react";
import { CTASection } from "../components/CTASection";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — N5 Labs" },
      { name: "description", content: "N5 Labs is a Nairobi-based digital studio helping businesses across Kenya scale with technology." },
      { property: "og:title", content: "About — N5 Labs" },
      { property: "og:description", content: "Meet the team behind N5 Labs." },
    ],
  }),
});

function AboutPage() {
  return (
    <>
      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">About Us</p>
            <h1 className="font-heading text-4xl font-bold md:text-6xl">
              A digital studio with
              <br />
              <span className="text-gradient-gold">African ambition</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              N5 Labs was born out of a simple belief: businesses in Kenya and across Africa deserve world-class digital products. We combine cutting-edge technology with deep local market understanding to build solutions that actually work.
            </p>
          </motion.div>

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "To empower businesses with technology that drives measurable growth and operational efficiency.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                desc: "To be the most trusted digital partner for ambitious businesses across East Africa.",
              },
              {
                icon: Users,
                title: "Our Approach",
                desc: "We listen first, then build. Every solution is tailored to your specific challenges, market, and goals.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="rounded-2xl border border-border/50 bg-surface p-8"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                  <item.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
