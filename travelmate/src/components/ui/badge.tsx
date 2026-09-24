import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva("inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold", {
  variants: {
    variant: {
      default: "bg-primary/10 text-primary",
      accent: "bg-accent text-accent-foreground",
      glass: "bg-white/90 text-ink backdrop-blur",
      outline: "border border-border text-muted-foreground",
      dark: "bg-ink/80 text-white backdrop-blur",
    },
  },
  defaultVariants: { variant: "default" },
});

function Badge({ className, variant, ...props }: React.ComponentProps<"span"> & VariantProps<typeof badgeVariants>) {
  return <span data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
