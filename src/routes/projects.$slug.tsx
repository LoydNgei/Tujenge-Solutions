import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { projects } from "../lib/projects-data";
import { CTASection } from "../components/CTASection";

export const Route = createFileRoute("/projects/$slug")({
  component: ProjectDetailPage,
  head: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    const title = project ? `${project.title} — N5 Labs` : "Project — N5 Labs";
    const desc = project?.description ?? "Project by N5 Labs.";
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

  return (
    <>
      <section className="pt-32 pb-16">
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

            <div className="mb-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-gold/10 px-3 py-1 text-xs font-medium text-gold">
                {project.category}
              </span>
            </div>

            <h1 className="font-heading text-4xl font-bold md:text-6xl">
              {project.title}
            </h1>
            <p className="mt-2 text-lg text-muted-foreground">
              Client: <span className="font-medium text-foreground">{project.client}</span>
            </p>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {project.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Hero visual */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`h-64 rounded-3xl bg-gradient-to-br ${project.color} border border-border/50 md:h-96`}
        />
      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="mb-8 font-heading text-2xl font-bold">Key Results</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {project.results.map((result, i) => (
            <motion.div
              key={result}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="flex items-center gap-3 rounded-xl border border-border/50 bg-surface p-6"
            >
              <CheckCircle className="h-5 w-5 shrink-0 text-gold" />
              <span className="font-heading font-semibold text-foreground">{result}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Tags */}
      <section className="mx-auto max-w-7xl px-6 pb-24">
        <h2 className="mb-4 font-heading text-lg font-bold">Technologies & Tags</h2>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-border/50 bg-surface-light px-4 py-2 text-sm text-muted-foreground">
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Navigation between projects */}
      <section className="border-t border-border/50">
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
