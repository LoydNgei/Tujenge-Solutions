import { motion } from "framer-motion";
import { ArrowRight, Phone, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-gold/20"
      >
        {/* Background pattern */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--color-gold) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-gold-dark/10 via-surface to-surface-light" />

        <div className="relative grid items-center gap-10 p-10 md:grid-cols-2 md:p-16">
          {/* Left */}
          <div>
            <h2 className="font-heading text-3xl font-bold md:text-5xl">
              Let's build something{" "}
              <span className="text-gradient-gold">extraordinary</span>
            </h2>
            <p className="mt-4 max-w-md text-muted-foreground">
              Got an idea? A problem that needs solving? Let's talk. We'll turn
              your vision into a digital product that drives real results.
            </p>
            <Link
              to="/contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-gold px-10 py-4 font-heading text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {/* Right — quick contact info */}
          <div className="space-y-6">
            <div className="flex items-start gap-4 rounded-xl border border-border/50 bg-background/50 p-5 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                <Phone className="h-5 w-5 text-gold" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Call us</p>
                <p className="text-sm text-muted-foreground">+254 700 000 000</p>
              </div>
            </div>
            <div className="flex items-start gap-4 rounded-xl border border-border/50 bg-background/50 p-5 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                <Mail className="h-5 w-5 text-gold" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Email us</p>
                <p className="text-sm text-muted-foreground">hello@n5labs.co.ke</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
