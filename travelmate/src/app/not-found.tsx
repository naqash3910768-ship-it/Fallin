import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/shared/page-hero";

export default function NotFound() {
  return (
    <PageHero
      size="lg"
      image="/images/hero/not-found.jpg"
      imageAlt="Winding mountain road"
      eyebrow="Error 404"
      title="Looks like you've wandered off the map"
      description="The page you're looking for has moved or no longer exists. Let's get you back on track."
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <Button asChild variant="accent" size="lg">
          <Link href="/">Back to home</Link>
        </Button>
        <Button asChild variant="glass" size="lg">
          <Link href="/travel-packages">Browse packages</Link>
        </Button>
      </div>
    </PageHero>
  );
}
