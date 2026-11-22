import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { format, formatDistanceToNow } from "date-fns";
import { Archive, ArchiveRestore, Inbox, Mail, MailOpen, Phone, Reply, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/fields";
import { ErrorState, LoadingState } from "@/components/admin/editor";
import { deleteSubmission, setSubmissionStatus, useInbox, useInvalidate } from "@/lib/cms/admin";
import type { ContactSubmission } from "@/lib/cms/contact";
import { cn } from "@/lib/utils";

type Filter = "inbox" | "archived";

export const Route = createFileRoute("/admin/inbox")({
  component: InboxPage,
  validateSearch: (search: Record<string, unknown>): { id?: string } => ({
    id: typeof search.id === "string" ? search.id : undefined,
  }),
});

function InboxPage() {
  const { id: selectedId } = Route.useSearch();
  const navigate = Route.useNavigate();
  const { data, isPending, error } = useInbox();
  const invalidate = useInvalidate();
  const [filter, setFilter] = useState<Filter>("inbox");

  const messages = (data ?? []).filter((m) => (filter === "archived" ? m.status === "archived" : m.status !== "archived"));
  const selected = data?.find((m) => m.id === selectedId) ?? null;
  const select = (id?: string) => navigate({ search: { id }, replace: true });

  const update = async (fn: () => Promise<void>) => {
    try {
      await fn();
      await invalidate();
    } catch (e) {
      toast.error("Something went wrong", { description: e instanceof Error ? e.message : undefined });
    }
  };

  // Opening a message marks it read.
  useEffect(() => {
    if (selected?.status === "new") update(() => setSubmissionStatus(selected.id, "read"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected?.id]);

  return (
    <>
      <PageHeader title="Inbox" description="Messages sent through the contact form." />

      <div className="mb-4 inline-flex rounded-lg bg-muted/60 p-1">
        {(["inbox", "archived"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-md px-3 py-1.5 text-sm font-medium capitalize transition-colors",
              filter === f ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
            )}
          >
            {f}
          </button>
        ))}
      </div>

      {isPending ? (
        <LoadingState />
      ) : error ? (
        <ErrorState error={error} />
      ) : (
        <div className="grid gap-4 lg:grid-cols-[340px_minmax(0,1fr)]">
          <ul
            className={cn(
              "max-h-[70vh] divide-y divide-border/60 overflow-y-auto rounded-xl border border-border/70 bg-card",
              selected && "hidden lg:block",
            )}
          >
            {messages.length === 0 && (
              <li className="flex flex-col items-center gap-2 px-6 py-16 text-center text-sm text-muted-foreground">
                <Inbox className="h-8 w-8 opacity-40" />
                {filter === "archived" ? "Nothing archived." : "No messages yet."}
              </li>
            )}
            {messages.map((m) => (
              <li key={m.id}>
                <button
                  onClick={() => select(m.id)}
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-3.5 text-left transition-colors hover:bg-surface/70",
                    m.id === selectedId && "bg-gold/8",
                  )}
                >
                  <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", m.status === "new" ? "bg-gold" : "bg-transparent")} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <p className={cn("truncate text-sm", m.status === "new" ? "font-semibold" : "font-medium")}>{m.name}</p>
                      <p className="shrink-0 text-[11px] text-muted-foreground">
                        {formatDistanceToNow(new Date(m.created_at), { addSuffix: true })}
                      </p>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-sm text-muted-foreground">{m.message}</p>
                  </div>
                </button>
              </li>
            ))}
          </ul>

          {selected ? (
            <MessageView
              message={selected}
              onBack={() => select(undefined)}
              onStatus={(status) => update(() => setSubmissionStatus(selected.id, status))}
              onDelete={() =>
                update(async () => {
                  if (!window.confirm("Delete this message permanently?")) return;
                  await deleteSubmission(selected.id);
                  select(undefined);
                })
              }
            />
          ) : (
            <div className="hidden items-center justify-center rounded-xl border border-dashed border-border text-sm text-muted-foreground lg:flex">
              Select a message to read it
            </div>
          )}
        </div>
      )}
    </>
  );
}

function MessageView({
  message: m,
  onBack,
  onStatus,
  onDelete,
}: {
  message: ContactSubmission;
  onBack: () => void;
  onStatus: (status: ContactSubmission["status"]) => void;
  onDelete: () => void;
}) {
  const btn =
    "inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-gold/40 hover:text-foreground";
  const replySubject = encodeURIComponent("Re: Your enquiry to Tujenge Solutions");

  return (
    <article className="rounded-xl border border-border/70 bg-card p-6">
      <button onClick={onBack} className="mb-4 text-sm text-muted-foreground hover:text-gold lg:hidden">
        ← All messages
      </button>
      <header className="flex flex-col gap-4 border-b border-border/60 pb-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gold/15 font-heading font-bold uppercase text-gold">
            {m.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <h2 className="truncate font-heading text-lg font-semibold">{m.name}</h2>
            <p className="text-xs text-muted-foreground">{format(new Date(m.created_at), "EEE d MMM yyyy, HH:mm")}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <a href={`mailto:${m.email}?subject=${replySubject}`} className={cn(btn, "border-gold/40 bg-gold/10 text-gold hover:text-gold")}>
            <Reply className="h-4 w-4" /> Reply
          </a>
          {m.status === "archived" ? (
            <button onClick={() => onStatus("read")} className={btn}>
              <ArchiveRestore className="h-4 w-4" /> Restore
            </button>
          ) : (
            <button onClick={() => onStatus("archived")} className={btn}>
              <Archive className="h-4 w-4" /> Archive
            </button>
          )}
          {m.status === "read" && (
            <button onClick={() => onStatus("new")} className={btn} title="Mark unread">
              <MailOpen className="h-4 w-4" />
            </button>
          )}
          <button onClick={onDelete} className={cn(btn, "hover:border-destructive/40 hover:text-destructive")} title="Delete">
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </header>

      <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-gold" />
          <a href={`mailto:${m.email}`} className="hover:text-gold hover:underline">
            {m.email}
          </a>
        </div>
        {m.phone && (
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gold" />
            <a href={`tel:${m.phone.replace(/\s/g, "")}`} className="hover:text-gold hover:underline">
              {m.phone}
            </a>
          </div>
        )}
      </dl>

      <p className="mt-6 whitespace-pre-wrap text-[15px] leading-relaxed text-foreground">{m.message}</p>
    </article>
  );
}
