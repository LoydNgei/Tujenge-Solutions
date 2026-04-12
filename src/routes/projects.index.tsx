import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { projects } from "../lib/projects-data";
import { CTASection } from "../components/CTASection";

export const Route = createFileRoute("/projects/")({
  component: ProjectsPage,
  head: () => ({
    meta: [
      { title: "Projects — N5 Labs" },
      { name: "description", content: "Explore our portfolio of web development, AI automation, and digital marketing projects built for businesses across Kenya." },
      { property: "og:title", content: "Projects — N5 Labs" },
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
            <h1 className="font-heading text-4xl font-bold md:text-6xl">
              Projects that
              <br />
              <span className="text-gradient-gold">speak results</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              From logistics platforms to AI chatbots — here's a look at the digital solutions we've built for businesses across Kenya.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
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
                className="group block overflow-hidden rounded-2xl border border-border/50 bg-surface transition-all duration-300 hover:border-gold/30"
              >
                {/* Project visual placeholder */}
                <div className={`h-48 bg-gradient-to-br ${project.color}`} />

                <div className="p-8">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">{project.client}</p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.results.map((result) => (
                      <span key={result} className="rounded-lg border border-border/50 px-3 py-1 text-xs text-muted-foreground">
                        {result}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold transition-all group-hover:gap-3">
                    View project <ArrowRight className="h-4 w-4" />
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
