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
  addressesSchema,
} from "./Steps/stepOne";

import {
  additionalIncomeSchema,
  backgroundSchema,
  backgroundFormSchema,
  bankDetailsSchema,
  creditHistorySchema,
  employmentSchema,
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
const infoBaseSchema = z.object({
  addresses: addressesSchema,
  employments: employmentSchema,
  bankDetails: bankDetailsSchema,
  additionalIncomes: z.array(additionalIncomeSchema).optional(),
});

// Define the complete applicant structure
export const applicantSchema = z.object({
    personalInfo: applicantInfoSchema,
  }).merge(infoBaseSchema);

// Define the complete occupant structure
export const occupantSchema = z.object({
    personalInfo: occupantInfoSchema,
  }).merge(
    infoBaseSchema.extend({
      employments: employmentSchema.optional(),
      bankDetails: bankDetailsSchema.optional(),
    })
  );

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
};

// Step Two
export {
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
