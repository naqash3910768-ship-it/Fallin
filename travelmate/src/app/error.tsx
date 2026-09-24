"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <section className="container-page flex min-h-[70vh] flex-col items-center justify-center pt-24 text-center">
      <h1 className="font-display text-4xl font-semibold">Something went wrong</h1>
      <p className="mt-3 max-w-md text-muted-foreground">Please try again. If the problem continues, call us on (021) 111 800 500.</p>
      <Button className="mt-8" onClick={reset}>
        Try again
      </Button>
    </section>
  );
}
