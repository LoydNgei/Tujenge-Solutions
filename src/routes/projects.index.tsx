import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Clock, CheckCircle } from "lucide-react";
import { CTASection } from "../components/CTASection";
import { Headline } from "../components/Headline";
import { useProjects, useSettings } from "../lib/cms/content";
import { FALLBACK_PROJECT_COLOR } from "../lib/cms/colors";

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
  const projects = useProjects();
  const { projectsPage } = useSettings();

  return (
    <>
      <section className="pt-32 pb-16">
        <div className="mx-auto max-w-7xl px-6">
          <div
          >
            <p className="mb-3 text-sm font-semibold text-gold">{projectsPage.eyebrow}</p>
            <h1 className="font-heading text-4xl font-extrabold text-foreground md:text-6xl">
              <Headline {...projectsPage} breaks />
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              {projectsPage.intro}
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-24">
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, i) => (
            <div
              key={project.slug}
            >
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="group block overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-300 hover:border-gold/30"
              >
                {/* Visual area — image or gradient */}
                <div className={`relative aspect-video bg-gradient-to-br ${project.color || FALLBACK_PROJECT_COLOR} overflow-hidden`}>
                  {project.imageUrl ? (
                    <img
                      src={project.imageUrl}
                      alt={project.title}
                      className="h-full w-full object-cover object-center "
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
            </div>
          ))}
        </div>
      </section>

      <CTASection />
    </>
  );
}
