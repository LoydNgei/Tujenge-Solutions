import { createFileRoute } from "@tanstack/react-router";
import { CollectionList } from "@/components/admin/CollectionList";

export const Route = createFileRoute("/admin/team/")({
  component: () => (
    <CollectionList
      collection="team"
      title="Team"
      description="People shown on the About page."
      newLabel="Add member"
      editRoute="/admin/team/$id"
      emptyText="No team members yet."
      renderItem={(m) => ({ title: m.name, subtitle: m.role, image: m.photoUrl })}
    />
  ),
});
