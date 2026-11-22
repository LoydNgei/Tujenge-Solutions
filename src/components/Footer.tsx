import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useServices, useSettings } from "../lib/cms/content";

const linkClass = "transition-colors hover:text-white hover:underline underline-offset-4";

export function Footer() {
  const services = useServices();
  const { footer, contact } = useSettings();

  return (
    <footer className="bg-deep text-deep-foreground/70">
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-10">
        <div className="grid gap-10 md:grid-cols-12">
          {/* Brand column */}
          <div className="md:col-span-4">
            <Link to="/" className="font-heading text-2xl font-extrabold tracking-tight text-white">
              Tujenge<span className="font-semibold text-white/60"> Solutions</span>
            </Link>
            <p className="mt-4 max-w-sm text-base">{footer.blurb}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {footer.socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-lg border border-white/20 px-3 py-1.5 text-sm font-semibold text-white transition-colors hover:border-white hover:bg-white hover:text-deep"
                >
                  {s.label}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-3">
            <h4 className="mb-4 font-heading text-lg font-bold text-white">Services</h4>
            <ul className="space-y-2.5 text-base">
              {services.slice(0, 5).map((s) => (
                <li key={s.slug}>
                  <Link to="/services/$slug" params={{ slug: s.slug }} className={linkClass}>
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="md:col-span-2">
            <h4 className="mb-4 font-heading text-lg font-bold text-white">Company</h4>
            <ul className="space-y-2.5 text-base">
              <li>
                <Link to="/about" className={linkClass}>About us</Link>
              </li>
              <li>
                <Link to="/projects" className={linkClass}>Projects</Link>
              </li>
              <li>
                <Link to="/contact" className={linkClass}>Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3">
            <h4 className="mb-4 font-heading text-lg font-bold text-white">Get in touch</h4>
            <ul className="space-y-2.5 text-base">
              {contact.email && (
                <li>
                  <a href={`mailto:${contact.email}`} className={linkClass}>
                    {contact.email}
                  </a>
                </li>
              )}
              {contact.phone && (
                <li>
                  <a href={`tel:${contact.phone.replace(/\s/g, "")}`} className={linkClass}>
                    {contact.phone}
                  </a>
                </li>
              )}
              {contact.location && <li>{contact.location}</li>}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/15 pt-6 text-sm md:flex-row">
          <p>© {new Date().getFullYear()} Tujenge Solutions. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="cursor-pointer hover:text-white">Privacy policy</span>
            <span className="cursor-pointer hover:text-white">Terms of service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
