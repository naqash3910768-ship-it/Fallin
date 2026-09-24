export default function Loading() {
  return (
    <div className="grid min-h-[70vh] place-items-center pt-24" role="status" aria-label="Loading">
      <span className="size-10 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
    </div>
  );
}
