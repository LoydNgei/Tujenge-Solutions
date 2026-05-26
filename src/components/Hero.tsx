import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import heroBg from "../assets/hero-bg.png";

export function Hero() {
  return (
    <section className="relative flex min-h-[95vh] items-center overflow-hidden pt-20">
      {/* Background image - Hidden on mobile, seamless transition on desktop */}
      <div className="absolute inset-0 z-0 bg-surface/50 md:bg-transparent">
        <div className="absolute inset-0 md:left-1/3 md:right-0">
          <img
            src={heroBg}
            alt=""
            className="hidden h-full w-full object-cover object-center md:block"
            style={{
              maskImage: "linear-gradient(to right, transparent, black 25%)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 25%)",
            }}
          />
        </div>
        {/* Soft background glow and gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent" />
        <div className="absolute inset-y-0 left-0 w-full md:w-1/2 md:backdrop-blur-[1px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:pl-16 lg:pl-24">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-heading text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl lg:text-6xl">
              We build digital
              <br />
              <span className="text-gradient-gold">solutions that grow</span>
              <br />
              your business
            </h1>

            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">
              From powerful web platforms to seamless payment systems — we partner
              with businesses to build technology that actually works.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 rounded-xl bg-gradient-gold px-8 py-4 font-heading text-sm font-semibold text-primary-foreground shadow-warm-lg transition-all hover:opacity-90 hover:shadow-warm"
              >
                Start a project
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 rounded-xl border border-border/70 bg-card px-8 py-4 font-heading text-sm font-semibold text-foreground shadow-warm transition-all hover:border-gold/40 hover:text-gold"
              >
                View our work
              </Link>
            </div>

            {/* Social proof strip */}
            <div className="mt-12 flex items-center gap-6 border-t border-border/50 pt-8">
              <div className="text-center">
                <p className="font-heading text-2xl font-bold text-foreground">2+</p>
                <p className="text-xs text-muted-foreground">Projects Delivered</p>
              </div>
              <div className="h-8 w-px bg-border/60" />
              <div className="text-center">
                <p className="font-heading text-2xl font-bold text-foreground">100%</p>
                <p className="text-xs text-muted-foreground">Client Satisfaction</p>
              </div>
              <div className="h-8 w-px bg-border/60" />
              <div className="text-center">
                <p className="font-heading text-2xl font-bold text-foreground">🇰🇪</p>
                <p className="text-xs text-muted-foreground">Kenya-Based</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
