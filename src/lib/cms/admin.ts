import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { Session } from "@supabase/supabase-js";
import { MEDIA_BUCKET, supabase } from "../supabase";
import { CONTENT_QUERY_KEY } from "./content";
import { defaultContent } from "./defaults";
import {
  projectFromRow,
  projectToRow,
  serviceFromRow,
  serviceToRow,
  teamFromRow,
  teamToRow,
} from "./mappers";
import type { Project, Service, SiteSettings, TeamMember } from "./types";
import type { ContactSubmission } from "./contact";

/** Throws when Supabase isn't configured; admin pages render a setup notice instead. */
export function db() {
  if (!supabase) throw new Error("Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.");
  return supabase;
}

// ---------------------------------------------------------------------------
// Auth
// ---------------------------------------------------------------------------

/** undefined while loading, null when signed out. */
export function useSession() {
  const [session, setSession] = useState<Session | null | undefined>(supabase ? undefined : null);

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => setSession(data.session));
    const { data } = supabase.auth.onAuthStateChange((_event, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  return session;
}

export function useIsAdmin(session: Session | null | undefined) {
  return useQuery({
    queryKey: ["admin", "is-admin", session?.user.id],
    enabled: !!session,
    queryFn: async () => {
      const { data, error } = await db().rpc("is_admin");
      if (error) throw error;
      return data === true;
    },
  });
}

// ---------------------------------------------------------------------------
// Collections (services, projects, team)
// ---------------------------------------------------------------------------

type CollectionConfig<T> = {
  table: string;
  fromRow: (row: Record<string, unknown>) => T;
  toRow: (item: T) => Record<string, unknown>;
};

type ItemMap = { services: Service; projects: Project; team: TeamMember };
export type CollectionKey = keyof ItemMap;
export type ItemOf<K extends CollectionKey> = ItemMap[K];

const collections: { [K in CollectionKey]: CollectionConfig<ItemMap[K]> } = {
  services: { table: "services", fromRow: serviceFromRow, toRow: serviceToRow },
  projects: { table: "projects", fromRow: projectFromRow, toRow: projectToRow },
  team: { table: "team_members", fromRow: teamFromRow, toRow: teamToRow },
};

const config = <K extends CollectionKey>(key: K) => collections[key] as CollectionConfig<ItemMap[K]>;

export function useCollection<K extends CollectionKey>(key: K) {
  return useQuery({
    queryKey: ["admin", key],
    queryFn: async () => {
      const { table, fromRow } = config(key);
      const { data, error } = await db().from(table).select("*").order("sort_order").order("created_at");
      if (error) throw error;
      return data.map((row) => fromRow(row));
    },
  });
}

export function useCollectionItem<K extends CollectionKey>(key: K, id: string) {
  return useQuery({
    queryKey: ["admin", key, id],
    enabled: id !== "new",
    queryFn: async () => {
      const { table, fromRow } = config(key);
      const { data, error } = await db().from(table).select("*").eq("id", id).single();
      if (error) throw error;
      return fromRow(data);
    },
  });
}

/** Inserts when the item has no id, otherwise updates. Returns the saved id. */
export async function saveItem<K extends CollectionKey>(key: K, item: ItemOf<K>): Promise<string> {
  const { table, toRow } = config(key);
  const row = toRow(item);
  if (item.id) {
    const { error } = await db().from(table).update(row).eq("id", item.id);
    if (error) throw error;
    return item.id;
  }
  const { data, error } = await db().from(table).insert(row).select("id").single();
  if (error) throw error;
  return data.id as string;
}

export async function deleteItem(key: CollectionKey, id: string) {
  const { error } = await db().from(collections[key].table).delete().eq("id", id);
  if (error) throw error;
}

export async function setPublished(key: CollectionKey, id: string, published: boolean) {
  const { error } = await db().from(collections[key].table).update({ published }).eq("id", id);
  if (error) throw error;
}

/** Persist a new order: each id's index becomes its sort_order. */
export async function reorderItems(key: CollectionKey, ids: string[]) {
  const table = collections[key].table;
  const results = await Promise.all(
    ids.map((id, index) => db().from(table).update({ sort_order: index }).eq("id", id)),
  );
  const failed = results.find((r) => r.error);
  if (failed?.error) throw failed.error;
}

/** Refresh admin lists and the public site after any write. */
export function useInvalidate() {
  const queryClient = useQueryClient();
  return () =>
    Promise.all([
      queryClient.invalidateQueries({ queryKey: ["admin"] }),
      queryClient.invalidateQueries({ queryKey: CONTENT_QUERY_KEY }),
    ]);
}

// ---------------------------------------------------------------------------
// Site settings
// ---------------------------------------------------------------------------

export function useStoredSettings() {
  return useQuery({
    queryKey: ["admin", "settings"],
    queryFn: async () => {
      const { data, error } = await db().from("site_settings").select("data").eq("id", 1).maybeSingle();
      if (error) throw error;
      return (data?.data ?? null) as Partial<SiteSettings> | null;
    },
  });
}

export async function saveSettings(settings: SiteSettings) {
  const { error } = await db().from("site_settings").upsert({ id: 1, data: settings });
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Inbox
// ---------------------------------------------------------------------------

export function useInbox() {
  return useQuery({
    queryKey: ["admin", "inbox"],
    queryFn: async () => {
      const { data, error } = await db()
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) throw error;
      return data as ContactSubmission[];
    },
  });
}

export async function setSubmissionStatus(id: string, status: ContactSubmission["status"]) {
  const { error } = await db().from("contact_submissions").update({ status }).eq("id", id);
  if (error) throw error;
}

export async function deleteSubmission(id: string) {
  const { error } = await db().from("contact_submissions").delete().eq("id", id);
  if (error) throw error;
}

// ---------------------------------------------------------------------------
// Images
// ---------------------------------------------------------------------------

const MAX_IMAGE_SIZE = 2000;

/** Downscale and re-encode large photos as WebP; SVG/GIF pass through untouched. */
async function compressImage(file: Blob): Promise<Blob> {
  if (!file.type.startsWith("image/") || file.type === "image/svg+xml" || file.type === "image/gif") return file;
  try {
    const bitmap = await createImageBitmap(file);
    const scale = Math.min(1, MAX_IMAGE_SIZE / Math.max(bitmap.width, bitmap.height));
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(bitmap.width * scale);
    canvas.height = Math.round(bitmap.height * scale);
    canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/webp", 0.85));
    return blob && blob.size < file.size ? blob : file;
  } catch {
    return file;
  }
}

function extensionFor(type: string) {
  return { "image/webp": "webp", "image/png": "png", "image/jpeg": "jpg", "image/svg+xml": "svg", "image/gif": "gif" }[type] ?? "bin";
}

/** Uploads to the public media bucket and returns its URL. */
export async function uploadImage(file: Blob, folder: string, name = "image"): Promise<string> {
  const blob = await compressImage(file);
  const safeName = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40) || "image";
  const path = `${folder}/${Date.now()}-${safeName}.${extensionFor(blob.type)}`;
  const { error } = await db().storage.from(MEDIA_BUCKET).upload(path, blob, {
    contentType: blob.type,
    cacheControl: "31536000",
  });
  if (error) throw error;
  return db().storage.from(MEDIA_BUCKET).getPublicUrl(path).data.publicUrl;
}

