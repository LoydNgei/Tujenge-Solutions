import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — N5 Labs" },
      { name: "description", content: "Get in touch with N5 Labs. Let's discuss your next digital project." },
      { property: "og:title", content: "Contact — N5 Labs" },
      { property: "og:description", content: "Start your project with N5 Labs today." },
    ],
  }),
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-gold">Contact</p>
          <h1 className="font-heading text-4xl font-bold md:text-6xl">
            Let's build something
            <br />
            <span className="text-gradient-gold">extraordinary</span>
          </h1>
        </motion.div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="mb-6 font-heading text-xl font-bold">Get in touch</h2>
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "hello@n5labs.co.ke" },
                { icon: Phone, label: "Phone", value: "+254 700 000 000" },
                { icon: MapPin, label: "Location", value: "Nairobi, Kenya" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                    <item.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    <p className="text-sm font-medium text-foreground">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            {submitted ? (
              <div className="flex h-full items-center justify-center rounded-2xl border border-gold/20 bg-surface p-12 text-center">
                <div>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gold/10">
                    <Send className="h-7 w-7 text-gold" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground">Message sent!</h3>
                  <p className="mt-2 text-sm text-muted-foreground">We'll get back to you within 24 hours.</p>
                </div>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-5 rounded-2xl border border-border/50 bg-surface p-8"
              >
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Name</label>
                  <input
                    type="text"
                    required
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    placeholder="you@company.com"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-foreground">Project details</label>
                  <textarea
                    required
                    rows={4}
                    className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold"
                    placeholder="Tell us about your project..."
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-xl bg-gradient-gold py-3.5 font-heading text-sm font-semibold text-primary-foreground transition-all hover:opacity-90"
                >
                  Send message
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
