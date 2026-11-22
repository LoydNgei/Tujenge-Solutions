import { useState, type FormEvent } from "react";
import { createFileRoute, Navigate } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { db, useSession } from "@/lib/cms/admin";
import { inputClass } from "@/components/admin/fields";

export const Route = createFileRoute("/admin/login")({
  component: LoginPage,
});

function LoginPage() {
  const session = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  // Arriving from a password-reset email: Supabase signs in with a recovery session.
  const [recovering] = useState(() => window.location.hash.includes("type=recovery"));
  const [newPassword, setNewPassword] = useState("");
  const [passwordSet, setPasswordSet] = useState(false);

  if (session && (!recovering || passwordSet)) return <Navigate to="/admin" />;

  async function handleNewPassword(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await db().auth.updateUser({ password: newPassword });
    setLoading(false);
    if (error) setError(error.message);
    else setPasswordSet(true);
  }

  if (recovering) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <form onSubmit={handleNewPassword} className="w-full max-w-sm space-y-4 rounded-xl border border-border/70 bg-card p-7">
          <h1 className="font-heading text-xl font-extrabold">Choose a new password</h1>
          <input
            type="password"
            required
            minLength={8}
            autoComplete="new-password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className={inputClass}
            placeholder="At least 8 characters"
          />
          {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={loading || !session}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Save password
          </button>
        </form>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const { error } = await db().auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) setError(error.message);
  }

  async function sendReset() {
    if (!email) {
      setError("Enter your email first.");
      return;
    }
    const { error } = await db().auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/admin/login`,
    });
    if (error) setError(error.message);
    else setResetSent(true);
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-gold/15 blur-[120px]" />
      <div className="relative w-full max-w-sm">
        <div className="mb-8 text-center">
          <p className="font-heading text-2xl font-bold">
            <span className="text-gold">Tujenge</span> Solutions
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Sign in to manage your website</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border/70 bg-card p-7">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-sm font-medium">Email</label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium">Password</label>
              <button type="button" onClick={sendReset} className="text-xs text-muted-foreground hover:text-gold">
                Forgot password?
              </button>
            </div>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && <p className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">{error}</p>}
          {resetSent && (
            <p className="rounded-lg bg-gold/10 px-3 py-2 text-sm text-gold">Check your email for a password reset link.</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
