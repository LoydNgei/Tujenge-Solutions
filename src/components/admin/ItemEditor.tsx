import { useState, type ReactNode } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink } from "lucide-react";
import {
  saveItem,
  useCollection,
  useCollectionItem,
  useInvalidate,
  type CollectionKey,
  type ItemOf,
} from "@/lib/cms/admin";
import { ErrorState, LoadingState, SaveBar, useEditor, useSaving } from "./editor";

const routes = {
  services: { list: "/admin/services", edit: "/admin/services/$id" },
  projects: { list: "/admin/projects", edit: "/admin/projects/$id" },
  team: { list: "/admin/team", edit: "/admin/team/$id" },
} as const;

/** Loads one collection item (or a blank one for id "new") and saves it. */
export function useItemEditor<K extends CollectionKey>(key: K, id: string, blank: () => ItemOf<K>) {
  const isNew = id === "new";
  const [blankItem] = useState(blank);
  const query = useCollectionItem(key, id);
  const list = useCollection(key);
  const editor = useEditor<ItemOf<K>>(isNew ? blankItem : query.data);
  const invalidate = useInvalidate();
  const navigate = useNavigate();
  const { saving, run } = useSaving();

  const save = () =>
    run(
      async () => {
        if (!editor.value) return;
        // New items go to the end of the list.
        const item = isNew ? { ...editor.value, sortOrder: list.data?.length ?? 0 } : editor.value;
        try {
          const savedId = await saveItem(key, item);
          editor.markSaved({ ...item, id: savedId });
          await invalidate();
          if (isNew) navigate({ to: routes[key].edit, params: { id: savedId }, replace: true });
        } catch (e) {
          const message = e instanceof Error ? e.message : String(e);
          if (message.includes("duplicate key")) throw new Error("That URL slug is already used by another item.");
          throw e;
        }
      },
      isNew ? "Created" : "Saved",
    );

  return { ...editor, isNew, isPending: !isNew && query.isPending, error: query.error, saving, save };
}

export function EditorFrame({
  collection,
  title,
  isNew,
  isPending,
  error,
  viewUrl,
  dirty,
  saving,
  onSave,
  onDiscard,
  main,
  side,
}: {
  collection: CollectionKey;
  title: string;
  isNew: boolean;
  isPending: boolean;
  error: unknown;
  viewUrl?: string;
  dirty: boolean;
  saving: boolean;
  onSave: () => void;
  onDiscard: () => void;
  main: ReactNode;
  side: ReactNode;
}) {
  const label = { services: "Services", projects: "Projects", team: "Team" }[collection];

  return (
    <>
      <Link
        to={routes[collection].list}
        className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-gold"
      >
        <ArrowLeft className="h-4 w-4" /> {label}
      </Link>

      {error ? (
        <ErrorState error={error} />
      ) : isPending ? (
        <LoadingState />
      ) : (
        <>
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h1 className="font-heading text-2xl font-extrabold text-foreground md:text-3xl">{title || "Untitled"}</h1>
            {viewUrl && !isNew && (
              <a
                href={viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-gold/40 hover:text-gold"
              >
                View on site <ExternalLink className="h-3.5 w-3.5" />
              </a>
            )}
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSave();
            }}
            className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]"
          >
            <div className="space-y-6">{main}</div>
            <div className="space-y-6">{side}</div>
          </form>

          <SaveBar dirty={dirty} saving={saving} onSave={onSave} onDiscard={onDiscard} isNew={isNew} />
        </>
      )}
    </>
  );
}
