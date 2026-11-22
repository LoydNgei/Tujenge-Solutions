import { Outlet, Link, createRootRoute, HeadContent, useLocation } from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import { WhatsAppButton } from "../components/WhatsAppButton";
import { loadContent } from "../lib/cms/content";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-extrabold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">
          Page not found
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Tujenge Solutions — Digital Solutions for Kenyan Businesses" },
      { name: "description", content: "Tujenge Solutions builds powerful digital platforms, web applications, and business systems for SMEs and businesses across Kenya." },
      { name: "author", content: "Tujenge Solutions" },
      { property: "og:title", content: "Tujenge Solutions — Digital Solutions for Kenya" },
      { property: "og:description", content: "We build smart, scalable digital solutions for businesses across Kenya." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:site", content: "@tujengesolutions" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600..800&family=Figtree:wght@400..700&display=swap",
      },
    ],
  }),
  // Public pages render once site content is available (instant when cached).
  loader: ({ location }) => (isAdminPath(location.pathname) ? null : loadContent()),
  pendingComponent: () => (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
    </div>
  ),
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function isAdminPath(pathname: string) {
  return pathname === "/admin" || pathname.startsWith("/admin/");
}

// This is a client-rendered SPA mounted into index.html, so there's no
// <html>/<body> shell here: rendering one inside #root makes React 19 adopt
// the document's real <html>/<body> and hang on input selection events.
// React hoists the title/meta tags from HeadContent into <head>.
function RootComponent() {
  const { pathname } = useLocation();
  if (isAdminPath(pathname)) {
    return (
      <>
        <HeadContent />
        <Outlet />
      </>
    );
  }

  return (
    <>
      <HeadContent />
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </>
  );
}
