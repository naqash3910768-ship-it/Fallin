"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Mail, Menu, Phone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { WhatsAppIcon } from "@/components/shared/social-icons";
import { mainNav } from "@/data/navigation";
import { siteConfig, whatsappLink } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";

export function MobileNav({ solid }: { solid: boolean }) {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <button
          type="button"
          aria-label="Open menu"
          className={cn("grid size-11 place-items-center rounded-full transition lg:hidden", solid ? "bg-secondary text-ink" : "bg-white/15 text-white backdrop-blur")}
        >
          <Menu className="size-5" />
        </button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto">
        <SheetTitle className="sr-only">Menu</SheetTitle>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>
        <div className="border-b border-border px-6 py-5">
          <Logo />
        </div>

        <nav aria-label="Mobile navigation" className="flex-1 px-4 py-4">
          <ul className="space-y-1">
            {mainNav.map((item, i) => {
              const isOpen = expanded === item.label;
              return (
                <motion.li key={item.label} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.04 * i }}>
                  {item.children ? (
                    <>
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setExpanded(isOpen ? null : item.label)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-left text-base font-semibold text-ink hover:bg-secondary"
                      >
                        {item.label}
                        <ChevronDown className={cn("size-5 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.ul
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden border-l-2 border-primary/20 pl-3 ml-3"
                          >
                            {item.children.map((child) => (
                              <li key={child.href + child.label}>
                                <Link href={child.href} onClick={close} className="block rounded-lg px-3 py-2.5 text-[15px] text-foreground/80 hover:bg-secondary hover:text-ink">
                                  {child.label}
                                </Link>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link href={item.href} onClick={close} className="block rounded-xl px-3 py-3 text-base font-semibold text-ink hover:bg-secondary">
                      {item.label}
                    </Link>
                  )}
                </motion.li>
              );
            })}
            <li>
              <Link href="/search" onClick={close} className="flex items-center gap-2 rounded-xl px-3 py-3 text-base font-semibold text-ink hover:bg-secondary">
                <Search className="size-4" /> Search
              </Link>
            </li>
          </ul>
        </nav>

        <div className="space-y-3 border-t border-border bg-secondary/50 p-6">
          <Button asChild variant="accent" size="lg" className="w-full">
            <Link href="/enquiry" onClick={close}>
              Plan my trip
            </Link>
          </Button>
          <Button asChild variant="whatsapp" size="lg" className="w-full">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <WhatsAppIcon className="size-5" /> WhatsApp us
            </a>
          </Button>
          <div className="space-y-2 pt-2 text-sm">
            <a href={siteConfig.contact.phoneHref} className="flex items-center gap-2 font-semibold text-ink">
              <Phone className="size-4 text-primary" /> {siteConfig.contact.phone}
            </a>
            <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2 text-muted-foreground">
              <Mail className="size-4 text-primary" /> {siteConfig.contact.email}
            </a>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
