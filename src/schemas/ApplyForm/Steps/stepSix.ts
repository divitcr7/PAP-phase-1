import * as z from "zod";

// Signature schema
export const signatureSchema = z.object({
  signature: z.string(),
  date: z.string(),
});
