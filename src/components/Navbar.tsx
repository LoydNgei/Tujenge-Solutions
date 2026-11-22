import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useServices } from "../lib/cms/content";

type NavItem = {
  label: string;
  to: string;
  type: "link" | "dropdown";
  menu?: { label: string; to: string; params?: { slug: string }; hash?: string }[];
};

const buildNavConfig = (services: { title: string; slug: string }[]): NavItem[] => [
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
  const navConfig = buildNavConfig(useServices());
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
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6 md:h-20">
          {/* Logo */}
          <Link to="/" className="font-heading text-2xl font-extrabold tracking-tight text-foreground">
            Tujenge<span className="font-semibold text-muted-foreground"> Solutions</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center md:flex md:gap-8 lg:gap-12">
            {navConfig.map((item) => (
              <div key={item.label} className="group relative py-4">
                <Link
                  to={item.to as any}
                  className={`flex items-center gap-1.5 text-[15px] font-semibold transition-colors ${
                    isActive(item.to)
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {item.type === "dropdown" && (
                    <ChevronDown size={14} className="opacity-50 transition-transform group-hover:rotate-180" />
                  )}
                </Link>

                {item.type === "dropdown" && (
                  <div className="pointer-events-none absolute left-0 top-full pt-2 opacity-0 transition-all group-hover:pointer-events-auto group-hover:opacity-100">
                    <div className="min-w-[200px] overflow-hidden rounded-xl border border-border/60 bg-card p-2">
                      {item.menu?.map((sub) => (
                        <Link
                          key={sub.label}
                          to={sub.to as any}
                          params={sub.params as any}
                          hash={sub.hash}
                          className="block rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-surface hover:text-foreground"
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
              className="rounded-lg bg-primary px-5 py-2.5 text-[15px] font-bold text-primary-foreground transition-colors hover:bg-gold-light/85"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setOpen(true)}
            className="rounded-xl bg-surface p-2 text-foreground md:hidden"
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
              className="fixed inset-0 z-[100] bg-deep/50 md:hidden"
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
                  Tujenge<span className="font-semibold text-muted-foreground"> Solutions</span>
                </Link>
                <button
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-surface p-2 text-muted-foreground hover:bg-surface hover:text-foreground"
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
                            isActive(item.to) ? "text-foreground" : "text-foreground"
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
                                ? "bg-accent text-foreground"
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
                                  params={sub.params as any}
                                  hash={sub.hash}
                                  onClick={() => setOpen(false)}
                                  className="py-2.5 text-base font-medium text-muted-foreground hover:text-foreground"
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
                  className="flex w-full items-center justify-center rounded-lg bg-primary py-4 text-base font-bold text-primary-foreground"
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
