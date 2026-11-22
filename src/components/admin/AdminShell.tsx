import { useState, type ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ExternalLink,
  FileText,
  FolderKanban,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Sparkles,
  Users,
  X,
} from "lucide-react";
import type { Session } from "@supabase/supabase-js";
import { cn } from "@/lib/utils";
import { db, useInbox } from "@/lib/cms/admin";

const nav = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/pages", label: "Pages", icon: FileText },
  { to: "/admin/services", label: "Services", icon: Sparkles },
  { to: "/admin/projects", label: "Projects", icon: FolderKanban },
  { to: "/admin/team", label: "Team", icon: Users },
  { to: "/admin/inbox", label: "Inbox", icon: Inbox },
] as const;

export function AdminShell({ session, children }: { session: Session; children: ReactNode }) {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const unread = useInbox().data?.filter((m) => m.status === "new").length ?? 0;

  const isActive = (to: string, exact?: boolean) => (exact ? pathname === to || pathname === `${to}/` : pathname.startsWith(to));

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex h-16 items-center justify-between px-5">
        <Link to="/admin" className="font-heading text-lg font-bold">
          <span className="text-gold">Tujenge</span>
          <span className="ml-1.5 rounded-md bg-foreground px-1.5 py-0.5 align-middle text-[10px] font-semibold uppercase tracking-wider text-background">
            CMS
          </span>
        </Link>
        <button className="lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {nav.map((item) => {
          const active = isActive(item.to, "exact" in item && item.exact);
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                active ? "bg-gold/12 text-gold" : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <item.icon className="h-4 w-4" />
              <span className="flex-1">{item.label}</span>
              {item.to === "/admin/inbox" && unread > 0 && (
                <span className="rounded-full bg-gold px-2 py-0.5 text-[10px] font-bold text-primary-foreground">{unread}</span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-border/60 p-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <ExternalLink className="h-4 w-4" /> View website
        </a>
        <div className="flex items-center gap-3 rounded-lg px-3 py-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-xs font-bold uppercase text-gold">
            {session.user.email?.charAt(0)}
          </div>
          <p className="min-w-0 flex-1 truncate text-xs text-muted-foreground" title={session.user.email}>
            {session.user.email}
          </p>
          <button
            onClick={() => db().auth.signOut()}
            className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            aria-label="Sign out"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-border/60 bg-surface lg:block">{sidebar}</aside>

      {/* Mobile top bar + drawer */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border/60 bg-background/90 px-4 lg:hidden">
        <button onClick={() => setMobileOpen(true)} aria-label="Open menu">
          <Menu className="h-5 w-5" />
        </button>
        <span className="font-heading font-bold">
          <span className="text-gold">Tujenge</span> CMS
        </span>
        <span className="w-5" />
      </header>
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <aside className="absolute inset-y-0 left-0 w-72 bg-surface shadow-xl">{sidebar}</aside>
        </div>
      )}

      <main className="lg:pl-64">
        <div className="mx-auto max-w-5xl px-4 pb-32 pt-8 sm:px-8 lg:pt-12">{children}</div>
      </main>
    </div>
  );
}
