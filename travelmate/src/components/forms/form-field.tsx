import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function FormField({ id, label, error, required, className, children }: FormFieldProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <Label htmlFor={id}>
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-[13px] font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

export function FormSuccess({ title, text, children }: { title: string; text: string; children?: React.ReactNode }) {
  return (
    <div role="status" className="flex flex-col items-center rounded-2xl bg-secondary/60 px-6 py-12 text-center">
      <span className="grid size-14 place-items-center rounded-full bg-primary text-white">
        <svg viewBox="0 0 24 24" className="size-7" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden>
          <path d="m5 12 5 5L20 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <p className="mt-5 font-display text-2xl font-semibold text-ink">{title}</p>
      <p className="mt-2 max-w-sm text-muted-foreground">{text}</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}
