import { Link } from "@tanstack/react-router";
import { services } from "../lib/services-data";
import { ArrowUpRight } from "lucide-react";

const socialLinks = [
  { label: "Twitter / X", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "Instagram", href: "#" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-surface">
      <div className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand column */}
          <div className="md:col-span-5">
            <Link to="/" className="font-heading text-2xl font-bold">
              <span className="text-gradient-gold">N5</span>
              <span className="text-foreground"> Labs</span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              We craft digital products that help businesses in Kenya and beyond
              scale revenue, automate operations, and dominate their markets.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="inline-flex items-center gap-1 rounded-lg border border-border/50 px-3 py-2 text-xs font-medium text-muted-foreground transition-all hover:border-gold/30 hover:text-gold"
                >
                  {s.label}
                  <ArrowUpRight className="h-3 w-3" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-gold">
              Services
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
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
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-gold">
              Company
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
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
          <div className="md:col-span-2">
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-widest text-gold">
              Get in Touch
            </h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>hello@n5labs.co.ke</li>
              <li>+254 700 000 000</li>
              <li>Nairobi, Kenya 🇰🇪</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} N5 Labs. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
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
