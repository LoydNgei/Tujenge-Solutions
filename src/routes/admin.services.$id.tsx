import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import {
  IconField,
  ImageField,
  Panel,
  RepeaterField,
  StringListField,
  TextAreaField,
  TextField,
  ToggleField,
  cleanSlugInput,
  slugify,
} from "@/components/admin/fields";
import { EditorFrame, useItemEditor } from "@/components/admin/ItemEditor";
import type { Service } from "@/lib/cms/types";

export const Route = createFileRoute("/admin/services/$id")({
  component: ServiceEditor,
});

const blankService = (): Service => ({
  slug: "",
  title: "",
  tagline: "",
  description: "",
  icon: "Code",
  imageUrl: null,
  features: [],
  details: [],
  sortOrder: 0,
  published: true,
});

function ServiceEditor() {
  const { id } = Route.useParams();
  const editor = useItemEditor("services", id, blankService);
  const [slugTouched, setSlugTouched] = useState(false);
  const s = editor.value;

  return (
    <EditorFrame
      collection="services"
      title={s?.title ?? ""}
      isNew={editor.isNew}
      isPending={editor.isPending || !s}
      error={editor.error}
      viewUrl={s ? `/services/${s.slug}` : undefined}
      dirty={editor.dirty}
      saving={editor.saving}
      onSave={editor.save}
      onDiscard={editor.reset}
      main={
        s && (
          <>
            <Panel title="Basics">
              <TextField
                label="Title"
                required
                value={s.title}
                onChange={(title) =>
                  editor.patch(editor.isNew && !slugTouched ? { title, slug: slugify(title) } : { title })
                }
              />
              <TextField label="Tagline" hint="One short line shown under the title" value={s.tagline} onChange={(tagline) => editor.patch({ tagline })} />
              <TextAreaField label="Description" value={s.description} onChange={(description) => editor.patch({ description })} />
            </Panel>

            <Panel title="Features" description="Short bullet points shown as a grid on the service page.">
              <StringListField
                label="Features"
                items={s.features}
                onChange={(features) => editor.patch({ features })}
                placeholder="e.g. Mobile-first responsive design"
                addLabel="Add feature"
              />
            </Panel>

            <Panel title="Detail sections" description="Longer sections further down the service page.">
              <RepeaterField
                label="Sections"
                items={s.details}
                onChange={(details) => editor.patch({ details })}
                newItem={() => ({ heading: "", text: "" })}
                itemTitle={(d) => d.heading}
                addLabel="Add section"
                renderItem={(d, update) => (
                  <>
                    <TextField label="Heading" value={d.heading} onChange={(heading) => update({ heading })} />
                    <TextAreaField label="Text" value={d.text} onChange={(text) => update({ text })} />
                  </>
                )}
              />
            </Panel>
          </>
        )
      }
      side={
        s && (
          <>
            <Panel>
              <ToggleField
                label="Published"
                description="Hidden services don't appear anywhere on the site."
                checked={s.published}
                onChange={(published) => editor.patch({ published })}
              />
            </Panel>
            <Panel>
              <ImageField label="Cover image" value={s.imageUrl} onChange={(imageUrl) => editor.patch({ imageUrl })} folder="services" />
              <IconField value={s.icon} onChange={(icon) => editor.patch({ icon })} />
              <TextField
                label="URL slug"
                hint={`tujengesolutions.com/services/${s.slug || "..."}`}
                required
                value={s.slug}
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
