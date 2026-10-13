"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    // Simulate submission — replace with a real API route later
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div>
        <h2 className="font-bold text-2xl">Send us a message</h2>
        <div className="mt-10 flex flex-col items-center justify-center rounded-2xl border border-green-200 bg-green-50 p-12 text-center dark:border-green-900 dark:bg-green-950/30">
          <CheckCircle className="mb-4 h-12 w-12 text-green-500" />
          <h3 className="font-bold text-xl">Message received!</h3>
          <p className="mt-2 text-muted-foreground">
            Thanks for reaching out. We'll get back to you within one business
            day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="font-bold text-2xl">Send us a message</h2>
      <p className="mt-2 text-muted-foreground">
        We typically respond within one business day.
      </p>

      <form onSubmit={handleSubmit} className="mt-8 space-y-6" noValidate>
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="firstName" className="mb-2 block font-medium text-sm">
              First name <span className="text-red-500">*</span>
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              required
              placeholder="Jane"
              className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
          <div>
            <label htmlFor="lastName" className="mb-2 block font-medium text-sm">
              Last name <span className="text-red-500">*</span>
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              required
              placeholder="Smith"
              className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>

        <div>
          <label htmlFor="email" className="mb-2 block font-medium text-sm">
            Work email <span className="text-red-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="jane@company.com"
            className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label htmlFor="company" className="mb-2 block font-medium text-sm">
            Company
          </label>
          <input
            id="company"
            name="company"
            type="text"
            placeholder="Acme Corp"
            className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div>
          <label htmlFor="service" className="mb-2 block font-medium text-sm">
            What can we help with?
          </label>
          <select
            id="service"
            name="service"
            className="w-full rounded-lg border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          >
            <option value="">Select a service area</option>
            <option>Strategic Planning</option>
            <option>Digital Transformation</option>
            <option>Operational Excellence</option>
            <option>Market Expansion</option>
            <option>Technology Advisory</option>
            <option>HR &amp; Talent Strategy</option>
            <option>Other / Not sure yet</option>
          </select>
        </div>

        <div>
          <label htmlFor="message" className="mb-2 block font-medium text-sm">
            Message <span className="text-red-500">*</span>
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder="Tell us about your challenge or project..."
            className="w-full resize-none rounded-lg border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90 disabled:opacity-70 sm:w-auto"
        >
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
              Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
