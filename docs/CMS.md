# Content management (CMS)

The website's content (page copy, services, projects, team, contact details) is stored in Supabase and edited at **`/admin`**. Changes go live as soon as you save. You don't need to redeploy.

If Supabase isn't configured, the site still renders using the built-in copy in `src/lib/cms/defaults.ts`.

## One-time setup

### 1. Create the database

1. Create a project at [supabase.com](https://supabase.com) (the free tier is enough).
2. Open **SQL Editor**, paste in `supabase/migrations/20261027000000_cms.sql` and run it.
3. Add your admin email in the same SQL editor:
   ```sql
   insert into public.admins (email) values ('you@example.com');
   ```
4. Go to **Authentication > Users > Add user**, create a user with that email and a password, and tick "Auto confirm".
5. Under **Authentication > Sign In / Providers**, turn off **Allow new users to sign up**. Only admins listed in `admins` can edit anything, but this keeps strangers from creating accounts.
6. Under **Authentication > URL Configuration**, set the Site URL to your live domain, for example `https://tujengesolutions.com`. Password-reset links depend on it.

### 2. Connect the site

Copy `.env.example` to `.env.local` and fill in the values from **Project Settings > API**:

```
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=...
```

Add the same two variables in **Vercel > Project > Settings > Environment Variables**, then redeploy once.

### 3. Import the current content

Sign in at `/admin`. Because the database is empty, the dashboard shows an **Import content** button. Click it to copy everything currently on the site, including images, into the CMS.

### 4. Email notifications for the contact form (optional but recommended)

Every contact form submission is saved to **Inbox** in the admin. To also get an email for each one:

1. Create a [Resend](https://resend.com) account and an API key. To send from your own domain (for example `website@tujengesolutions.com`), verify the domain in Resend. Without that, Resend only delivers to the email address you signed up with.
2. Install the [Supabase CLI](https://supabase.com/docs/guides/cli), then from this repo run:
   ```sh
   supabase login
   supabase link --project-ref <your-project-ref>
   supabase secrets set RESEND_API_KEY=re_xxx NOTIFY_TO_EMAIL=inquiry@tujengesolutions.com NOTIFY_FROM_EMAIL="Tujenge Website <website@tujengesolutions.com>"
   supabase functions deploy notify-contact
   ```
   `NOTIFY_TO_EMAIL` can be a comma-separated list. `NOTIFY_FROM_EMAIL` is optional and defaults to Resend's test sender.

If the function isn't deployed, the form still works and messages still appear in the Inbox. You just won't get an email.

## What's editable where

| Admin page | Controls |
|---|---|
| Pages > Home | Hero text, buttons, stats and image; section headings; process steps; the call-to-action banner |
| Pages > Services & Projects pages | Header text on `/services` and `/projects` |
| Pages > About | Story paragraphs, mission/vision cards, team section intro |
| Pages > Contact & Footer | Email, phone, location, WhatsApp number and message, footer blurb, social links |
| Services | Each service and its order. The first four show on the homepage. |
| Projects | Portfolio entries. **Featured** projects also show on the homepage. |
| Team | Team members on the About page |
| Inbox | Contact form submissions |

Anything can be hidden without being deleted (the eye icon or the **Published** switch). Images are resized automatically on upload.

## How it works

- `src/lib/cms/content.ts` fetches published content in one go, caches it in `localStorage` so repeat visits render instantly, and refreshes it in the background.
- Security is enforced in the database: anyone can read published content and submit the contact form, and only emails in `admins` can write. The anon key in the frontend can't change content.
- Images live in the public `media` storage bucket.
