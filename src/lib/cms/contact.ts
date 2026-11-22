import { supabase } from "../supabase";

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: "new" | "read" | "archived";
  created_at: string;
};

export async function submitContactForm(input: {
  name: string;
  email: string;
  phone: string | null;
  message: string;
}) {
  if (!supabase) throw new Error("Contact form is not configured");

  // The id is generated here because visitors can't read rows back under RLS.
  const id = crypto.randomUUID();
  const { error } = await supabase.from("contact_submissions").insert({ id, ...input });
  if (error) throw error;

  // Email notification is best-effort: the message is already saved to the inbox.
  supabase.functions.invoke("notify-contact", { body: { id } }).catch(() => {});
}
