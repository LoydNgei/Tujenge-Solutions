import { createFileRoute } from "@tanstack/react-router";
import { CollectionList } from "@/components/admin/CollectionList";

export const Route = createFileRoute("/admin/services/")({
  component: () => (
    <CollectionList
      collection="services"
      title="Services"
      description="What you offer. The first four appear on the homepage; all appear in the menu and on the services page."
      newLabel="New service"
      editRoute="/admin/services/$id"
      emptyText="No services yet."
      renderItem={(s) => ({ title: s.title, subtitle: s.tagline, image: s.imageUrl })}
    />
  ),
});
