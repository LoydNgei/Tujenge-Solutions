import { useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, Eye, EyeOff, Pencil, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import {
  deleteItem,
  reorderItems,
  setPublished,
  useCollection,
  useInvalidate,
  type CollectionKey,
  type ItemOf,
} from "@/lib/cms/admin";
import { ErrorState, LoadingState } from "./editor";
import { PageHeader } from "./fields";

type ListItem = { id?: string; published: boolean };

export function CollectionList<K extends CollectionKey>({
  collection,
  title,
  description,
  newLabel,
  editRoute,
  renderItem,
  emptyText,
}: {
  collection: K;
  title: string;
  description: string;
  newLabel: string;
  editRoute: "/admin/services/$id" | "/admin/projects/$id" | "/admin/team/$id";
  renderItem: (item: ItemOf<K>) => { title: ReactNode; subtitle?: ReactNode; image?: string | null; badge?: ReactNode };
  emptyText: string;
}) {
  const { data, isPending, error } = useCollection(collection);
  const invalidate = useInvalidate();
  const [confirming, setConfirming] = useState<{ id: string; title: ReactNode } | null>(null);
  const [busy, setBusy] = useState(false);

  const items = (data ?? []) as (ItemOf<K> & ListItem)[];

  const act = async (fn: () => Promise<void>, message?: string) => {
    setBusy(true);
    try {
      await fn();
      await invalidate();
      if (message) toast.success(message);
    } catch (e) {
      toast.error("Something went wrong", { description: e instanceof Error ? e.message : undefined });
    } finally {
      setBusy(false);
    }
  };

  const move = (from: number, to: number) => {
    const ids = items.map((i) => i.id!);
    const [id] = ids.splice(from, 1);
    ids.splice(to, 0, id);
    act(() => reorderItems(collection, ids));
  };

  const iconBtn =
    "flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground disabled:pointer-events-none disabled:opacity-30";

  return (
    <>
      <PageHeader
        title={title}
        description={description}
        actions={
          <Link
            to={editRoute}
            params={{ id: "new" }}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <Plus className="h-4 w-4" /> {newLabel}
          </Link>
        }
      />

      {isPending ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} />
      ) : items.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border p-12 text-center text-sm text-muted-foreground">{emptyText}</div>
      ) : (
        <ul className={cn("divide-y divide-border/60 overflow-hidden rounded-xl border border-border/70 bg-card", busy && "opacity-70")}>
          {items.map((item, i) => {
            const view = renderItem(item);
            return (
              <li key={item.id} className="group flex items-center gap-4 px-4 py-3 transition-colors hover:bg-surface/60">
                <Link to={editRoute} params={{ id: item.id! }} className="flex min-w-0 flex-1 items-center gap-4">
                  <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
                    {view.image && <img src={view.image} alt="" className="h-full w-full object-cover" loading="lazy" />}
                  </div>
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 truncate font-medium text-foreground">
                      {view.title}
                      {!item.published && (
                        <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                          Hidden
                        </span>
                      )}
                      {view.badge}
                    </p>
                    {view.subtitle && <p className="truncate text-sm text-muted-foreground">{view.subtitle}</p>}
                  </div>
                </Link>
                <div className="flex shrink-0 items-center">
                  <button className={iconBtn} disabled={busy || i === 0} onClick={() => move(i, i - 1)} aria-label="Move up" title="Move up">
                    <ArrowUp className="h-4 w-4" />
                  </button>
                  <button
                    className={iconBtn}
                    disabled={busy || i === items.length - 1}
                    onClick={() => move(i, i + 1)}
                    aria-label="Move down"
                    title="Move down"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </button>
                  <button
                    className={iconBtn}
                    disabled={busy}
                    onClick={() =>
                      act(() => setPublished(collection, item.id!, !item.published), item.published ? "Hidden from site" : "Published")
                    }
                    aria-label={item.published ? "Hide from site" : "Publish"}
                    title={item.published ? "Hide from site" : "Publish"}
                  >
                    {item.published ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  </button>
                  <Link to={editRoute} params={{ id: item.id! }} className={iconBtn} aria-label="Edit" title="Edit">
                    <Pencil className="h-4 w-4" />
                  </Link>
                  <button
                    className={cn(iconBtn, "hover:bg-destructive/10 hover:text-destructive")}
                    disabled={busy}
                    onClick={() => setConfirming({ id: item.id!, title: view.title })}
                    aria-label="Delete"
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      <AlertDialog open={!!confirming} onOpenChange={(open) => !open && setConfirming(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete “{confirming?.title}”?</AlertDialogTitle>
            <AlertDialogDescription>
              This removes it from the website permanently. To take it down temporarily, hide it instead.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => confirming && act(() => deleteItem(collection, confirming.id), "Deleted")}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
