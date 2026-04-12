import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { projects } from "../lib/projects-data";

const featured = projects.slice(0, 3);

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
          <h2 className="font-heading text-3xl font-bold md:text-5xl">
            Recent <span className="text-gradient-gold">projects</span>
          </h2>
        </div>
        <Link
          to="/projects"
          className="hidden items-center gap-2 text-sm font-medium text-gold transition-all hover:gap-3 md:inline-flex"
        >
          View all projects <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
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
              className="group block overflow-hidden rounded-2xl border border-border/50 bg-surface transition-all duration-300 hover:border-gold/30"
            >
              <div className={`h-40 bg-gradient-to-br ${project.color}`} />
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

      <Link
        to="/projects"
        className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-gold transition-all hover:gap-3 md:hidden"
      >
        View all projects <ArrowRight className="h-4 w-4" />
      </Link>
    </section>
  );
}
