import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Headline } from "../components/Headline";
import { useSettings } from "../lib/cms/content";
import { submitContactForm } from "../lib/cms/contact";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Tujenge Solutions" },
      { name: "description", content: "Get in touch with Tujenge Solutions. Let's discuss your next digital project." },
      { property: "og:title", content: "Contact — Tujenge Solutions" },
      { property: "og:description", content: "Start your project with Tujenge Solutions today." },
    ],
  }),
});

const inputClass =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold";

function ContactPage() {
  const { contact } = useSettings();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const details = [
    { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
    { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Location", value: contact.location },
  ].filter((item) => item.value);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    // Bots fill the hidden field; pretend it worked.
    if (form.get("company_website")) {
      setStatus("sent");
      return;
    }
    setStatus("sending");
    try {
      await submitContactForm({
        name: String(form.get("name") ?? "").trim(),
        email: String(form.get("email") ?? "").trim(),
        phone: String(form.get("phone") ?? "").trim() || null,
        message: String(form.get("message") ?? "").trim(),
      });
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        <div
        >
          <p className="mb-3 text-sm font-semibold text-gold">{contact.eyebrow}</p>
          <h1 className="font-heading text-4xl font-extrabold md:text-6xl">
            <Headline {...contact} breaks />
          </h1>
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          <div
          >
            <h2 className="mb-6 font-heading text-xl font-extrabold">Get in touch</h2>
            <div className="space-y-6">
              {details.map((item) => (
                <div key={item.label} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                    <item.icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} className="text-sm font-medium text-foreground transition-colors hover:text-gold">
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-sm font-medium text-foreground">{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
          >
            {status === "sent" ? (
              <div className="flex h-full items-center justify-center rounded-xl border border-gold/20 bg-surface p-12 text-center">
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
                onSubmit={handleSubmit}
                className="space-y-5 rounded-xl border border-border/50 bg-surface p-8"
              >
                <div>
                  <label htmlFor="contact-name" className="mb-2 block text-sm font-medium text-foreground">Name</label>
                  <input id="contact-name" name="name" type="text" required maxLength={200} className={inputClass} placeholder="Your name" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label htmlFor="contact-email" className="mb-2 block text-sm font-medium text-foreground">Email</label>
                    <input id="contact-email" name="email" type="email" required maxLength={320} className={inputClass} placeholder="you@company.com" />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="mb-2 block text-sm font-medium text-foreground">
                      Phone <span className="font-normal text-muted-foreground">(optional)</span>
                    </label>
                    <input id="contact-phone" name="phone" type="tel" maxLength={50} className={inputClass} placeholder="+254 7XX XXX XXX" />
                  </div>
                </div>
                <div>
                  <label htmlFor="contact-message" className="mb-2 block text-sm font-medium text-foreground">Project details</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={4}
                    maxLength={5000}
                    className={`${inputClass} resize-none`}
                    placeholder="Tell us about your project..."
                  />
                </div>
                {/* Honeypot: hidden from people, irresistible to bots */}
                <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

                {status === "error" && (
                  <p className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
                    Something went wrong sending your message. Please try again
                    {contact.email && <>, or email us at <a href={`mailto:${contact.email}`} className="underline">{contact.email}</a></>}.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-3.5 font-heading text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 disabled:opacity-60"
                >
                  {status === "sending" && <Loader2 className="h-4 w-4 animate-spin" />}
                  {status === "sending" ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
