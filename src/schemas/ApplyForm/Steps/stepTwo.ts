import * as z from "zod";
import { stateEnum } from "./base";

// Employment schema
export const employmentSchema = z.object({
  employer: z.string(),
  position: z.string(),
  workAddress: z.string(),
  workCity: z.string(),
  workState: stateEnum,
  workZip: z.string(),
  workPhone: z.string(),
  supervisor: z.string(),
  supervisorPhone: z.string(),
  income: z.string(),
  grossMonthlyIncome: z.string(),
});

export const currentEmploymentSchema = employmentSchema.extend({
  startDate: z.string().optional(),
});

export const previousEmploymentSchema = employmentSchema.extend({
  dateFrom: z.string().optional(),
  dateTo: z.string().optional(),
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
  rentalAndCriminalHistoryExplanation: z.string().max(500).optional()
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
    
    return !anyChecked || (anyChecked && data.rentalAndCriminalHistoryExplanation && data.rentalAndCriminalHistoryExplanation.trim().length > 0);
  },
  {
    message: "Explanation is required when any item is checked",
    path: ["rentalAndCriminalHistoryExplanation"],
  }
);

// Bank details schema (new)
export const bankDetailsSchema = z.object({
  bankName: z.string(),
  bankBranch: z.string(),
  bankAccountNumber: z.string(),
  bankRoutingNumber: z.string(),
  bankAccountType: z.string(),
  bankAccountOpenDate: z.string(),
  bankStatements: z.any().optional(),
});

export const creditHistorySchema = z.object({
  creditProblems: z.string().max(500).optional(),
});
