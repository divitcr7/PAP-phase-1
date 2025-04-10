import * as z from "zod";
import { stateEnum } from "./base";

export const employmentSchemaBase = z.object({
  employer: z.string(),
  position: z.string(),
  address: z.string(),
  city: z.string(),
  state: stateEnum,
  zip: z.string(),
  phone: z.string(),
  supervisor: z.string(),
  supervisorPhone: z.string(),
  income: z.string(),
  grossMonthlyIncome: z.string(),
});

export const currentEmploymentSchema = employmentSchemaBase.extend({
  startDate: z.string().optional(),
});

export const previousEmploymentSchema = employmentSchemaBase.extend({
  startDate: z.string().optional(),
  endDate: z.string().optional(),
});

export const employmentSchema = z.object({
  current: currentEmploymentSchema,
  previous: previousEmploymentSchema.optional(),
});

// Additional income schema
export const additionalIncomeSchema = z.object({
  type: z.string(),
  source: z.string(),
  amount: z.string(),
});

export const backgroundSchema = z.object({
  hasBeenEvicted: z.boolean().default(false),
  hasBankruptcy: z.boolean().default(false),
  hasMovedBeforeLease: z.boolean().default(false),
  hasBeenSuedForRent: z.boolean().default(false),
  hasBeenSuedForDamage: z.boolean().default(false),
  hasFelonyConviction: z.boolean().default(false),
  rentalAndCriminalHistoryExplanation: z.string().max(500).optional(),
});

export const backgroundFormSchema = backgroundSchema.refine(
  (data) => {
    const anyChecked =
      data.hasBeenEvicted ||
      data.hasBankruptcy ||
      data.hasMovedBeforeLease ||
      data.hasBeenSuedForRent ||
      data.hasBeenSuedForDamage ||
      data.hasFelonyConviction;

    return (
      !anyChecked ||
      (anyChecked &&
        data.rentalAndCriminalHistoryExplanation &&
        data.rentalAndCriminalHistoryExplanation.trim().length > 0)
    );
  },
  {
    message: "Explanation is required when any item is checked",
    path: ["rentalAndCriminalHistoryExplanation"],
  }
);

// Bank details schema (new)
export const bankDetailsSchema = z.object({
  name: z.string(),
  branch: z.string(),
  accountNumber: z.string(),
  routingNumber: z.string(),
  accountType: z.string(),
  accountOpenDate: z.string(),
  statements: z.any().optional(),
});

export const creditHistorySchema = z.object({
  creditHistoryExplanation: z.string().max(500).optional(),
});
