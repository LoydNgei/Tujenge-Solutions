// Convert between database rows (snake_case) and app types (camelCase).
import { defaultSettings } from "./defaults";
import type { Project, Service, SiteSettings, TeamMember } from "./types";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Row = Record<string, any>;

export const serviceFromRow = (r: Row): Service => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  tagline: r.tagline ?? "",
  description: r.description ?? "",
  icon: r.icon ?? "Code",
  imageUrl: r.image_url ?? null,
  features: r.features ?? [],
  details: r.details ?? [],
  sortOrder: r.sort_order ?? 0,
  published: r.published ?? true,
});

export const serviceToRow = (s: Service) => ({
  slug: s.slug,
  title: s.title,
  tagline: s.tagline,
  description: s.description,
  icon: s.icon,
  image_url: s.imageUrl,
  features: s.features,
  details: s.details,
  sort_order: s.sortOrder,
  published: s.published,
});

export const projectFromRow = (r: Row): Project => ({
  id: r.id,
  slug: r.slug,
  title: r.title,
  client: r.client ?? "",
  category: r.category ?? "",
  description: r.description ?? "",
  highlights: r.highlights ?? [],
  results: r.results ?? [],
  tags: r.tags ?? [],
  color: r.color ?? "",
  imageUrl: r.image_url ?? null,
  liveUrl: r.live_url ?? null,
  featured: r.featured ?? true,
  sortOrder: r.sort_order ?? 0,
  published: r.published ?? true,
});

export const projectToRow = (p: Project) => ({
  slug: p.slug,
  title: p.title,
  client: p.client,
  category: p.category,
  description: p.description,
  highlights: p.highlights,
  results: p.results,
  tags: p.tags,
  color: p.color,
  image_url: p.imageUrl,
  live_url: p.liveUrl || null,
  featured: p.featured,
  sort_order: p.sortOrder,
  published: p.published,
});

export const teamFromRow = (r: Row): TeamMember => ({
  id: r.id,
  name: r.name,
  role: r.role ?? "",
  bio: r.bio ?? "",
  photoUrl: r.photo_url ?? null,
  github: r.github ?? null,
  linkedin: r.linkedin ?? null,
  twitter: r.twitter ?? null,
  sortOrder: r.sort_order ?? 0,
  published: r.published ?? true,
});

export const teamToRow = (m: TeamMember) => ({
  name: m.name,
  role: m.role,
  bio: m.bio,
  photo_url: m.photoUrl,
  github: m.github || null,
  linkedin: m.linkedin || null,
  twitter: m.twitter || null,
  sort_order: m.sortOrder,
  published: m.published,
});

/** Fill any section/field missing from stored settings with its default. */
export function mergeSettings(stored: Partial<SiteSettings> | null | undefined): SiteSettings {
  const merged = { ...defaultSettings } as Row;
  for (const [section, value] of Object.entries(stored ?? {})) {
    const base = (defaultSettings as Row)[section];
    if (base && typeof base === "object" && !Array.isArray(base) && value && typeof value === "object") {
      merged[section] = { ...base, ...value };
    } else if (base !== undefined) {
      merged[section] = value;
    }
  }
  if (stored?.about?.team) merged.about = { ...merged.about, team: { ...defaultSettings.about.team, ...stored.about.team } };
  return merged as SiteSettings;
}
