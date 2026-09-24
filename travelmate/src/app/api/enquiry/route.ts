import { createLeadHandler } from "@/lib/api-handler";
import { enquirySchema } from "@/lib/validations";

export const POST = createLeadHandler("enquiry", enquirySchema);
