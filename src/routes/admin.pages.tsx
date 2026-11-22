import { useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  HeadlineFields,
  HeadingPreview,
  IconField,
  ImageField,
  PageHeader,
  Panel,
  RepeaterField,
  StringListField,
  TextAreaField,
  TextField,
} from "@/components/admin/fields";
import { ErrorState, LoadingState, SaveBar, useEditor, useSaving } from "@/components/admin/editor";
import { saveSettings, useInvalidate, useStoredSettings } from "@/lib/cms/admin";
import { mergeSettings } from "@/lib/cms/mappers";
import type { IconCard, SiteSettings } from "@/lib/cms/types";

type Tab = "home" | "listings" | "about" | "contact";

export const Route = createFileRoute("/admin/pages")({
  component: PagesEditor,
  validateSearch: (search: Record<string, unknown>): { tab?: Tab } => ({
    tab: ["home", "listings", "about", "contact"].includes(search.tab as string) ? (search.tab as Tab) : undefined,
  }),
});

function IconCardsField({
  label,
  items,
  onChange,
  addLabel,
}: {
  label: string;
  items: IconCard[];
  onChange: (items: IconCard[]) => void;
  addLabel: string;
}) {
  return (
    <RepeaterField
      label={label}
      items={items}
      onChange={onChange}
      newItem={() => ({ icon: "Sparkles", title: "", description: "" })}
      itemTitle={(c, i) => `${i + 1}. ${c.title}`}
      addLabel={addLabel}
      renderItem={(c, update) => (
        <>
          <div className="grid gap-4 sm:grid-cols-[1fr_180px]">
            <TextField label="Title" value={c.title} onChange={(title) => update({ title })} />
            <IconField value={c.icon} onChange={(icon) => update({ icon })} />
          </div>
          <TextAreaField label="Description" rows={3} value={c.description} onChange={(description) => update({ description })} />
        </>
      )}
    />
  );
}

