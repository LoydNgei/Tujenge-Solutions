import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const key = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY) as
  | string
  | undefined;

/** Null when the env vars aren't set; the site then renders its built-in content. */
export const supabase = url && key ? createClient(url, key) : null;

export const MEDIA_BUCKET = "media";
