import { createFileRoute } from "@tanstack/react-router";
import { ImageField, Panel, TextAreaField, TextField, ToggleField } from "@/components/admin/fields";
import { EditorFrame, useItemEditor } from "@/components/admin/ItemEditor";
import type { TeamMember } from "@/lib/cms/types";

export const Route = createFileRoute("/admin/team/$id")({
  component: TeamEditor,
});

const blankMember = (): TeamMember => ({
  name: "",
  role: "",
  bio: "",
  photoUrl: null,
  github: null,
  linkedin: null,
  twitter: null,
  sortOrder: 0,
  published: true,
});

function TeamEditor() {
  const { id } = Route.useParams();
  const editor = useItemEditor("team", id, blankMember);
  const m = editor.value;

  return (
    <EditorFrame
      collection="team"
      title={m?.name ?? ""}
      isNew={editor.isNew}
      isPending={editor.isPending || !m}
      error={editor.error}
      viewUrl="/about#team"
      dirty={editor.dirty}
      saving={editor.saving}
      onSave={editor.save}
      onDiscard={editor.reset}
      main={
        m && (
          <>
            <Panel title="Profile">
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField label="Name" required value={m.name} onChange={(name) => editor.patch({ name })} />
                <TextField label="Role" value={m.role} onChange={(role) => editor.patch({ role })} placeholder="e.g. Co-Founder" />
              </div>
              <TextAreaField label="Bio" rows={5} value={m.bio} onChange={(bio) => editor.patch({ bio })} />
            </Panel>
            <Panel title="Social links" description="Leave blank to hide the icon.">
              <TextField label="GitHub" type="url" value={m.github} onChange={(github) => editor.patch({ github })} placeholder="https://github.com/..." />
              <TextField label="LinkedIn" type="url" value={m.linkedin} onChange={(linkedin) => editor.patch({ linkedin })} placeholder="https://linkedin.com/in/..." />
              <TextField label="X / Twitter" type="url" value={m.twitter} onChange={(twitter) => editor.patch({ twitter })} placeholder="https://x.com/..." />
            </Panel>
          </>
        )
      }
      side={
        m && (
          <>
            <Panel>
              <ToggleField
                label="Published"
                description="Show on the About page."
                checked={m.published}
                onChange={(published) => editor.patch({ published })}
              />
            </Panel>
            <Panel>
              <ImageField label="Photo" aspect="aspect-square" value={m.photoUrl} onChange={(photoUrl) => editor.patch({ photoUrl })} folder="team" />
            </Panel>
          </>
        )
      }
    />
  );
}
