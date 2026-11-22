import { queryOptions, useQuery } from "@tanstack/react-query";
import { queryClient } from "../query-client";
import { supabase } from "../supabase";
import { defaultContent } from "./defaults";
import { mergeSettings, projectFromRow, serviceFromRow, teamFromRow } from "./mappers";
import type { SiteContent } from "./types";

export const CONTENT_QUERY_KEY = ["site-content"] as const;
const CACHE_KEY = "tujenge:content:v1";

async function fetchContent(): Promise<SiteContent> {
  if (!supabase) return defaultContent;

  const [services, projects, team, settings] = await Promise.all([
    supabase.from("services").select("*").eq("published", true).order("sort_order"),
    supabase.from("projects").select("*").eq("published", true).order("sort_order"),
    supabase.from("team_members").select("*").eq("published", true).order("sort_order"),
    supabase.from("site_settings").select("data").eq("id", 1).maybeSingle(),
  ]);
  const error = services.error ?? projects.error ?? team.error ?? settings.error;
  if (error) throw error;
  const serviceRows = services.data ?? [];
  const projectRows = projects.data ?? [];
  const teamRows = team.data ?? [];

  // A brand-new database: keep showing the built-in content until it's imported.
  if (!serviceRows.length && !projectRows.length && !teamRows.length && !settings.data) {
    return defaultContent;
  }

  const content: SiteContent = {
    services: serviceRows.map(serviceFromRow),
    projects: projectRows.map(projectFromRow),
    team: teamRows.map(teamFromRow),
    settings: mergeSettings(settings.data?.data),
  };
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(content));
  } catch {
    // Storage unavailable; the cache is only a speed-up.
  }
  return content;
}

function readCache(): SiteContent | undefined {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return undefined;
    const cached = JSON.parse(raw) as SiteContent;
    return { ...cached, settings: mergeSettings(cached.settings) };
  } catch {
    return undefined;
  }
}

/**
 * Returning visitors render instantly from the last cached copy while fresh
 * content loads in the background; first-time visitors wait for the fetch.
 */
export const contentQueryOptions = queryOptions({
  queryKey: CONTENT_QUERY_KEY,
  queryFn: fetchContent,
  initialData: readCache,
  initialDataUpdatedAt: 0,
  staleTime: 60_000,
  retry: 1,
});

/** For route loaders/head: resolves to content, never throws. */
export function loadContent(): Promise<SiteContent> {
  return queryClient.ensureQueryData(contentQueryOptions).catch(() => defaultContent);
}

export function useSiteContentQuery() {
  return useQuery(contentQueryOptions);
}

export function useContent(): SiteContent {
  return useSiteContentQuery().data ?? defaultContent;
}

export const useServices = () => useContent().services;
export const useProjects = () => useContent().projects;
export const useTeam = () => useContent().team;
export const useSettings = () => useContent().settings;
