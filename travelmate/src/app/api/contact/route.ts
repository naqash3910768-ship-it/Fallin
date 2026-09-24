import { createLeadHandler } from "@/lib/api-handler";
import { contactSchema } from "@/lib/validations";

export const POST = createLeadHandler("contact", contactSchema);
