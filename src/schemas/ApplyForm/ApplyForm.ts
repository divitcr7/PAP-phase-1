import * as z from "zod";
import {
  stateOrCountryEnum,
  AddressReference,
  AddressType,
  ApplicantReference,
  ApplicantType,
  ExistingAddress,
  getApplicantDisplayName,
  getApplicantFieldPath,
} from "./Steps/base";

import {
  personInfoSchema,
  applicantInfoSchema,
  occupantInfoSchema,
  addressSchema,
  currentAddressSchema,
  previousAddressSchema,
} from "./Steps/stepOne";

import {
  currentEmploymentSchema,
  previousEmploymentSchema,
  additionalIncomeSchema,
  backgroundSchema,
  backgroundFormSchema,
  bankDetailsSchema,
  creditHistorySchema,
} from "./Steps/stepTwo";

import {
  emergencyContactSchema,
  referralSchema,
  vehicleSchema,
  petSchema,
} from "./Steps/stepThree";
import { specialProvisionsSchema } from "./Steps/stepFour";
import { disclosures } from "./Steps/stepFive";
import { signatureSchema } from "./Steps/stepSix";

// Define the complete applicant structure
export const applicantSchema = z.object({
  personalInfo: applicantInfoSchema,
  currentAddress: currentAddressSchema,
  previousAddress: previousAddressSchema.optional(),
  currentEmployment: currentEmploymentSchema,
  previousEmployment: previousEmploymentSchema.optional(),
  bankDetails: bankDetailsSchema,
  additionalIncomes: z.array(additionalIncomeSchema).optional(),
  vehicles: z.array(vehicleSchema).optional(),
});

// Define the complete occupant structure
export const occupantSchema = z.object({
  personalInfo: occupantInfoSchema,
  currentAddress: currentAddressSchema,
  previousAddress: previousAddressSchema.optional(),
  currentEmployment: currentEmploymentSchema.optional(),
  previousEmployment: previousEmploymentSchema.optional(),
  bankDetails: bankDetailsSchema.optional(),
  additionalIncomes: z.array(additionalIncomeSchema).optional(),
});

// Define the primary applicant only fields
export const applyFormSchema = z.object({
  isSmoker: z.boolean().default(false),
  apartmentAddress: z.string().optional(),
  hasOccupants: z.boolean(),
  occupants: z.array(occupantSchema).optional(),
  creditHistory: creditHistorySchema,
  background: backgroundFormSchema,
  emergencyContact: emergencyContactSchema,
  referral: referralSchema,
  specialProvisions: specialProvisionsSchema,
  disclosures: disclosures,
  signature: signatureSchema,
  applicants: z.array(applicantSchema),
  hasCoApplicant: z.boolean(),
  pets: z.array(petSchema).optional(),
  vehicles: z.array(vehicleSchema).optional(),
});

export type ApplyFormValues = z.infer<typeof applyFormSchema>;

// Re-export everything from the step files for convenience
export { stateOrCountryEnum, getApplicantDisplayName, getApplicantFieldPath };

// Re-export types with 'export type'
export type {
  AddressReference,
  AddressType,
  ApplicantReference,
  ApplicantType,
  ExistingAddress,
};

// Step One
export {
  personInfoSchema,
  applicantInfoSchema,
  occupantInfoSchema,
  addressSchema,
  currentAddressSchema,
  previousAddressSchema,
};

// Step Two
export {
  previousEmploymentSchema,
  currentEmploymentSchema,
  additionalIncomeSchema,
  backgroundSchema,
  bankDetailsSchema,
  creditHistorySchema,
};

// Step Three
export { emergencyContactSchema, referralSchema };

// Step Four
export { vehicleSchema, petSchema, specialProvisionsSchema };

// Step Five
export { disclosures };

// Step Six
export { signatureSchema };
