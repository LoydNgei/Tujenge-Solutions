import { Link } from "@tanstack/react-router";
import { services } from "../lib/services-data";
import { ArrowUpRight } from "lucide-react";

const socialLinks = [
  { label: "LinkedIn", href: "#" },
  { label: "X", href: "#" },
  { label: "Instagram", href: "#" },
  { label: "TikTok", href: "#"},
];

export function Footer() {
  return (
    <footer className="border-t border-border/60 bg-surface shadow-warm">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 md:grid-cols-12">
          {/* Brand column */}
          <div className="md:col-span-4">
            <Link to="/" className="font-heading text-xl font-bold">
              <span className="text-gradient-gold">Tujenge</span>
              <span className="text-foreground"> Solutions</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Building smart, scalable digital solutions for SMEs and businesses
              across Kenya. Your growth is our mission.
            </p>
            <div className="mt-5 flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="inline-flex items-center gap-1 rounded-lg border border-border/60 px-2.5 py-1.5 text-[10px] font-medium text-muted-foreground transition-all hover:border-gold/40 hover:text-gold"
                >
                  {s.label}
                  <ArrowUpRight className="h-2.5 w-2.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-gold">
              Services
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              {services.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link
                    to="/services/$slug"
                    params={{ slug: s.slug }}
                    className="transition-colors hover:text-gold"
                  >
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-gold">
              Company
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/about" className="transition-colors hover:text-gold">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/projects" className="transition-colors hover:text-gold">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-gold">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="mb-4 text-[10px] font-semibold uppercase tracking-widest text-gold">
              Get in Touch
            </h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>inquiry@tujengesolutions.com</li>
              <li>+254 786 379 020</li>
              <li>Nairobi, Kenya</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 md:flex-row">
          <p className="text-[11px] text-muted-foreground">
            © {new Date().getFullYear()} Tujenge Solutions. All rights reserved.
          </p>
          <div className="flex gap-6 text-[11px] text-muted-foreground">
            <span className="cursor-pointer transition-colors hover:text-gold">
              Privacy Policy
            </span>
            <span className="cursor-pointer transition-colors hover:text-gold">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
