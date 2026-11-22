import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Headline } from "./Headline";
import { useProjects, useSettings } from "../lib/cms/content";
import { FALLBACK_PROJECT_COLOR } from "../lib/cms/colors";

export function ProjectsPreview() {
  const featured = useProjects().filter((p) => p.featured).slice(0, 4);
  const { homeProjects } = useSettings();

  return (
    <section className="bg-background py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
          <div className="max-w-2xl">
            {homeProjects.eyebrow && (
              <p className="mb-3 text-base font-bold text-gold">{homeProjects.eyebrow}</p>
            )}
            <h2 className="font-heading text-4xl font-extrabold text-foreground md:text-5xl">
              <Headline {...homeProjects} />
            </h2>
          </div>
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-base font-bold text-foreground transition-colors hover:text-gold"
          >
            All projects <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-x-6 gap-y-10 md:grid-cols-2">
          {featured.map((project) => (
            <Link
              key={project.slug}
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="group block"
            >
              <div className={`aspect-[16/10] overflow-hidden rounded-xl bg-gradient-to-br ${project.color || FALLBACK_PROJECT_COLOR}`}>
                {project.imageUrl ? (
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    loading="lazy"
                    className="h-full w-full object-cover object-center"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center p-8">
                    <p className="text-center font-heading text-2xl font-bold text-white">{project.title}</p>
                  </div>
                )}
              </div>
              <div className="mt-5">
                <p className="text-sm font-bold text-gold">{project.category}</p>
                <h3 className="mt-1 font-heading text-2xl font-bold text-foreground transition-colors group-hover:text-gold">
                  {project.title}
                </h3>
                <p className="mt-1 text-base text-muted-foreground">{project.client}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
