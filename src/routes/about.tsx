import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Target, Eye, Users } from "lucide-react";
import { CTASection } from "../components/CTASection";
import { TeamSection } from "../components/TeamSection";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Tujenge Solutions" },
      { name: "description", content: "Tujenge Solutions is a Nairobi-based digital studio helping SMEs and businesses across Kenya build and scale with technology." },
      { property: "og:title", content: "About — Tujenge Solutions" },
      { property: "og:description", content: "Meet the team behind Tujenge Solutions." },
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
            <h1 className="font-heading text-4xl font-bold text-foreground md:text-6xl">
              Built for business,
              <br />
              <span className="text-gradient-gold">rooted in Kenya</span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Tujenge Solutions was born from a simple conviction: every Kenyan SME deserves access to world-class technology. We partner with businesses to design, build, and scale digital solutions that drive real, measurable growth — not just beautiful interfaces.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              "Tujenge" means <em className="text-foreground font-medium">let's build</em> in Swahili — and that's exactly what we do. One solution at a time, one business at a time.
            </p>
          </motion.div>

          <div className="mt-20 grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Target,
                title: "Our Mission",
                desc: "To empower Kenyan SMEs and businesses with digital solutions that drive measurable growth, operational efficiency, and competitive advantage.",
              },
              {
                icon: Eye,
                title: "Our Vision",
                desc: "To be the most trusted technology partner for ambitious businesses building the future of Kenya's economy.",
              },
              {
                icon: Users,
                title: "Our Approach",
                desc: "We listen first, build second. Every solution is deeply tailored to your specific business challenges, your market, and your growth goals.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="rounded-2xl border border-border/60 bg-card p-8 shadow-warm"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                  <item.icon className="h-6 w-6 text-gold" />
                </div>
                <h3 className="mb-2 font-heading text-lg font-bold text-foreground">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Team Section */}
          <TeamSection />
        </div>
      </section>

      <CTASection />
    </>
  );
}
