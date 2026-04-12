import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link to="/" className="font-heading text-xl font-bold">
              <span className="text-gradient-gold">N5</span>
              <span className="text-foreground"> Labs</span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              We build digital experiences that help businesses in Kenya and beyond scale revenue, automate operations, and dominate their markets.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Services</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services" className="transition-colors hover:text-gold">Web Development</Link></li>
              <li><Link to="/services" className="transition-colors hover:text-gold">AI Automation</Link></li>
              <li><Link to="/services" className="transition-colors hover:text-gold">SEO & Marketing</Link></li>
              <li><Link to="/services" className="transition-colors hover:text-gold">Custom Systems</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-foreground">Company</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/about" className="transition-colors hover:text-gold">About Us</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-gold">Contact</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/50 pt-8 md:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} N5 Labs. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Nairobi, Kenya 🇰🇪
          </p>
        </div>
      </div>
    </footer>
  );
}
