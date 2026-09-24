"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HeroSearch } from "@/components/forms/hero-search";
import { WhatsAppIcon } from "@/components/shared/social-icons";
import { whatsappLink } from "@/lib/site-config";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, reduce ? 0 : 120]);

  return (
    <section className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-ink">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        {/* Swap for a <video> (e.g. /videos/hero.mp4) with this image as the poster for a video hero. */}
        <Image src="/images/hero/hero-main.jpg" alt="Traveller overlooking turquoise mountain lake at sunrise" fill priority sizes="100vw" className="scale-110 object-cover" />
      </motion.div>
      <div className="bg-hero-fade absolute inset-0 -z-10" aria-hidden />

      <div className="container-page pb-16 pt-32 sm:pt-36">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-1.5 text-xs font-semibold text-white backdrop-blur-md sm:text-sm"
        >
          <span className="flex text-accent" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-3.5 fill-current" />
            ))}
          </span>
          Trusted by Pakistani travellers since 2007
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          className="mt-6 max-w-4xl font-display text-[2.6rem] font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl"
        >
          Explore Pakistan &amp; the world with <span className="italic text-accent">trusted</span> travel experts
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg"
        >
          Holiday packages, Hajj &amp; Umrah, visas, cruises and flights, all planned by one Karachi team that looks after you from the first quote until you&apos;re home.
        </motion.p>

        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3, ease }} className="mt-10">
          <HeroSearch />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Button asChild variant="glass" size="lg">
            <Link href="/enquiry">Send a travel enquiry</Link>
          </Button>
          <Button asChild variant="whatsapp" size="lg">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-5" /> Chat on WhatsApp
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
