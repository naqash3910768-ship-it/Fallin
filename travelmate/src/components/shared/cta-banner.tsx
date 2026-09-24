import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { WhatsAppIcon } from "./social-icons";

interface CtaBannerProps {
  title?: string;
  description?: string;
  image?: string;
  whatsappMessage?: string;
}

export function CtaBanner({
  title = "Ready to plan your next journey?",
  description = "Tell us where you'd like to go. A Travel Mate expert will send you a personalised itinerary and the best available price — usually within a few working hours.",
  image = "/images/cta/plan-your-trip.jpg",
  whatsappMessage,
}: CtaBannerProps) {
  return (
    <section className="section pt-0">
      <div className="container-page">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-ink px-6 py-14 sm:px-12 sm:py-20 lg:px-16">
          <Image src={image} alt="" fill sizes="(min-width: 1280px) 1216px, 100vw" className="-z-10 object-cover opacity-45" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink via-ink/85 to-ink/30" aria-hidden />
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-white/75 sm:text-lg">{description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild variant="accent" size="lg">
                <Link href="/enquiry">Get a free quote</Link>
              </Button>
              <Button asChild variant="whatsapp" size="lg">
                <a href={whatsappLink(whatsappMessage)} target="_blank" rel="noopener noreferrer">
                  <WhatsAppIcon className="size-5" /> WhatsApp us
                </a>
              </Button>
              <Button asChild variant="glass" size="lg">
                <a href={siteConfig.contact.phoneHref}>
                  <Phone /> {siteConfig.contact.phone}
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
