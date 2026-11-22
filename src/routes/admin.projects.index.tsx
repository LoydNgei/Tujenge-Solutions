import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { CollectionList } from "@/components/admin/CollectionList";

export const Route = createFileRoute("/admin/projects/")({
  component: () => (
    <CollectionList
      collection="projects"
      title="Projects"
      description="Your portfolio. Featured projects also show on the homepage."
      newLabel="New project"
      editRoute="/admin/projects/$id"
      emptyText="No projects yet."
      renderItem={(p) => ({
        title: p.title,
        subtitle: [p.client, p.category].filter(Boolean).join(" · "),
        image: p.imageUrl,
        badge: p.featured ? <Star className="h-3.5 w-3.5 fill-gold text-gold" aria-label="Featured" /> : null,
      })}
    />
  ),
});
