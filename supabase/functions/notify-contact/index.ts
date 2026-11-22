// Emails a new contact form submission via Resend.
// The site inserts the row first, then calls this with its id. The row is
// claimed by setting notified_at, so each submission is emailed at most once.
//
// Secrets: RESEND_API_KEY, NOTIFY_TO_EMAIL, optional NOTIFY_FROM_EMAIL.
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  let id: unknown;
  try {
    ({ id } = await req.json());
  } catch {
    return json({ error: "Invalid body" }, 400);
  }
  if (typeof id !== "string") return json({ error: "Missing id" }, 400);

  const resendKey = Deno.env.get("RESEND_API_KEY");
  const to = Deno.env.get("NOTIFY_TO_EMAIL");
  if (!resendKey || !to) return json({ error: "Email notifications are not configured" }, 500);
  const from = Deno.env.get("NOTIFY_FROM_EMAIL") ?? "Tujenge Website <onboarding@resend.dev>";

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );

  // Only recent, un-notified submissions can be claimed.
  const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
  const { data: row, error } = await supabase
    .from("contact_submissions")
    .update({ notified_at: new Date().toISOString() })
    .eq("id", id)
    .is("notified_at", null)
    .gte("created_at", since)
    .select()
    .maybeSingle();

  if (error) return json({ error: error.message }, 500);
  if (!row) return json({ skipped: true });

  const html = `
    <h2>New enquiry from the website</h2>
    <p><strong>Name:</strong> ${escapeHtml(row.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(row.email)}</p>
    ${row.phone ? `<p><strong>Phone:</strong> ${escapeHtml(row.phone)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p style="white-space:pre-wrap">${escapeHtml(row.message)}</p>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${resendKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()),
      reply_to: row.email,
      subject: `New enquiry from ${row.name}`,
      html,
    }),
  });

  if (!res.ok) {
    // Release the claim so a retry can send it.
    await supabase.from("contact_submissions").update({ notified_at: null }).eq("id", id);
    return json({ error: `Resend error: ${await res.text()}` }, 502);
  }

  return json({ sent: true });
});
