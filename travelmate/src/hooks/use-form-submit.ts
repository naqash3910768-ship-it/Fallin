"use client";

import { useState } from "react";

type Status = "idle" | "submitting" | "success" | "error";

/** Posts JSON to one of our API routes and tracks request status. */
export function useFormSubmit<T>(endpoint: string) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function submit(data: T) {
    setStatus("submitting");
    setError(null);
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { message?: string };
      if (!res.ok) throw new Error(json.message ?? "Something went wrong. Please try again.");
      setStatus("success");
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong. Please try again.");
      setStatus("error");
      return false;
    }
  }

  return { submit, status, error, reset: () => setStatus("idle") };
}
