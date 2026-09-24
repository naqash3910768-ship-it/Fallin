import * as React from "react";
import { cn } from "@/lib/utils";

export const fieldClasses =
  "flex w-full min-w-0 rounded-xl border border-input bg-white px-4 text-[15px] text-foreground shadow-xs transition-colors placeholder:text-muted-foreground/80 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/15 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/15";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return <input type={type} data-slot="input" className={cn(fieldClasses, "h-12", className)} {...props} />;
}

export { Input };
