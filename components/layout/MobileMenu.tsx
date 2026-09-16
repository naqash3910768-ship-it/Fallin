"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { ctaPrimary, primaryNav } from "@/lib/site-config";

export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="overflow-hidden border-t border-black/[0.06] bg-white lg:hidden"
        >
          <nav aria-label="Mobile" className="flex flex-col px-6 py-6">
            {primaryNav.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={`border-b border-black/[0.06] py-4 text-lg font-medium ${
                    active ? "text-brand-red" : "text-brand-ink"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
            <Button href={ctaPrimary.href} onClick={onClose} className="mt-6 w-full" size="lg">
              {ctaPrimary.label}
            </Button>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
