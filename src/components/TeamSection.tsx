import { motion } from "framer-motion";
import { Github, Linkedin, Twitter } from "lucide-react";
import founderPhoto from "../assets/founder-profile.png";
import powellPhoto from "../assets/powell-profile.png";

const team = [
  {
    name: "Loyd Ngei",
    role: "Co-Founder & Operator",
    bio: "Full-stack developer and builder passionate about creating technology that makes a real difference for businesses. Every project is built with the same care and precision I'd want for my own business.",
    photo: founderPhoto,
    socials: {
      github: "https://github.com/LoydNgei",
      linkedin: "#",
      twitter: "#",
    },
  },
  {
    name: "Powell Habwe",
    role: "Co-Founder & Software Engineer",
    bio: "Software engineer with 3+ years building robust, scalable systems. Proficient in Go, Python, Java, React and TypeScript, with a strong background in backend development, cloud infrastructure (GCP, AWS), and network security (CCNA, CISSP).",
    photo: powellPhoto,
    socials: {
      github: "https://github.com/PowellHabwe",
      linkedin: "https://www.linkedin.com/in/powell-habwe-558b36230/",
      twitter: "#",
    },
  },
];

export function TeamSection() {
  return (
    <section className="mt-24" id="team">
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
          Two builders united by a shared conviction: that Kenyan businesses deserve world-class technology. Built on dedication, craft, and a genuine passion for results.
        </p>
      </motion.div>

      {/* Team grid — equal columns, no dead space */}
      <div className="grid gap-6 sm:grid-cols-2">
        {team.map((member, i) => (
          <motion.div
            key={member.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="rounded-2xl border border-gold/20 bg-card p-8 shadow-warm-lg"
          >
            <div className="relative mb-5 h-20 w-20">
              <img
                src={member.photo}
                alt={member.name}
                className="h-20 w-20 rounded-2xl object-cover shadow-warm"
              />
              {/* Online indicator */}
              <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-card">
                <span className="h-2 w-2 rounded-full bg-white" />
              </span>
            </div>

            <h3 className="font-heading text-xl font-bold text-foreground">{member.name}</h3>
            <p className="mt-0.5 text-sm font-medium text-gold">{member.role}</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>

            <div className="mt-5 flex gap-3">
              <a
                href={member.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-all hover:border-gold/40 hover:text-gold"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={member.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-all hover:border-gold/40 hover:text-gold"
              >
                <Linkedin className="h-4 w-4" />
              </a>
              <a
                href={member.socials.twitter}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-all hover:border-gold/40 hover:text-gold"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
