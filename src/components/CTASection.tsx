import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative overflow-hidden flex flex-col items-center justify-between gap-6 rounded-2xl border border-gold/20 bg-gradient-to-br from-gold-dark/8 via-surface to-surface px-8 py-12 sm:flex-row sm:px-12 shadow-warm-lg"
      >
        {/* Background glow */}
        <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-gold/10 blur-[60px]" />
        <div>
          <h3 className="font-heading text-xl font-bold text-foreground md:text-2xl">
            Ready to build something great?
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Let's discuss your business challenges, no pressure, just solutions.
          </p>
        </div>
        <Link
          to="/contact"
          className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-gold px-8 py-3.5 font-heading text-sm font-semibold text-primary-foreground shadow-warm-lg transition-all hover:opacity-90"
        >
          Get in touch
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  );
}
