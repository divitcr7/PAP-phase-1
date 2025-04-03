import * as z from "zod";
import { stateOrCountryEnum } from "./base";

// Employment schema
export const employmentSchema = z.object({
  employer: z.string(),
  position: z.string(),
  workAddress: z.string(),
  workCity: z.string(),
  workState: stateOrCountryEnum,
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

// Background schema
export const backgroundSchema = z.object({
  hasBeenEvicted: z.boolean(),
  hasBankruptcy: z.boolean(),
  hasMovedBeforeLease: z.boolean(),
  hasBeenSuedForRent: z.boolean(),
  hasBeenSuedForDamage: z.boolean(),
  hasFelonyConviction: z.boolean(),
  rentalAndCriminalHistoryExplanation: z.string(),
});

// Bank details schema (new)
export const bankDetailsSchema = z.object({
  bankName: z.string(),
  bankBranch: z.string(),
  bankAccountNumber: z.string(),
  bankRoutingNumber: z.string(),
  bankAccountType: z.string(),
  bankAccountOpenDate: z.string(),
  bankStatements: z.any().optional(), // For file uploads
});

export const creditHistorySchema = z.object({
  creditProblems: z.string().optional(),
});
