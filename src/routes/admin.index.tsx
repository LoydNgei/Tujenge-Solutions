import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { ArrowRight, DownloadCloud, FileText, FolderKanban, Inbox, Loader2, Sparkles, Users } from "lucide-react";
import { toast } from "sonner";
import { PageHeader } from "@/components/admin/fields";
import {
  importDefaultContent,
  useCollection,
  useInbox,
  useInvalidate,
  useSession,
  useStoredSettings,
} from "@/lib/cms/admin";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const session = useSession();
  const services = useCollection("services");
  const projects = useCollection("projects");
  const team = useCollection("team");
  const settings = useStoredSettings();
  const inbox = useInbox();

  const loaded = services.isSuccess && projects.isSuccess && team.isSuccess && settings.isSuccess;
  const empty =
    loaded && !services.data.length && !projects.data.length && !team.data.length && !settings.data;
  const unread = inbox.data?.filter((m) => m.status === "new") ?? [];

  const cards = [
    { to: "/admin/pages", label: "Pages", value: "Pages", icon: FileText, hint: "Hero, about, contact & more" },
    { to: "/admin/services", label: "Services", value: services.data?.length, icon: Sparkles },
    { to: "/admin/projects", label: "Projects", value: projects.data?.length, icon: FolderKanban },
    { to: "/admin/team", label: "Team", value: team.data?.length, icon: Users },
  ] as const;

  const firstName = session?.user.email?.split("@")[0];

  return (
    <>
      <PageHeader
        title={<>Welcome back{firstName ? `, ${firstName}` : ""}</>}
        description="Edit anything below. Changes go live on the website as soon as you save."
      />

      {empty && <ImportBanner />}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Link
            key={card.to}
            to={card.to}
            className="group rounded-xl border border-border/70 bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-gold/30"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/10">
                <card.icon className="h-5 w-5 text-gold" />
              </span>
              <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-gold" />
            </div>
            <p className="mt-4 font-heading text-2xl font-bold text-foreground">{card.value ?? "–"}</p>
            <p className="text-sm text-muted-foreground">{"hint" in card ? card.hint : card.label}</p>
          </Link>
        ))}
      </div>

      <section className="mt-8 rounded-xl border border-border/70 bg-card">
        <header className="flex items-center justify-between border-b border-border/60 px-6 py-4">
          <h2 className="flex items-center gap-2 font-heading font-semibold">
            <Inbox className="h-4 w-4 text-gold" /> Latest messages
            {unread.length > 0 && (
              <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-primary-foreground">
                {unread.length} new
              </span>
            )}
          </h2>
          <Link to="/admin/inbox" className="text-sm font-medium text-gold hover:underline">
            Open inbox
          </Link>
        </header>
        {inbox.data?.length ? (
          <ul className="divide-y divide-border/60">
            {inbox.data.slice(0, 5).map((m) => (
              <li key={m.id}>
                <Link
                  to="/admin/inbox"
                  search={{ id: m.id }}
                  className="flex items-start gap-4 px-6 py-4 transition-colors hover:bg-surface/60"
                >
                  <span className={`mt-2 h-2 w-2 shrink-0 rounded-full ${m.status === "new" ? "bg-gold" : "bg-transparent"}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-4">
                      <p className={`truncate text-sm ${m.status === "new" ? "font-semibold" : "font-medium"}`}>{m.name}</p>
                      <p className="shrink-0 text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(m.created_at), { addSuffix: true })}
                      </p>
                    </div>
                    <p className="truncate text-sm text-muted-foreground">{m.message}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="px-6 py-10 text-center text-sm text-muted-foreground">
            {inbox.isPending ? "Loading..." : "No messages yet. Contact form submissions will appear here."}
          </p>
        )}
      </section>
    </>
  );
}

function ImportBanner() {
  const invalidate = useInvalidate();
  const [progress, setProgress] = useState<string | null>(null);

  const run = async () => {
    try {
      await importDefaultContent(setProgress);
      await invalidate();
      toast.success("Website content imported", { description: "Everything is now editable here." });
    } catch (e) {
      toast.error("Import failed", { description: e instanceof Error ? e.message : undefined });
    } finally {
      setProgress(null);
    }
  };

  return (
    <div className="mb-8 flex flex-col gap-4 rounded-xl border border-gold/30 bg-gradient-to-br from-gold/10 via-card to-card p-6 sm:flex-row sm:items-center">
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gold/15">
        <DownloadCloud className="h-6 w-6 text-gold" />
      </span>
      <div className="flex-1">
        <h2 className="font-heading font-semibold">Import your current website content</h2>
        <p className="mt-0.5 text-sm text-muted-foreground">
          Your database is empty. Copy the services, projects, team and page text that's live today into the CMS so you can edit
          it.
        </p>
      </div>
      <button
        onClick={run}
        disabled={!!progress}
        className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-70"
      >
        {progress ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> {progress}
          </>
        ) : (
          "Import content"
        )}
      </button>
    </div>
  );
}
