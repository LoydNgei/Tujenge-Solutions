import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Sparkles } from "lucide-react";
import founderPhoto from "../assets/founder-profile.png";

const founder = {
  name: "Loyd Ngei",
  role: "Founder & Operator",
  bio: "Full-stack developer and builder passionate about creating technology that makes a real difference for businesses. Every project is built with the same care and precision I'd want for my own business.",
  photo: founderPhoto,
  socials: {
    github: "https://github.com/LoydNgei",
    linkedin: "#",
    twitter: "#",
  },
};

export function TeamSection() {
  return (
    <section className="mt-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">
          The Team
        </p>
        <h2 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
          Small team, <span className="text-gradient-gold">big impact</span>
        </h2>
        <p className="mt-4 max-w-xl text-muted-foreground">
          Currently a lean solo operation — built on dedication, craft, and a genuine passion for helping businesses succeed. More hands are coming.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Founder card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl border border-gold/20 bg-card p-8 shadow-warm-lg"
        >
          <div className="relative mb-5 h-20 w-20">
            <img
              src={founder.photo}
              alt={founder.name}
              className="h-20 w-20 rounded-2xl object-cover shadow-warm"
            />
            {/* Online indicator */}
            <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-card">
              <span className="h-2 w-2 rounded-full bg-white" />
            </span>
          </div>

          <h3 className="font-heading text-xl font-bold text-foreground">{founder.name}</h3>
          <p className="mt-0.5 text-sm font-medium text-gold">{founder.role}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{founder.bio}</p>

          <div className="mt-5 flex gap-3">
            <a
              href={founder.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-all hover:border-gold/40 hover:text-gold"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              href={founder.socials.linkedin}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-all hover:border-gold/40 hover:text-gold"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              href={founder.socials.twitter}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-all hover:border-gold/40 hover:text-gold"
            >
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>

      {/* Hiring note */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mt-8 rounded-xl border border-gold/15 bg-gold/5 px-6 py-4 text-sm text-muted-foreground"
      >
        <span className="font-semibold text-gold">Growing the team! </span>
        If you're a skilled developer or designer passionate about building for Africa's business ecosystem,{" "}
        <a href="/contact" className="text-gold underline underline-offset-2 hover:opacity-80">
          let's talk
        </a>
        .
      </motion.div>
    </section>
  );
}
