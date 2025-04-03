import * as z from "zod";

export const specialProvisionsSchema = z.object({
  specialProvisions: z.string(),
});
