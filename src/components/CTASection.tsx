import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-3xl border border-gold/20 bg-gradient-to-br from-gold-dark/10 via-surface to-surface-light p-12 text-center md:p-20"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,oklch(0.78_0.12_85/0.08),transparent_70%)]" />
        <div className="relative">
          <h2 className="font-heading text-3xl font-bold md:text-5xl">
            Ready to <span className="text-gradient-gold">transform</span> your business?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted-foreground">
            Let's discuss your project and build something extraordinary together. From concept to launch, we've got you covered.
          </p>
          <Link
            to="/contact"
            className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-gold px-10 py-4 font-heading text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Let's talk
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
