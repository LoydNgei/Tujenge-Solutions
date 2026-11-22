import { useEffect, useRef, useState } from "react";
import { useBlocker } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

/**
 * Local form state for an editor page. `dirty` compares against the last
 * loaded/saved value, and leaving the page with unsaved changes asks first.
 */
export function useEditor<T>(source: T | undefined) {
  const [value, setValue] = useState<T | undefined>(source);
  const baseline = useRef<string>(JSON.stringify(source));

  // Adopt fresh server data until the user starts editing.
  useEffect(() => {
    if (source === undefined) return;
    const pristine = value === undefined || JSON.stringify(value) === baseline.current;
    baseline.current = JSON.stringify(source);
    if (pristine) setValue(source);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source]);

  const dirty = value !== undefined && JSON.stringify(value) !== baseline.current;
  // A ref so navigation right after saving isn't blocked by a stale render.
  const dirtyRef = useRef(dirty);
  dirtyRef.current = dirty;

  useBlocker({
    shouldBlockFn: () => dirtyRef.current && !window.confirm("You have unsaved changes. Leave without saving?"),
    enableBeforeUnload: () => dirtyRef.current,
  });

  return {
    value,
    setValue,
    patch: (p: Partial<T>) => setValue((v) => (v === undefined ? v : { ...v, ...p })),
    dirty,
    reset: () => setValue(JSON.parse(baseline.current) as T),
    markSaved: (saved: T) => {
      baseline.current = JSON.stringify(saved);
      dirtyRef.current = false;
      setValue(saved);
    },
  };
}

export function useSaving() {
  const [saving, setSaving] = useState(false);
  const run = async (fn: () => Promise<void>, success = "Saved") => {
    setSaving(true);
    try {
      await fn();
      toast.success(success);
      return true;
    } catch (e) {
      toast.error("Couldn't save", { description: e instanceof Error ? e.message : String(e) });
      return false;
    } finally {
      setSaving(false);
    }
  };
  return { saving, run };
}

export function SaveBar({
  dirty,
  saving,
  onSave,
  onDiscard,
  isNew,
}: {
  dirty: boolean;
  saving: boolean;
  onSave: () => void;
  onDiscard: () => void;
  isNew?: boolean;
}) {
  const visible = dirty || saving || isNew;
  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-x-0 bottom-0 z-40 flex justify-center p-4 transition-all duration-300 lg:pl-64",
        visible ? "translate-y-0 opacity-100" : "translate-y-full opacity-0",
      )}
    >
      <div className="pointer-events-auto flex w-full max-w-xl items-center justify-between gap-3 rounded-xl border border-border/70 bg-card/95 px-4 py-3">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="h-2 w-2 rounded-full bg-gold" />
          {isNew ? "New, not saved yet" : "Unsaved changes"}
        </p>
        <div className="flex items-center gap-2">
          {!isNew && (
            <button
              type="button"
              onClick={onDiscard}
              disabled={saving}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              Discard
            </button>
          )}
          <button
            type="button"
            onClick={onSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {saving && <Loader2 className="h-4 w-4 animate-spin" />}
            {isNew ? "Create" : "Save changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

export function LoadingState() {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin text-gold" />
    </div>
  );
}

export function ErrorState({ error }: { error: unknown }) {
  return (
    <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
      <p className="font-semibold">Something went wrong loading this page.</p>
      <p className="mt-1 opacity-80">{error instanceof Error ? error.message : String(error)}</p>
    </div>
  );
}
