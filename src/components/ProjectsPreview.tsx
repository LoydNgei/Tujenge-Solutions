import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { projects } from "../lib/projects-data";

const featured = projects.slice(0, 3);

const categoryColors: Record<string, string> = {
  "Platform Development": "from-emerald-500/80 to-teal-700/90",
  "Web Application": "from-blue-500/80 to-indigo-700/90",
};

export function ProjectsPreview() {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 flex items-end justify-between"
      >
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">Our Work</p>
          <h2 className="font-heading text-3xl font-bold text-foreground md:text-5xl">
            Featured <span className="text-gradient-gold">projects</span>
          </h2>
        </div>
        <Link
          to="/projects"
          className="hidden items-center gap-2 text-sm font-medium text-gold transition-all hover:gap-3 md:inline-flex"
        >
          View all projects <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {featured.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.5 }}
          >
            <Link
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="group block overflow-hidden rounded-2xl border border-border/60 bg-card shadow-warm transition-all duration-300 hover:border-gold/30 hover:shadow-warm-lg"
            >
              {/* Visual area */}
              <div className={`relative h-52 bg-gradient-to-br ${categoryColors[project.category] ?? project.color} overflow-hidden`}>
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-8">
                    <p className="font-heading text-xl font-bold text-white/80 text-center leading-snug">
                      {project.title}
                    </p>
                  </div>
                )}
              </div>

              <div className="p-6">
                <span className="mb-2 inline-block rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                  {project.category}
                </span>
                <h3 className="font-heading text-lg font-bold text-foreground">{project.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{project.client}</p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-gold transition-all group-hover:gap-3">
                  View project <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="mt-8 flex justify-center md:hidden">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-medium text-gold transition-all hover:gap-3"
        >
          View all projects <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  );
}
