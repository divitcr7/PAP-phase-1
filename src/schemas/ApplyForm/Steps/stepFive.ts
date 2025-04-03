import * as z from "zod";

// Disclosures schema
export const disclosures = z.object({
  disclosureAcknowledged: z.boolean(),
  authorizationAcknowledged: z.boolean(),
  paymentAuthorized: z.boolean(),
  applicationDeposit: z.string(),
  authorizedCompany: z.string().default("Juniper Conroe, LLC"),
  paymentAuthorizedCompany: z.string().default("Juniper Conroe, LLC"),
});