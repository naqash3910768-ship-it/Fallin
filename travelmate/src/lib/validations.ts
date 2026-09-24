import { z } from "zod";

const phoneRegex = /^[+()\d\s-]{7,20}$/;

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name"),
  email: z.email("Please enter a valid email address"),
  phone: z.string().trim().regex(phoneRegex, "Please enter a valid phone / WhatsApp number"),
  service: z.string().min(1, "Please choose what you're interested in"),
  destination: z.string().trim().max(120).optional().or(z.literal("")),
  packageSlug: z.string().max(120).optional().or(z.literal("")),
  travelDate: z.string().optional().or(z.literal("")),
  travellers: z.string().optional().or(z.literal("")),
  budget: z.string().optional().or(z.literal("")),
  message: z.string().trim().max(2000).optional().or(z.literal("")),
  // Honeypot — must stay empty.
  company: z.string().max(0).optional().or(z.literal("")),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name"),
  email: z.email("Please enter a valid email address"),
  phone: z.string().trim().regex(phoneRegex, "Please enter a valid phone number").optional().or(z.literal("")),
  department: z.enum(["tours-visa", "hajj-umrah", "general"]),
  subject: z.string().trim().min(3, "Please add a subject"),
  message: z.string().trim().min(10, "Please tell us a little more (min. 10 characters)").max(2000),
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;

export const newsletterSchema = z.object({
  email: z.email("Please enter a valid email address"),
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;

export const serviceOptions = [
  { value: "tour-package", label: "Tour package" },
  { value: "umrah", label: "Umrah package" },
  { value: "hajj", label: "Hajj package" },
  { value: "visa", label: "Visa service" },
  { value: "cruise", label: "Cruise" },
  { value: "air-ticketing", label: "Air ticketing" },
  { value: "hotel-booking", label: "Hotel booking" },
  { value: "corporate", label: "Corporate travel" },
] as const;
