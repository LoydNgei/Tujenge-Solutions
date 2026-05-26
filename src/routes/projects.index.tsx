import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight, Clock, CheckCircle } from "lucide-react";
import { projects } from "../lib/projects-data";
import { CTASection } from "../components/CTASection";

const categoryColors: Record<string, string> = {
  "Platform Development": "from-emerald-500/80 to-teal-700/90",
  "Web Application": "from-blue-500/80 to-indigo-700/90",
};

export const Route = createFileRoute("/projects/")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Projects — Tujenge Solutions" },
      { name: "description", content: "Explore our portfolio of digital platforms, web applications, and business solutions built for businesses across Kenya." },
      { property: "og:title", content: "Projects — Tujenge Solutions" },
      { property: "og:description", content: "Real projects, real results. See what we've built for businesses like yours." },
    ],
  }),
});

function ProjectsPage() {
  return (
    <>
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">Our Work</p>
            <h1 className="font-heading text-4xl font-bold text-foreground md:text-6xl">
              Projects that
              <br />
              <span className="text-gradient-gold">speak results</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Every project is a partnership. Here's a look at the real digital solutions we've built — and the problems we've solved — for businesses across Kenya.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
            >
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="group block overflow-hidden rounded-2xl border border-border/60 bg-card shadow-warm transition-all duration-300 hover:border-gold/30 hover:shadow-warm-lg"
              >
                {/* Visual area — image or gradient */}
                <div className={`relative h-64 bg-gradient-to-br ${categoryColors[project.category] ?? project.color} overflow-hidden`}>
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full flex-col items-center justify-center p-10">
                      <p className="font-heading text-2xl font-bold text-white/90 text-center leading-snug">
                        {project.title}
                      </p>
                      <p className="mt-2 text-sm text-white/60">{project.client}</p>
                    </div>
                  )}
                  {/* Overlay gradient at bottom */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/20 to-transparent" />
                </div>

                {/* Card body */}
                <div className="p-8">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold transition-all group-hover:gap-3">
                    View full project <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
