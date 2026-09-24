"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { WhatsAppIcon } from "@/components/shared/social-icons";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { enquirySchema, serviceOptions, type EnquiryInput } from "@/lib/validations";
import { FormField, FormSuccess } from "./form-field";

interface EnquiryFormProps {
  defaultValues?: Partial<EnquiryInput>;
  /** Compact layout for sidebars. */
  compact?: boolean;
  submitLabel?: string;
  className?: string;
}

export function EnquiryForm({ defaultValues, compact, submitLabel = "Send my enquiry", className }: EnquiryFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: { service: "tour-package", travellers: "2", ...defaultValues },
  });
  const { submit, status, error, reset: resetStatus } = useFormSubmit<EnquiryInput>("/api/enquiry");

  const onSubmit = async (data: EnquiryInput) => {
    if (await submit(data)) reset();
  };

  if (status === "success") {
    return (
      <FormSuccess title="Enquiry received!" text="Thank you. A Travel Mate expert will contact you shortly with options and pricing.">
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="whatsapp">
            <a href={whatsappLink("Hi Travel Mate, I just sent an enquiry on your website.")} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-4" /> Speed things up on WhatsApp
            </a>
          </Button>
          <Button variant="outline" onClick={resetStatus}>
            Send another enquiry
          </Button>
        </div>
      </FormSuccess>
    );
  }

  const grid = compact ? "grid gap-4" : "grid gap-5 sm:grid-cols-2";
  const aria = (name: keyof EnquiryInput) => ({ "aria-invalid": !!errors[name], "aria-describedby": errors[name] ? `enq-${name}-error` : undefined });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className={cn("space-y-5", className)}>
      <div className={grid}>
        <FormField id="enq-name" label="Full name" required error={errors.name?.message}>
          <Input id="enq-name" autoComplete="name" placeholder="e.g. Ali Khan" {...aria("name")} {...register("name")} />
        </FormField>
        <FormField id="enq-phone" label="Phone / WhatsApp" required error={errors.phone?.message}>
          <Input id="enq-phone" type="tel" autoComplete="tel" placeholder="03xx xxxxxxx" {...aria("phone")} {...register("phone")} />
        </FormField>
        <FormField id="enq-email" label="Email" required error={errors.email?.message} className={compact ? "" : "sm:col-span-2"}>
          <Input id="enq-email" type="email" autoComplete="email" placeholder="you@example.com" {...aria("email")} {...register("email")} />
        </FormField>
        <FormField id="enq-service" label="I'm interested in" required error={errors.service?.message}>
          <NativeSelect id="enq-service" {...aria("service")} {...register("service")}>
            {serviceOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </NativeSelect>
        </FormField>
        <FormField id="enq-destination" label="Destination / package" error={errors.destination?.message}>
          <Input id="enq-destination" placeholder="e.g. Dubai, Hunza, Umrah" {...register("destination")} />
        </FormField>
        <FormField id="enq-date" label="Preferred travel date">
          <Input id="enq-date" type="date" {...register("travelDate")} />
        </FormField>
        <FormField id="enq-travellers" label="Travellers">
          <NativeSelect id="enq-travellers" {...register("travellers")}>
            {["1", "2", "3", "4", "5", "6", "7-10", "10+"].map((n) => (
              <option key={n} value={n}>
                {n} {n === "1" ? "traveller" : "travellers"}
              </option>
            ))}
          </NativeSelect>
        </FormField>
        {!compact && (
          <FormField id="enq-budget" label="Budget per person (optional)" className="sm:col-span-2">
            <NativeSelect id="enq-budget" {...register("budget")}>
              <option value="">No preference</option>
              <option value="under-100k">Under Rs 100,000</option>
              <option value="100k-250k">Rs 100,000 – 250,000</option>
              <option value="250k-500k">Rs 250,000 – 500,000</option>
              <option value="500k+">Rs 500,000+</option>
            </NativeSelect>
          </FormField>
        )}
        <FormField id="enq-message" label="Anything else we should know?" className={compact ? "" : "sm:col-span-2"}>
          <Textarea id="enq-message" rows={compact ? 3 : 4} placeholder="Hotel preference, special occasions, dietary needs…" {...register("message")} />
        </FormField>
      </div>

      {/* Honeypot */}
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...register("company")} />
      <input type="hidden" {...register("packageSlug")} />

      {error && (
        <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </p>
      )}

      <Button type="submit" variant="accent" size="lg" className="w-full" disabled={status === "submitting"}>
        {status === "submitting" ? <Loader2 className="animate-spin" /> : <Send />}
        {status === "submitting" ? "Sending…" : submitLabel}
      </Button>
      <p className="text-center text-xs text-muted-foreground">
        By submitting you agree to our{" "}
        <Link href="/privacy-policy" className="underline underline-offset-2 hover:text-ink">
          privacy policy
        </Link>
        . We never share your details.
      </p>
    </form>
  );
}
