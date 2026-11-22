import { createFileRoute, Navigate, Outlet, useLocation } from "@tanstack/react-router";
import { Loader2, ShieldAlert } from "lucide-react";
import { Toaster } from "@/components/ui/sonner";
import { AdminShell } from "@/components/admin/AdminShell";
import { db, useIsAdmin, useSession } from "@/lib/cms/admin";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/admin")({
  component: AdminLayout,
  head: () => ({
    meta: [{ title: "Admin — Tujenge Solutions" }, { name: "robots", content: "noindex, nofollow" }],
  }),
});

function AdminLayout() {
  return (
    <>
      <AdminGate />
      <Toaster position="top-right" richColors />
    </>
  );
}

function AdminGate() {
  const { pathname } = useLocation();
  const session = useSession();
  const isAdmin = useIsAdmin(session);
  const onLogin = pathname.startsWith("/admin/login");

  if (!supabase) return <SetupNotice />;
  if (onLogin) return <Outlet />;
  if (session === undefined || (session && isAdmin.isPending)) return <FullScreenSpinner />;
  if (!session) return <Navigate to="/admin/login" />;

  if (!isAdmin.data) {
    return (
      <CenteredCard>
        <ShieldAlert className="mx-auto h-10 w-10 text-gold" />
        <h1 className="mt-4 font-heading text-xl font-extrabold">No admin access</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {session.user.email} is signed in but isn't listed as an admin. Add this email to the <code>admins</code> table
          in Supabase.
        </p>
        <button
          onClick={() => db().auth.signOut()}
          className="mt-6 rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
        >
          Sign out
        </button>
      </CenteredCard>
    );
  }

  return (
    <AdminShell session={session}>
      <Outlet />
    </AdminShell>
  );
}

function FullScreenSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Loader2 className="h-6 w-6 animate-spin text-gold" />
    </div>
  );
}

export function CenteredCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm rounded-xl border border-border/70 bg-card p-8 text-center">{children}</div>
    </div>
  );
}

function SetupNotice() {
  return (
    <CenteredCard>
      <h1 className="font-heading text-xl font-extrabold">CMS not connected</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Set <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> in your environment, then restart. See{" "}
        <code>docs/CMS.md</code>.
      </p>
    </CenteredCard>
  );
}
