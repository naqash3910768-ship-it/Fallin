"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useFormSubmit } from "@/hooks/use-form-submit";
import { newsletterSchema, type NewsletterInput } from "@/lib/validations";

export function NewsletterForm() {
  const { register, handleSubmit, formState, reset } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });
  const { submit, status, error } = useFormSubmit<NewsletterInput>("/api/newsletter");

  const onSubmit = async (data: NewsletterInput) => {
    if (await submit(data)) reset();
  };

  if (status === "success") {
    return <p className="rounded-full bg-white/10 px-6 py-3 text-sm font-medium text-white">Thanks for subscribing! Look out for our next deals email.</p>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full max-w-md">
      <div className="flex gap-2 rounded-full bg-white/10 p-1.5 ring-1 ring-white/15 focus-within:ring-accent">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          autoComplete="email"
          placeholder="Your email address"
          aria-invalid={!!formState.errors.email}
          className="min-w-0 flex-1 bg-transparent px-4 text-[15px] text-white placeholder:text-white/50 focus:outline-none"
          {...register("email")}
        />
        <Button type="submit" variant="accent" disabled={status === "submitting"}>
          {status === "submitting" ? <Loader2 className="animate-spin" /> : "Subscribe"}
        </Button>
      </div>
      {(formState.errors.email || error) && <p className="mt-2 px-4 text-sm text-red-300">{formState.errors.email?.message ?? error}</p>}
    </form>
  );
}
