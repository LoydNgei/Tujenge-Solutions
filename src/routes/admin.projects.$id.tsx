import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import {
  Field,
  ImageField,
  Panel,
  StringListField,
  TagsField,
  TextAreaField,
  TextField,
  ToggleField,
  cleanSlugInput,
  slugify,
} from "@/components/admin/fields";
import { EditorFrame, useItemEditor } from "@/components/admin/ItemEditor";
import { projectColors } from "@/lib/cms/colors";
import { cn } from "@/lib/utils";
import type { Project } from "@/lib/cms/types";

export const Route = createFileRoute("/admin/projects/$id")({
  component: ProjectEditor,
});

const blankProject = (): Project => ({
  slug: "",
  title: "",
  client: "",
  category: "Web Application",
  description: "",
  highlights: [],
  results: [],
  tags: [],
  color: projectColors[0].value,
  imageUrl: null,
  liveUrl: null,
  featured: true,
  sortOrder: 0,
  published: true,
});

function ProjectEditor() {
  const { id } = Route.useParams();
  const editor = useItemEditor("projects", id, blankProject);
  const [slugTouched, setSlugTouched] = useState(false);
  const p = editor.value;

  return (
    <EditorFrame
      collection="projects"
      title={p?.title ?? ""}
      isNew={editor.isNew}
      isPending={editor.isPending || !p}
      error={editor.error}
      viewUrl={p ? `/projects/${p.slug}` : undefined}
      dirty={editor.dirty}
      saving={editor.saving}
      onSave={editor.save}
      onDiscard={editor.reset}
      main={
        p && (
          <>
            <Panel title="Basics">
              <TextField
                label="Project name"
                required
                value={p.title}
                onChange={(title) =>
                  editor.patch(editor.isNew && !slugTouched ? { title, slug: slugify(title) } : { title })
                }
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <TextField label="Client" value={p.client} onChange={(client) => editor.patch({ client })} />
                <TextField label="Category" value={p.category} onChange={(category) => editor.patch({ category })} placeholder="e.g. Web Application" />
              </div>
              <TextAreaField label="Description" value={p.description} onChange={(description) => editor.patch({ description })} />
              <TextField
                label="Live site URL"
                type="url"
                value={p.liveUrl}
                onChange={(liveUrl) => editor.patch({ liveUrl })}
                placeholder="https://"
              />
            </Panel>

            <Panel title="What we built" description="Shown as cards on the project page.">
              <StringListField
                label="Highlights"
                items={p.highlights}
                onChange={(highlights) => editor.patch({ highlights })}
                addLabel="Add highlight"
              />
            </Panel>

            <Panel title="Key outcomes">
              <StringListField
                label="Outcomes"
                items={p.results}
                onChange={(results) => editor.patch({ results })}
                placeholder="e.g. M-Pesa payment integration"
                addLabel="Add outcome"
              />
              <TagsField label="Tech & tags" tags={p.tags} onChange={(tags) => editor.patch({ tags })} />
            </Panel>
          </>
        )
      }
      side={
        p && (
          <>
            <Panel>
              <ToggleField
                label="Published"
                description="Show this project on the website."
                checked={p.published}
                onChange={(published) => editor.patch({ published })}
              />
              <ToggleField
                label="Featured"
                description="Also show it on the homepage."
                checked={p.featured}
                onChange={(featured) => editor.patch({ featured })}
              />
            </Panel>
            <Panel>
              <ImageField label="Screenshot" value={p.imageUrl} onChange={(imageUrl) => editor.patch({ imageUrl })} folder="projects" />
              <Field label="Card colour" hint="Used when there's no screenshot.">
                <div className="flex flex-wrap gap-2">
                  {projectColors.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      title={c.label}
                      onClick={() => editor.patch({ color: c.value })}
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br ring-offset-2 ring-offset-card",
                        c.value,
                        p.color === c.value && "ring-2 ring-gold",
                      )}
                    >
                      {p.color === c.value && <Check className="h-4 w-4 text-white" />}
                    </button>
                  ))}
                </div>
              </Field>
              <TextField
                label="URL slug"
                hint={`tujengesolutions.com/projects/${p.slug || "..."}`}
                required
                value={p.slug}
                onChange={(slug) => {
                  setSlugTouched(true);
                  editor.patch({ slug: cleanSlugInput(slug) });
                }}
              />
            </Panel>
          </>
        )
      }
    />
  );
}
