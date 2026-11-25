"use client";

import { type FormEvent, useRef, useState } from "react";

const PROFILES = [
  "Developer / Owner",
  "Architect",
  "Contractor",
  "Project management",
  "Government / Public body",
  "Other",
];

const SERVICES = [
  "HVAC",
  "Plumbing & PHE",
  "Electrical (HT & LT)",
  "Fire protection",
  "ELV & automation",
  "Full MEPF package",
];

const STEPS = ["Your details", "Your profile", "Your project"];

const INPUT =
  "w-full border-[#121212]/20 border-b bg-transparent px-0 py-3 text-[#121212] text-[1.05rem] outline-none transition-colors placeholder:text-[#121212]/35 focus:border-[#261CC1]";
const LABEL =
  "mb-1 block font-bold font-mosvita text-[#5b5a8a] text-[0.7rem] uppercase tracking-[0.18em]";

function Choice({
  type,
  name,
  value,
}: {
  type: "radio" | "checkbox";
  name: string;
  value: string;
}) {
  return (
    <label className="group relative flex min-h-12 cursor-pointer items-center gap-3 border border-[#121212]/15 px-4 py-3 text-[0.98rem] transition-colors hover:border-[#261CC1] has-[:checked]:border-[#261CC1] has-[:checked]:bg-[#261CC1] has-[:checked]:text-[#f7fbff] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-[#261CC1]/40">
      <input className="sr-only" name={name} type={type} value={value} />
      <span
        aria-hidden="true"
        className="inline-block size-2.5 shrink-0 border border-current group-has-[:checked]:bg-current"
      />
      {value}
    </label>
  );
}

/**
 * Three-step enquiry form (details → profile → project).
 * Submission is simulated: there is no email/CRM endpoint in this repo yet.
 */
export function ContactStepsForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [step, setStep] = useState(0);
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const stepIsValid = () => {
    const fieldset = formRef.current?.querySelector<HTMLFieldSetElement>(
      `fieldset[data-step="${step}"]`
    );
    if (!fieldset) return true;
    const fields = Array.from(
      fieldset.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>(
        "input, textarea"
      )
    );
    const invalid = fields.find((field) => !field.checkValidity());
    invalid?.reportValidity();
    return !invalid;
  };

  const next = () => {
    if (stepIsValid()) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (step < STEPS.length - 1) {
      next();
      return;
    }
    if (!stepIsValid()) return;
    setStatus("sending");
    // TODO: post to an API route / email service once one exists.
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("sent");
  };

  if (status === "sent") {
    return (
      <div
        aria-live="polite"
        className="flex min-h-[420px] flex-col justify-end gap-4 border border-[#121212]/15 p-8 lg:p-10"
      >
        <p className="m-0 font-bold font-mosvita text-[#261CC1] text-[0.8rem] uppercase tracking-[0.2em]">
          Message received
        </p>
        <p className="m-0 max-w-[24ch] font-extrabold font-metropolis text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.1] tracking-[-0.03em]">
          Thank you. We will reply within one business day.
        </p>
      </div>
    );
  }

  return (
    <form
      aria-label="Project enquiry"
      className="flex min-h-[420px] flex-col"
      noValidate
      onSubmit={onSubmit}
      ref={formRef}
    >
      {/* Step indicator: 01 / 03 + progress bar */}
      <div className="flex items-center justify-between gap-6">
        <p className="m-0 font-bold font-mosvita text-[#121212] text-[0.95rem]">
          {String(step + 1).padStart(2, "0")}
          <span className="text-[#121212]/40">
            {" "}
            / {String(STEPS.length).padStart(2, "0")}
          </span>
        </p>
        <p className="m-0 font-bold font-mosvita text-[#5b5a8a] text-[0.72rem] uppercase tracking-[0.18em]">
          {STEPS[step]}
        </p>
      </div>
      <div aria-hidden="true" className="mt-4 h-px w-full bg-[#121212]/15">
        <div
          className="h-px bg-[#261CC1] transition-[width] duration-300"
          style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
        />
      </div>

      <div className="mt-10 flex-1">
        <fieldset
          className="m-0 grid gap-8 border-0 p-0 sm:grid-cols-2"
          data-step="0"
          hidden={step !== 0}
        >
          <legend className="sr-only">Your details</legend>
          <div>
            <label className={LABEL} htmlFor="cf-name">
              Full name *
            </label>
            <input
              autoComplete="name"
              className={INPUT}
              id="cf-name"
              name="name"
              required
              type="text"
            />
          </div>
          <div>
            <label className={LABEL} htmlFor="cf-email">
              Email *
            </label>
            <input
              autoComplete="email"
              className={INPUT}
              id="cf-email"
              name="email"
              required
              type="email"
            />
          </div>
          <div>
            <label className={LABEL} htmlFor="cf-phone">
              Phone
            </label>
            <input
              autoComplete="tel"
              className={INPUT}
              id="cf-phone"
              name="phone"
              type="tel"
            />
          </div>
          <div>
            <label className={LABEL} htmlFor="cf-company">
              Company / Organisation
            </label>
            <input
              autoComplete="organization"
              className={INPUT}
              id="cf-company"
              name="company"
              type="text"
            />
          </div>
        </fieldset>

        <fieldset
          className="m-0 border-0 p-0"
          data-step="1"
          hidden={step !== 1}
        >
          <legend className="mb-5 font-metropolis font-semibold text-[1.15rem]">
            Which best describes you?
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {PROFILES.map((profile) => (
              <Choice
                key={profile}
                name="profile"
                type="radio"
                value={profile}
              />
            ))}
          </div>
        </fieldset>

        <fieldset
          className="m-0 border-0 p-0"
          data-step="2"
          hidden={step !== 2}
        >
          <legend className="mb-5 font-metropolis font-semibold text-[1.15rem]">
            Which services do you need?
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {SERVICES.map((service) => (
              <Choice
                key={service}
                name="services"
                type="checkbox"
                value={service}
              />
            ))}
          </div>
          <div className="mt-8">
            <label className={LABEL} htmlFor="cf-message">
              Tell us about your project *
            </label>
            <textarea
              className={`${INPUT} min-h-28 resize-y`}
              id="cf-message"
              name="message"
              placeholder="Building type, size, location and stage"
              required
            />
          </div>
        </fieldset>
      </div>

      {/* Actions */}
      <div className="mt-10 flex items-center justify-between gap-4">
        {step > 0 ? (
          <button
            className="inline-flex min-h-11 items-center font-bold font-mosvita text-[#121212] text-[0.78rem] uppercase tracking-[0.12em] hover:text-[#261CC1]"
            onClick={() => setStep((s) => Math.max(s - 1, 0))}
            type="button"
          >
            ← Back
          </button>
        ) : (
          <span />
        )}
        <button
          className="inline-flex min-h-12 items-center gap-3 border border-[#261CC1] bg-[#261CC1] px-6 font-bold font-mosvita text-[#f7fbff] text-[0.8rem] uppercase tracking-[0.12em] transition-colors duration-200 hover:border-[#1a1396] hover:bg-[#1a1396] disabled:opacity-60"
          disabled={status === "sending"}
          type="submit"
        >
          {step < STEPS.length - 1
            ? "Next"
            : status === "sending"
              ? "Sending…"
              : "Send enquiry"}
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  );
}
