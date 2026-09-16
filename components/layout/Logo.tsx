/**
 * Wordmark placeholder. The real Fello logo (red wordmark, yellow accent)
 * could not be retrieved in this environment — swap this for the official
 * logo file (e.g. /public/logo.svg) when available.
 */
export function Logo({ light = false, className = "" }: { light?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-baseline gap-0.5 font-extrabold tracking-tight ${className}`}>
      <span className={light ? "text-white" : "text-brand-ink"}>fell</span>
      <span className="relative text-brand-red">
        o
        <span className="absolute -right-0.5 -top-1 h-1.5 w-1.5 rounded-full bg-brand-yellow" aria-hidden="true" />
      </span>
    </span>
  );
}
