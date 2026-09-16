import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-brand-red">404</p>
      <h1 className="mt-4 text-3xl font-extrabold text-brand-ink sm:text-4xl">Page Not Found</h1>
      <p className="mt-3 max-w-sm text-neutral-600">
        The page you&rsquo;re looking for doesn&rsquo;t exist or may have moved.
      </p>
      <Button href="/" className="mt-8">
        Back to Home
      </Button>
    </Container>
  );
}
