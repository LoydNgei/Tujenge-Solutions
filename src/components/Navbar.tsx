import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="font-heading text-xl font-bold tracking-tight">
          <span className="text-gradient-gold">N5</span>
          <span className="text-foreground"> Labs</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium transition-colors hover:text-gold ${
                location.pathname === link.to ? "text-gold" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/contact"
            className="rounded-lg bg-gradient-gold px-5 py-2 text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
          >
            Get Started
          </Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-foreground md:hidden"
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-border/50 bg-background md:hidden"
          >
            <div className="flex flex-col gap-1 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors hover:bg-surface ${
                    location.pathname === link.to ? "text-gold" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-2 rounded-lg bg-gradient-gold px-5 py-3 text-center text-sm font-semibold text-primary-foreground"
              >
                Get Started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
