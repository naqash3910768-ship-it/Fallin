"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { mainNav } from "@/data/navigation";
import { useScrolled } from "@/hooks/use-scrolled";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { WhatsAppIcon } from "@/components/shared/social-icons";
import { Logo } from "./logo";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const scrolled = useScrolled();
  const pathname = usePathname();
  const solid = scrolled;

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        solid ? "border-b border-border/70 bg-white/90 shadow-soft backdrop-blur-xl" : "bg-gradient-to-b from-ink/50 to-transparent",
      )}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-4">
        <Logo tone={solid ? "dark" : "light"} />

        <nav aria-label="Main navigation" className="hidden lg:block">
          <ul className="flex items-center">
            {mainNav.map((item) => (
              <li key={item.label} className="group relative">
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 whitespace-nowrap rounded-full px-3 py-2 text-[14px] font-medium transition-colors",
                    solid ? "text-ink hover:bg-secondary" : "text-white/90 hover:bg-white/10 hover:text-white",
                    isActive(item.href) && (solid ? "text-primary" : "text-white"),
                  )}
                >
                  {item.label}
                  {item.children && <ChevronDown className="size-3.5 opacity-70 transition-transform group-hover:rotate-180" aria-hidden />}
                </Link>
                {item.children && (
                  <div className="invisible absolute left-1/2 top-full z-50 w-[520px] -translate-x-1/2 translate-y-2 pt-3 opacity-0 transition-all duration-200 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <ul className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-white p-3 shadow-lift">
                      {item.children.map((child) => (
                        <li key={child.href + child.label} className={cn(!child.description && "col-span-2 mt-1 border-t border-border pt-2")}>
                          <Link href={child.href} className="block rounded-xl px-3 py-2.5 transition hover:bg-secondary">
                            <span className={cn("block text-sm font-semibold", child.description ? "text-ink" : "text-primary")}>{child.label}</span>
                            {child.description && <span className="mt-0.5 block text-xs text-muted-foreground">{child.description}</span>}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/search"
            aria-label="Search"
            className={cn("hidden size-10 place-items-center rounded-full transition sm:grid", solid ? "text-ink hover:bg-secondary" : "text-white hover:bg-white/10")}
          >
            <Search className="size-[18px]" />
          </Link>
          <a
            href={siteConfig.contact.phoneHref}
            className={cn("hidden items-center gap-2 whitespace-nowrap rounded-full px-3 py-2 text-sm font-semibold 2xl:flex", solid ? "text-ink" : "text-white")}
          >
            <Phone className="size-4" aria-hidden /> {siteConfig.contact.phone}
          </a>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Travel Mate"
            className="hidden size-10 place-items-center rounded-full bg-whatsapp text-white transition hover:brightness-105 sm:grid"
          >
            <WhatsAppIcon className="size-5" />
          </a>
          <Button asChild variant="accent" className="hidden whitespace-nowrap md:inline-flex lg:hidden xl:inline-flex">
            <Link href="/enquiry">Plan my trip</Link>
          </Button>
          <MobileNav solid={solid} />
        </div>
      </div>
    </header>
  );
}
