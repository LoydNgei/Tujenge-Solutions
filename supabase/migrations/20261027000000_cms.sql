-- Tujenge Solutions CMS schema.
-- Run once in the Supabase SQL editor (or `supabase db push`), then add your admin email at the bottom.

-- ---------------------------------------------------------------------------
-- Admins: only emails listed here can edit content. Manage via the SQL editor.
-- ---------------------------------------------------------------------------
create table if not exists public.admins (
  email text primary key
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admins
    where lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Content tables
-- ---------------------------------------------------------------------------
create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  tagline text not null default '',
  description text not null default '',
  icon text not null default 'Code',
  image_url text,
  features text[] not null default '{}',
  details jsonb not null default '[]',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  client text not null default '',
  category text not null default '',
  description text not null default '',
  highlights text[] not null default '{}',
  results text[] not null default '{}',
  tags text[] not null default '{}',
  color text not null default 'from-blue-600/80 to-indigo-800/90',
  image_url text,
  live_url text,
  featured boolean not null default true,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.team_members (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null default '',
  bio text not null default '',
  photo_url text,
  github text,
  linkedin text,
  twitter text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Single row holding page copy (hero, CTA, about, contact details, ...).
create table if not exists public.site_settings (
  id int primary key default 1 check (id = 1),
  data jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320),
  phone text check (phone is null or char_length(phone) <= 50),
  message text not null check (char_length(message) between 1 and 5000),
  status text not null default 'new' check (status in ('new', 'read', 'archived')),
  notified_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists contact_submissions_created_at_idx
  on public.contact_submissions (created_at desc);

drop trigger if exists services_touch on public.services;
create trigger services_touch before update on public.services
  for each row execute function public.touch_updated_at();
drop trigger if exists projects_touch on public.projects;
create trigger projects_touch before update on public.projects
  for each row execute function public.touch_updated_at();
drop trigger if exists team_members_touch on public.team_members;
create trigger team_members_touch before update on public.team_members
  for each row execute function public.touch_updated_at();
drop trigger if exists site_settings_touch on public.site_settings;
create trigger site_settings_touch before update on public.site_settings
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- Row level security
-- ---------------------------------------------------------------------------
alter table public.admins enable row level security;
alter table public.services enable row level security;
alter table public.projects enable row level security;
alter table public.team_members enable row level security;
alter table public.site_settings enable row level security;
alter table public.contact_submissions enable row level security;

grant select on public.services, public.projects, public.team_members, public.site_settings to anon, authenticated;
grant insert, update, delete on public.services, public.projects, public.team_members, public.site_settings to authenticated;
grant insert on public.contact_submissions to anon, authenticated;
grant select, update, delete on public.contact_submissions to authenticated;
grant select on public.admins to authenticated;

drop policy if exists "admins can see themselves" on public.admins;
create policy "admins can see themselves" on public.admins
  for select to authenticated using (public.is_admin());

-- Visitors see published rows; admins see everything and can write.
drop policy if exists "read published services" on public.services;
create policy "read published services" on public.services
  for select using (published or public.is_admin());
drop policy if exists "admins manage services" on public.services;
create policy "admins manage services" on public.services
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "read published projects" on public.projects;
create policy "read published projects" on public.projects
  for select using (published or public.is_admin());
drop policy if exists "admins manage projects" on public.projects;
create policy "admins manage projects" on public.projects
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "read published team" on public.team_members;
create policy "read published team" on public.team_members
  for select using (published or public.is_admin());
drop policy if exists "admins manage team" on public.team_members;
create policy "admins manage team" on public.team_members
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

drop policy if exists "read settings" on public.site_settings;
create policy "read settings" on public.site_settings
  for select using (true);
drop policy if exists "admins manage settings" on public.site_settings;
create policy "admins manage settings" on public.site_settings
  for all to authenticated using (public.is_admin()) with check (public.is_admin());

-- Anyone can submit the contact form; only admins can read it.
drop policy if exists "anyone can submit contact" on public.contact_submissions;
create policy "anyone can submit contact" on public.contact_submissions
  for insert to anon, authenticated
  with check (status = 'new' and notified_at is null);
drop policy if exists "admins read contact" on public.contact_submissions;
create policy "admins read contact" on public.contact_submissions
  for select to authenticated using (public.is_admin());
drop policy if exists "admins update contact" on public.contact_submissions;
create policy "admins update contact" on public.contact_submissions
  for update to authenticated using (public.is_admin()) with check (public.is_admin());
drop policy if exists "admins delete contact" on public.contact_submissions;
create policy "admins delete contact" on public.contact_submissions
  for delete to authenticated using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Image storage
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media public read" on storage.objects;
create policy "media public read" on storage.objects
  for select using (bucket_id = 'media');
drop policy if exists "media admin insert" on storage.objects;
create policy "media admin insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'media' and public.is_admin());
drop policy if exists "media admin update" on storage.objects;
create policy "media admin update" on storage.objects
  for update to authenticated using (bucket_id = 'media' and public.is_admin());
drop policy if exists "media admin delete" on storage.objects;
create policy "media admin delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media' and public.is_admin());

-- ---------------------------------------------------------------------------
-- Add your admin login email(s) here, then create the same user under
-- Authentication > Users in the Supabase dashboard.
-- ---------------------------------------------------------------------------
-- insert into public.admins (email) values ('you@example.com') on conflict do nothing;
