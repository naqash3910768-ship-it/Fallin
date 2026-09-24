"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { Textarea } from "@/components/ui/textarea";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { FormField, FormSuccess } from "./form-field";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema), defaultValues: { department: "general" } });
  const { submit, status, error, reset: resetStatus } = useFormSubmit<ContactInput>("/api/contact");

  const onSubmit = async (data: ContactInput) => {
    if (await submit(data)) reset();
  };

  if (status === "success") {
    return (
      <FormSuccess title="Message sent" text="Thanks for getting in touch — the right department will reply as soon as possible.">
        <Button variant="outline" onClick={resetStatus}>
          Send another message
        </Button>
      </FormSuccess>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="grid gap-5 sm:grid-cols-2">
      <FormField id="c-name" label="Name" required error={errors.name?.message}>
        <Input id="c-name" autoComplete="name" aria-invalid={!!errors.name} {...register("name")} />
      </FormField>
      <FormField id="c-email" label="Email" required error={errors.email?.message}>
        <Input id="c-email" type="email" autoComplete="email" aria-invalid={!!errors.email} {...register("email")} />
      </FormField>
      <FormField id="c-phone" label="Phone" error={errors.phone?.message}>
        <Input id="c-phone" type="tel" autoComplete="tel" aria-invalid={!!errors.phone} {...register("phone")} />
      </FormField>
      <FormField id="c-dept" label="Department" required>
        <NativeSelect id="c-dept" {...register("department")}>
          <option value="general">General enquiry</option>
          <option value="tours-visa">Tours &amp; Visa</option>
          <option value="hajj-umrah">Hajj &amp; Umrah</option>
        </NativeSelect>
      </FormField>
      <FormField id="c-subject" label="Subject" required error={errors.subject?.message} className="sm:col-span-2">
        <Input id="c-subject" aria-invalid={!!errors.subject} {...register("subject")} />
      </FormField>
      <FormField id="c-message" label="Message" required error={errors.message?.message} className="sm:col-span-2">
        <Textarea id="c-message" rows={5} aria-invalid={!!errors.message} {...register("message")} />
      </FormField>
      <input type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden {...register("company")} />
      {error && (
        <p role="alert" className="rounded-xl bg-destructive/10 px-4 py-3 text-sm text-destructive sm:col-span-2">
          {error}
        </p>
      )}
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" disabled={status === "submitting"} className="w-full sm:w-auto">
          {status === "submitting" ? <Loader2 className="animate-spin" /> : <Send />}
          {status === "submitting" ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
