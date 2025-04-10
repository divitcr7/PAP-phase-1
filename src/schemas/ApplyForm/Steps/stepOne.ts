import * as z from "zod";
import { stateOrCountryEnum } from "./base";

// Personal Information - Base (shared between applicants and occupants)
export const personInfoSchema = z.object({
  fullName: z.string().min(4, "Full name is required"),
  birthdate: z.string(),
  isUSCitizen: z.boolean().default(true),
  socialSecurity: z.string(),
  driverLicense: z.string(),
  driverLicenseState: stateOrCountryEnum,
  governmentIDType: z.string(),
  governmentID: z.string(),
  governmentIDState: stateOrCountryEnum,
  cellPhone: z.string(),
});

// Personal Information - Applicant (extends base)
export const applicantInfoSchema = personInfoSchema.extend({
  formerName: z.string(),
  gender: z.string(),
  isMarried: z.boolean(),
  homePhone: z.string(),
  workPhonePersonal: z.string(),
  email: z.string().email("Invalid email address"),
});

// Personal Information - Occupant (extends base)
export const occupantInfoSchema = personInfoSchema.extend({
  relationship: z.string(),
});

// Address schema (shared between current and previous)
export const addressSchema = z.object({
  address: z.string(),
  city: z.string(),
  state: stateOrCountryEnum,
  zip: z.string(),
  ownerPhone: z.string(),
  residenceType: z.enum(["rent", "own"]),
  apartmentName: z.string(),
  ownerName: z.string(),
  reasonForLeaving: z.string(),
  monthlyPayment: z.string(),
});

// Current address schema (extends base address)
export const currentAddressSchema = addressSchema.extend({
  residencyStartDate: z.string(),
});

// Previous address schema (extends base address)
export const previousAddressSchema = addressSchema.extend({
  residencyDateFrom: z.string(),
  residencyDateTo: z.string(),
}).optional();

export const sharedAddressSchema = z.object({
    hasSharedAddress: z.literal(true),
    residentType: z.enum(["applicant", "occupant"]),
    residentIndex: z.number(),
    residentName: z.string().min(1, "Please select a resident"),
  }).refine(data => !(data.residentType === "applicant" && data.residentIndex === 0),
    {message: "Primary applicant must provide their complete address details",
      path: ["residentType"],
    }
  );

export const addressesSchema = z.union([
  z.object({
    hasSharedAddress: z.literal(false),
    current: currentAddressSchema,
    previous: previousAddressSchema,
  }),
  sharedAddressSchema,
]);