// ---------------------------------------------------------------------------
// First-run import of the site's built-in content
// ---------------------------------------------------------------------------

async function importAsset(url: string | null, folder: string, name: string) {
  if (!url) return null;
  const res = await fetch(url);
  if (!res.ok) return null;
  return uploadImage(await res.blob(), folder, name);
}

export async function importDefaultContent(onProgress?: (message: string) => void) {
  const report = (m: string) => onProgress?.(m);

  report("Uploading service images...");
  const services = await Promise.all(
    defaultContent.services.map(async (s) => ({ ...s, imageUrl: await importAsset(s.imageUrl, "services", s.slug) })),
  );
  report("Saving services...");
  for (const s of services) await saveItem("services", s);

  report("Uploading project images...");
  const projects = await Promise.all(
    defaultContent.projects.map(async (p) => ({ ...p, imageUrl: await importAsset(p.imageUrl, "projects", p.slug) })),
  );
  report("Saving projects...");
  for (const p of projects) await saveItem("projects", p);

  report("Uploading team photos...");
  const team = await Promise.all(
    defaultContent.team.map(async (m) => ({ ...m, photoUrl: await importAsset(m.photoUrl, "team", m.name) })),
  );
  report("Saving team...");
  for (const m of team) await saveItem("team", m);

  report("Saving page content...");
  const heroImage = await importAsset(defaultContent.settings.hero.imageUrl, "pages", "hero");
  await saveSettings({ ...defaultContent.settings, hero: { ...defaultContent.settings.hero, imageUrl: heroImage } });
}
