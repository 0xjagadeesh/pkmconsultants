import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Lightbulb,
  BarChart3,
  ShieldCheck,
  Globe,
  Cpu,
  Users,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Services | PKM Consultants",
  description:
    "Explore PKM Consultants' full range of consulting services — from strategic planning and digital transformation to operational excellence.",
};

const SERVICES = [
  {
    icon: Lightbulb,
    title: "Strategic Planning",
    description:
      "We help leadership teams build clear, actionable strategies that create long-term value. From market analysis and competitive intelligence to scenario planning and OKR frameworks.",
    benefits: [
      "3–5 year roadmap development",
      "Competitive benchmarking",
      "Board-ready presentations",
      "KPI & OKR design",
    ],
  },
  {
    icon: BarChart3,
    title: "Digital Transformation",
    description:
      "We guide businesses through the complex journey of digitising operations, products, and customer experiences — without disrupting day-to-day performance.",
    benefits: [
      "Technology stack assessment",
      "Digital roadmap design",
      "Change management",
      "Vendor selection support",
    ],
  },
  {
    icon: ShieldCheck,
    title: "Operational Excellence",
    description:
      "Using Lean, Six Sigma, and agile methodologies, we identify and eliminate waste, streamline workflows, and build a culture of continuous improvement.",
    benefits: [
      "Process mapping & redesign",
      "Lean / Six Sigma implementation",
      "Performance dashboards",
      "Cost optimisation",
    ],
  },
  {
    icon: Globe,
    title: "Market Expansion",
    description:
      "Entering new markets is high-stakes. We de-risk expansion by delivering deep market research, go-to-market strategies, and local regulatory guidance.",
    benefits: [
      "Market sizing & feasibility",
      "Go-to-market playbooks",
      "Partnership identification",
      "Regulatory landscape review",
    ],
  },
  {
    icon: Cpu,
    title: "Technology Advisory",
    description:
      "From AI adoption to cloud migration, we help you make smart technology decisions that align with your business goals and budget.",
    benefits: [
      "AI readiness assessment",
      "Cloud strategy",
      "Data governance",
      "CTO-as-a-service",
    ],
  },
  {
    icon: Users,
    title: "HR & Talent Strategy",
    description:
      "People are your most important asset. We design talent acquisition, retention, and development strategies that build high-performing organisations.",
    benefits: [
      "Org design & restructuring",
      "Talent acquisition strategy",
      "L&D programme design",
      "Executive coaching",
    ],
  },
];

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="bg-slate-950 py-28 text-white">
        <div className="container mx-auto px-4">
          <p className="mb-4 font-medium text-primary text-sm uppercase tracking-widest">
            What We Offer
          </p>
          <h1 className="max-w-3xl font-bold text-4xl leading-tight md:text-6xl">
            Services built for real business challenges.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-400 leading-relaxed">
            We don't deal in off-the-shelf solutions. Every engagement is
            tailored to your specific context, goals, and constraints.
          </p>
          <Link
            href="/contact"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-3.5 font-semibold text-primary-foreground transition-all hover:bg-primary/90 hover:scale-105"
          >
            Discuss your needs <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Services grid */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="flex flex-col rounded-2xl border bg-card p-8 transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <service.icon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="font-bold text-xl">{service.title}</h2>
                <p className="mt-3 text-muted-foreground text-sm leading-relaxed flex-1">
                  {service.description}
                </p>
                <ul className="mt-6 space-y-2">
                  {service.benefits.map((b) => (
                    <li key={b} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 shrink-0 text-primary" />
                      {b}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-1 font-medium text-primary text-sm hover:underline"
                >
                  Enquire now <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process section */}
      <section className="bg-slate-50 py-24 dark:bg-slate-900/50">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-3 font-medium text-primary text-sm uppercase tracking-widest">
            How We Work
          </p>
          <h2 className="font-bold text-3xl md:text-4xl">Our Engagement Model</h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            A structured but flexible process that keeps you in control at every
            stage.
          </p>
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {[
              { step: "01", title: "Discover", desc: "Deep-dive into your business, challenges, and goals." },
              { step: "02", title: "Diagnose", desc: "Identify root causes and prioritise opportunities." },
              { step: "03", title: "Design", desc: "Build a tailored strategy and implementation roadmap." },
              { step: "04", title: "Deliver", desc: "Execute alongside your team and measure results." },
            ].map((phase) => (
              <div key={phase.step} className="relative text-left">
                <div className="mb-3 font-bold text-5xl text-primary/20">
                  {phase.step}
                </div>
                <h3 className="font-bold text-xl">{phase.title}</h3>
                <p className="mt-2 text-muted-foreground text-sm">{phase.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-primary px-8 py-20 text-center text-primary-foreground">
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="relative">
              <h2 className="font-bold text-3xl md:text-4xl">
                Not sure which service is right for you?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-primary-foreground/80">
                Let's have a free 30-minute discovery call. No commitment, no
                pressure — just an honest conversation.
              </p>
              <Link
                href="/contact"
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 font-semibold text-primary transition-all hover:bg-white/90 hover:scale-105"
              >
                Book a free call <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
