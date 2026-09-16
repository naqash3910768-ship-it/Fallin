"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";

type Status = "idle" | "submitting" | "success" | "error";

const subjects = ["General Inquiry", "Product Inquiry", "Business / Institutional Inquiry"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const nextErrors: Record<string, string> = {};
    if (!name) nextErrors.name = "Please enter your name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) nextErrors.email = "Please enter a valid email address.";
    if (!message) nextErrors.message = "Please add a short message.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone: String(data.get("phone") ?? ""),
          subject: String(data.get("subject") ?? subjects[0]),
          message,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-black/[0.06] bg-brand-sand p-8 text-center">
        <p className="text-lg font-bold text-brand-ink">Message sent</p>
        <p className="mt-2 text-sm text-neutral-600">
          Thank you for reaching out — we&rsquo;ll get back to you shortly.
        </p>
        <Button variant="ghost" className="mt-6" onClick={() => setStatus("idle")}>
          Send Another Message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" name="name" error={errors.name} required />
        <Field label="Email" name="email" type="email" error={errors.email} required />
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Phone" name="phone" type="tel" />
        <div>
          <label htmlFor="subject" className="mb-1.5 block text-sm font-medium text-brand-ink">
            Subject
          </label>
          <select
            id="subject"
            name="subject"
            className="w-full rounded-md border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-ink"
          >
            {subjects.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-brand-ink">
          Message <span className="text-brand-red">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          aria-invalid={Boolean(errors.message)}
          className="w-full rounded-md border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-ink"
        />
        {errors.message && <p className="mt-1.5 text-xs text-brand-red">{errors.message}</p>}
      </div>

      {status === "error" && (
        <p className="text-sm text-brand-red">
          Something went wrong sending your message. Please try again or email us directly.
        </p>
      )}

      <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
        {status === "submitting" ? "Sending..." : "Send Message"}
      </Button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-brand-ink">
        {label} {required && <span className="text-brand-red">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        aria-invalid={Boolean(error)}
        className="w-full rounded-md border border-black/10 bg-white px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-brand-ink"
      />
      {error && <p className="mt-1.5 text-xs text-brand-red">{error}</p>}
    </div>
  );
}
