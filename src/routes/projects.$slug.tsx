import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle, ExternalLink, Clock } from "lucide-react";
import { projects } from "../lib/projects-data";
import { CTASection } from "../components/CTASection";

const categoryColors: Record<string, string> = {
  "Platform Development": "from-emerald-500/80 to-teal-700/90",
  "Web Application": "from-blue-500/80 to-indigo-700/90",
};

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectDetailPage,
  head: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    const title = project ? `${project.title} — Tujenge Solutions` : "Project — Tujenge Solutions";
    const desc = project?.description ?? "Project by Tujenge Solutions.";
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
      ],
    };
  },
  notFoundComponent: () => (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="text-center">
        <h1 className="font-heading text-4xl font-bold">Project not found</h1>
        <p className="mt-4 text-muted-foreground">This project doesn't exist.</p>
        <Link to="/projects" className="mt-6 inline-flex items-center gap-2 text-gold hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>
      </div>
    </div>
  ),
});

function ProjectDetailPage() {
  const { slug } = Route.useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    throw notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  const gradientColor = categoryColors[project.category] ?? project.color;

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-10">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/projects"
              className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              <ArrowLeft className="h-4 w-4" /> All Projects
            </Link>

            <h1 className="font-heading text-4xl font-bold text-foreground md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Client: <span className="font-medium text-foreground">{project.client}</span>
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-gradient-gold px-6 py-3 font-heading text-sm font-semibold text-primary-foreground shadow-warm transition-all hover:opacity-90"
              >
                View Live Site <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </motion.div>
        </div>
      </section>

      {/* Hero Visual */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-border/60 shadow-warm-lg"
        >
          {project.imageUrl ? (
            <img
              src={project.imageUrl}
              alt={`${project.title} screenshot`}
              className="h-full w-full object-cover object-center"
            />
          ) : (
            <div className={`flex h-full w-full items-center justify-center bg-gradient-to-br ${gradientColor}`}>
              <div className="text-center text-white/90 px-8">
                <p className="font-heading text-3xl font-bold md:text-4xl">{project.title}</p>
                <p className="mt-3 text-lg opacity-80">{project.client}</p>
              </div>
            </div>
          )}
        </motion.div>
      </section>

      {/* Highlights */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="mb-8 font-heading text-2xl font-bold text-foreground">What We Built</h2>
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-3">
            {project.highlights.map((highlight, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex items-start gap-4 rounded-2xl border border-border/60 bg-card p-6 shadow-warm"
              >
                <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gold/10">
                  <CheckCircle className="h-4 w-4 text-gold" />
                </div>
                <p className="text-sm leading-relaxed text-foreground">{highlight}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Key Outcomes */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-8 font-heading text-2xl font-bold text-foreground">Key Outcomes</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {project.results.map((result, i) => (
            <motion.div
              key={result}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="rounded-xl border border-gold/15 bg-gold/5 p-6 text-center"
            >
              <p className="font-heading font-semibold text-foreground">{result}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Navigation between projects */}
      <section className="border-t border-border/60">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex items-center justify-between">
            <Link
              to="/projects/$slug"
              params={{ slug: prevProject.slug }}
              className="group flex items-center gap-3 text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Previous</p>
                <p className="font-heading font-semibold">{prevProject.title}</p>
              </div>
            </Link>
            <Link
              to="/projects/$slug"
              params={{ slug: nextProject.slug }}
              className="group flex items-center gap-3 text-right text-muted-foreground transition-colors hover:text-foreground"
            >
              <div>
                <p className="text-xs uppercase tracking-wider text-muted-foreground">Next</p>
                <p className="font-heading font-semibold">{nextProject.title}</p>
              </div>
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>

      <CTASection />
    </>
  );
}
