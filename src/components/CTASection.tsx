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
        className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-border/50 bg-surface px-8 py-10 sm:flex-row sm:px-12"
      >
        <div>
          <h3 className="font-heading text-xl font-bold md:text-2xl">
            Have a project in mind?
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Let's chat — no pressure, just ideas.
          </p>
        </div>
        <Link
          to="/contact"
          className="group inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-gold px-8 py-3.5 font-heading text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
        >
          Get in touch
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  );
}
