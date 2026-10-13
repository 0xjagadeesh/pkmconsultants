import type { Metadata } from "next";
import { ContactForm } from "./_components/contact-form";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us | PKM Consultants",
  description:
    "Get in touch with PKM Consultants — send us a message, book a free discovery call, or reach us directly.",
};

const CONTACT_INFO = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@pkmconsultants.com",
    href: "mailto:hello@pkmconsultants.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+91 98765 43210",
    href: "tel:+919876543210",
  },
  {
    icon: MapPin,
    label: "Office",
    value: "Mumbai, Maharashtra, India",
    href: null,
  },
  {
    icon: Clock,
    label: "Hours",
    value: "Mon–Fri, 9 AM – 6 PM IST",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-slate-950 py-28 text-white">
        <div className="container mx-auto px-4">
          <p className="mb-4 font-medium text-primary text-sm uppercase tracking-widest">
            Contact Us
          </p>
          <h1 className="max-w-2xl font-bold text-4xl leading-tight md:text-6xl">
            Let's start a conversation.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-slate-400">
            Whether you have a specific challenge in mind or just want to
            explore what's possible, we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-[1fr_420px]">
            {/* Client component form */}
            <ContactForm />

            {/* Contact info sidebar */}
            <div className="space-y-6">
              <div className="rounded-2xl border p-8">
                <h3 className="font-bold text-lg">Contact Details</h3>
                <ul className="mt-6 space-y-5">
                  {CONTACT_INFO.map((info) => (
                    <li key={info.label} className="flex items-start gap-4">
                      <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <info.icon className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <div className="font-medium text-sm text-muted-foreground">
                          {info.label}
                        </div>
                        {info.href ? (
                          <a
                            href={info.href}
                            className="mt-0.5 font-medium text-sm hover:text-primary transition-colors"
                          >
                            {info.value}
                          </a>
                        ) : (
                          <div className="mt-0.5 font-medium text-sm">
                            {info.value}
                          </div>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl bg-primary p-8 text-primary-foreground">
                <h3 className="font-bold text-lg">Free Discovery Call</h3>
                <p className="mt-3 text-primary-foreground/80 text-sm leading-relaxed">
                  Not ready to commit? Book a free 30-minute call with one of
                  our consultants. No pitch, just honest advice.
                </p>
                <a
                  href="mailto:hello@pkmconsultants.com?subject=Discovery Call Request"
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2.5 font-semibold text-primary text-sm transition-all hover:bg-white/90"
                >
                  <Mail className="h-4 w-4" />
                  Request a call
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