function PagesEditor() {
  const { tab = "home" } = Route.useSearch();
  const navigate = Route.useNavigate();
  const stored = useStoredSettings();
  const source = useMemo(() => (stored.isSuccess ? mergeSettings(stored.data) : undefined), [stored.isSuccess, stored.data]);
  const editor = useEditor<SiteSettings>(source);
  const invalidate = useInvalidate();
  const { saving, run } = useSaving();
  const s = editor.value;

  const set = <K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) => editor.patch({ [key]: value } as Partial<SiteSettings>);

  const save = () =>
    run(async () => {
      if (!s) return;
      await saveSettings(s);
      editor.markSaved(s);
      await invalidate();
    });

  return (
    <>
      <PageHeader title="Pages" description="Headings and copy across the website. Services, projects and team have their own sections." />

      {stored.error ? (
        <ErrorState error={stored.error} />
      ) : !s ? (
        <LoadingState />
      ) : (
        <Tabs value={tab} onValueChange={(t) => navigate({ search: { tab: t as Tab }, replace: true })}>
          <TabsList className="mb-6 h-auto flex-wrap justify-start gap-1 bg-muted/60 p-1">
            <TabsTrigger value="home">Home</TabsTrigger>
            <TabsTrigger value="listings">Services & Projects pages</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="contact">Contact & Footer</TabsTrigger>
          </TabsList>

          <TabsContent value="home" className="space-y-6">
            <Panel title="Hero" description="The first thing visitors see.">
              <div className="grid gap-4 sm:grid-cols-3">
                <TextField label="Line 1" value={s.hero.before} onChange={(before) => set("hero", { ...s.hero, before })} />
                <TextField label="Line 2 (gold)" value={s.hero.highlight} onChange={(highlight) => set("hero", { ...s.hero, highlight })} />
                <TextField label="Line 3" value={s.hero.after} onChange={(after) => set("hero", { ...s.hero, after })} />
              </div>
              <HeadingPreview before={s.hero.before} highlight={s.hero.highlight} after={s.hero.after} />
              <TextAreaField label="Subtitle" rows={3} value={s.hero.subtitle} onChange={(subtitle) => set("hero", { ...s.hero, subtitle })} />
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Main button" hint="Links to Contact" value={s.hero.primaryCta} onChange={(primaryCta) => set("hero", { ...s.hero, primaryCta })} />
                <TextField label="Second button" hint="Links to Projects" value={s.hero.secondaryCta} onChange={(secondaryCta) => set("hero", { ...s.hero, secondaryCta })} />
              </div>
              <RepeaterField
                label="Stats"
                hint="Numbers shown under the buttons."
                items={s.hero.stats}
                onChange={(stats) => set("hero", { ...s.hero, stats })}
                newItem={() => ({ value: "", label: "" })}
                itemTitle={(st) => [st.value, st.label].filter(Boolean).join(" ")}
                addLabel="Add stat"
                renderItem={(st, update) => (
                  <div className="grid gap-4 sm:grid-cols-[140px_1fr]">
                    <TextField label="Value" value={st.value} onChange={(value) => update({ value })} placeholder="e.g. 10+" />
                    <TextField label="Label" value={st.label} onChange={(label) => update({ label })} />
                  </div>
                )}
              />
              <ImageField
                label="Background image"
                hint="Shown on the right on larger screens."
                value={s.hero.imageUrl}
                onChange={(imageUrl) => set("hero", { ...s.hero, imageUrl })}
                folder="pages"
                aspect="aspect-[16/7]"
              />
            </Panel>

            <Panel title="Services section" description="Shows your first four services.">
              <HeadlineFields value={s.homeServices} onChange={(v) => set("homeServices", v)} />
            </Panel>

            <Panel title="Process section">
              <HeadlineFields value={s.process} onChange={(v) => set("process", v)} />
              <IconCardsField label="Steps" items={s.process.steps} onChange={(steps) => set("process", { ...s.process, steps })} addLabel="Add step" />
            </Panel>

            <Panel title="Projects section" description="Shows your featured projects.">
              <HeadlineFields value={s.homeProjects} onChange={(v) => set("homeProjects", v)} />
            </Panel>

            <Panel title="Call to action banner" description="Appears at the bottom of most pages.">
              <TextField label="Title" value={s.cta.title} onChange={(title) => set("cta", { ...s.cta, title })} />
              <TextField label="Subtitle" value={s.cta.subtitle} onChange={(subtitle) => set("cta", { ...s.cta, subtitle })} />
              <TextField label="Button" value={s.cta.buttonLabel} onChange={(buttonLabel) => set("cta", { ...s.cta, buttonLabel })} />
            </Panel>
          </TabsContent>

          <TabsContent value="listings" className="space-y-6">
            <Panel title="Services page header">
              <HeadlineFields value={s.servicesPage} onChange={(v) => set("servicesPage", v)} />
              <TextAreaField label="Intro" rows={3} value={s.servicesPage.intro} onChange={(intro) => set("servicesPage", { ...s.servicesPage, intro })} />
            </Panel>
            <Panel title="Projects page header">
              <HeadlineFields value={s.projectsPage} onChange={(v) => set("projectsPage", v)} />
              <TextAreaField label="Intro" rows={3} value={s.projectsPage.intro} onChange={(intro) => set("projectsPage", { ...s.projectsPage, intro })} />
            </Panel>
          </TabsContent>

          <TabsContent value="about" className="space-y-6">
            <Panel title="Our story">
              <HeadlineFields value={s.about} onChange={(v) => set("about", v)} />
              <StringListField
                label="Paragraphs"
                hint="Wrap words in *asterisks* to emphasise them."
                items={s.about.paragraphs}
                onChange={(paragraphs) => set("about", { ...s.about, paragraphs })}
                addLabel="Add paragraph"
              />
            </Panel>
            <Panel title="Mission, vision & approach">
              <IconCardsField label="Cards" items={s.about.pillars} onChange={(pillars) => set("about", { ...s.about, pillars })} addLabel="Add card" />
            </Panel>
            <Panel title="Team section" description="Team members themselves are edited under Team.">
              <HeadlineFields value={s.about.team} onChange={(team) => set("about", { ...s.about, team })} />
              <TextAreaField label="Intro" rows={3} value={s.about.team.intro} onChange={(intro) => set("about", { ...s.about, team: { ...s.about.team, intro } })} />
            </Panel>
          </TabsContent>

          <TabsContent value="contact" className="space-y-6">
            <Panel title="Contact details" description="Used on the Contact page and in the footer.">
              <div className="grid gap-4 sm:grid-cols-2">
                <TextField label="Email" type="email" value={s.contact.email} onChange={(email) => set("contact", { ...s.contact, email })} />
                <TextField label="Phone" value={s.contact.phone} onChange={(phone) => set("contact", { ...s.contact, phone })} />
              </div>
              <TextField label="Location" value={s.contact.location} onChange={(location) => set("contact", { ...s.contact, location })} />
            </Panel>
            <Panel title="WhatsApp button" description="The floating chat button on every page. Leave the number blank to hide it.">
              <TextField
                label="WhatsApp number"
                hint="International format, digits only, e.g. 254712345678"
                value={s.contact.whatsappNumber}
                onChange={(whatsappNumber) => set("contact", { ...s.contact, whatsappNumber })}
              />
              <TextField
                label="Pre-filled message"
                value={s.contact.whatsappMessage}
                onChange={(whatsappMessage) => set("contact", { ...s.contact, whatsappMessage })}
              />
            </Panel>
            <Panel title="Contact page header">
              <HeadlineFields value={s.contact} onChange={(v) => set("contact", v)} />
            </Panel>
            <Panel title="Footer">
              <TextAreaField label="About blurb" rows={3} value={s.footer.blurb} onChange={(blurb) => set("footer", { ...s.footer, blurb })} />
              <RepeaterField
                label="Social links"
                items={s.footer.socials}
                onChange={(socials) => set("footer", { ...s.footer, socials })}
                newItem={() => ({ label: "", href: "" })}
                itemTitle={(l) => l.label}
                addLabel="Add link"
                renderItem={(l, update) => (
                  <div className="grid gap-4 sm:grid-cols-[160px_1fr]">
                    <TextField label="Label" value={l.label} onChange={(label) => update({ label })} placeholder="e.g. LinkedIn" />
                    <TextField label="URL" type="url" value={l.href} onChange={(href) => update({ href })} placeholder="https://" />
                  </div>
                )}
              />
            </Panel>
          </TabsContent>
        </Tabs>
      )}

      <SaveBar dirty={editor.dirty} saving={saving} onSave={save} onDiscard={editor.reset} />
    </>
  );
}
