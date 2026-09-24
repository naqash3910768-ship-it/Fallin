import { createLeadHandler } from "@/lib/api-handler";
import { newsletterSchema } from "@/lib/validations";

export const POST = createLeadHandler("newsletter", newsletterSchema);
