"use client";

import { motion } from "framer-motion";
import { whatsappLink } from "@/lib/site-config";
import { WhatsAppIcon } from "./social-icons";

export function WhatsAppFloat() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Travel Mate on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: "spring", stiffness: 260, damping: 20 }}
      className="group fixed bottom-5 right-5 z-40 flex items-center gap-2 rounded-full bg-whatsapp p-3.5 text-white shadow-lift transition hover:brightness-105 sm:bottom-6 sm:right-6"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-whatsapp/40 [animation-duration:2.5s]" aria-hidden />
      <WhatsAppIcon className="size-7" />
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold transition-all duration-300 group-hover:max-w-40 group-hover:pr-2 sm:inline">
        Chat with us
      </span>
    </motion.a>
  );
}
