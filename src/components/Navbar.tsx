import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { services } from "../lib/services-data";

const navConfig = [
  { label: "Home", to: "/", type: "link" },
  {
    label: "Services",
    to: "/services",
    type: "dropdown",
    menu: services.map((s) => ({
      label: s.title,
      to: "/services/$slug",
      params: { slug: s.slug },
    })),
  },
  { label: "Projects", to: "/projects", type: "link" },
  {
    label: "About",
    to: "/about",
    type: "dropdown",
    menu: [
      { label: "Our Story", to: "/about" },
      { label: "Our Team", to: "/about", hash: "team" },
    ],
  },
  { label: "Contact", to: "/contact", type: "link" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileOpenSection, setMobileOpenSection] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (to: string) => {
    if (to === "/" && location.pathname === "/") return true;
    if (to !== "/" && location.pathname.startsWith(to)) return true;
    return false;
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">
          {/* Logo */}
          <Link to="/" className="font-heading text-xl font-bold tracking-tight transition-transform hover:scale-105">
            <span className="text-gradient-gold">Tujenge</span>
            <span className="text-foreground"> Solutions</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center md:flex md:gap-8 lg:gap-12">
            {navConfig.map((item) => (
              <div key={item.label} className="group relative py-4">
                <Link
                  to={item.to as any}
                  className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${
                    isActive(item.to)
                      ? "text-gold"
                      : "text-muted-foreground hover:text-gold"
                  }`}
                >
                  {item.label}
                  {item.type === "dropdown" && (
                    <ChevronDown size={14} className="opacity-50 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {item.type === "dropdown" && (
                  <div className="pointer-events-none absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100">
                    <div className="min-w-[200px] overflow-hidden rounded-xl border border-border/60 bg-card p-2 shadow-warm-lg backdrop-blur-xl">
                      {item.menu?.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.to as any}
                          params={sub.params}
                          className="block rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-gold/10 hover:text-gold"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
            <Link
              to="/contact"
              className="rounded-xl bg-gradient-gold px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-warm transition-all hover:opacity-90"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="rounded-xl bg-surface p-2 text-foreground md:hidden shadow-warm"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[100] bg-background/60 backdrop-blur-sm md:hidden"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 z-[101] flex w-[85%] max-w-sm flex-col bg-card shadow-2xl md:hidden"
            >
              {/* Header */}
              <div className="flex h-16 items-center justify-between border-b border-border/50 px-6">
                <Link to="/" onClick={() => setOpen(false)} className="font-heading text-lg font-bold">
                  <span className="text-gradient-gold">Tujenge</span> Solutions
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-surface p-2 text-muted-foreground hover:bg-gold/10 hover:text-gold"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Nav items */}
              <div className="flex-1 overflow-y-auto px-6 py-8">
                <nav className="flex flex-col gap-2">
                  {navConfig.map((item) => (
                    <div key={item.label} className="border-b border-border/30 last:border-0">
                      <div className="flex items-center justify-between py-4">
                        <Link
                          to={item.to as any}
                          onClick={() => setOpen(false)}
                          className={`text-xl font-bold transition-colors ${
                            isActive(item.to) ? "text-gold" : "text-foreground"
                          }`}
                        >
                          {item.label}
                        </Link>

                        {item.type === "dropdown" && (
                          <button
                            onClick={() =>
                              setMobileOpenSection(
                                mobileOpenSection === item.label ? null : item.label
                              )
                            }
                            className={`rounded-lg p-2 transition-colors ${
                              mobileOpenSection === item.label
                                ? "bg-gold/10 text-gold"
                                : "bg-surface text-muted-foreground"
                            }`}
                          >
                            <ChevronDown
                              size={18}
                              className={`transition-transform duration-300 ${
                                mobileOpenSection === item.label ? "rotate-180" : ""
                              }`}
                            />
                          </button>
                        )}
                      </div>

                      <AnimatePresence>
                        {item.type === "dropdown" && mobileOpenSection === item.label && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mb-4 flex flex-col gap-1 border-l-2 border-gold/20 ml-2 pl-4">
                              {item.menu?.map((sub) => (
                                <Link
                                  key={sub.label}
                                  to={sub.to as any}
                                  params={sub.params}
                                  onClick={() => setOpen(false)}
                                  className="py-2.5 text-base font-medium text-muted-foreground hover:text-gold"
                                >
                                  {sub.label}
                                </Link>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </nav>
              </div>

              {/* Footer */}
              <div className="border-t border-border/50 p-6">
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-xl bg-gradient-gold py-4 font-heading text-sm font-bold text-primary-foreground shadow-warm"
                >
                  Get Started
                </Link>
                <p className="mt-6 text-center text-xs text-muted-foreground">
                  &copy; 2026 Tujenge Solutions
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
