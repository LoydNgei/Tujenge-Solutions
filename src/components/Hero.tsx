import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroImage from "../assets/hero-tech.jpg";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden pt-16">
      {/* Subtle grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-gold) 1px, transparent 1px), linear-gradient(90deg, var(--color-gold) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 md:grid-cols-2 md:gap-16">
        {/* Left — Text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
            We build digital
            <br />
            <span className="text-gradient-gold">products that scale</span>
            <br />
            your business
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            From stunning websites to AI-powered automation systems — we help
            businesses across Kenya grow revenue and operate smarter.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-gold px-8 py-4 font-heading text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
            >
              Start a project
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded-xl border border-border px-8 py-4 font-heading text-sm font-semibold text-foreground transition-all hover:border-gold/50 hover:text-gold"
            >
              Our services
            </Link>
          </div>
        </motion.div>

        {/* Right — Hero visual */}
        <motion.div
          initial={{ opacity: 0, x: 40, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-gold/10">
            <img
              src={heroImage}
              alt="N5 Labs digital technology"
              width={1024}
              height={1024}
              className="h-full w-full object-cover"
            />
            {/* Gold overlay glow */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          </div>
          {/* Floating accent */}
          <div className="pointer-events-none absolute -bottom-6 -right-6 h-48 w-48 rounded-full bg-gold/10 blur-[80px]" />
          <div className="pointer-events-none absolute -left-8 -top-8 h-32 w-32 rounded-full bg-gold/5 blur-[60px]" />
        </motion.div>
      </div>
    </section>
  );
}
