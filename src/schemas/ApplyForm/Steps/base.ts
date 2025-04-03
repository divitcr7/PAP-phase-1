import * as z from "zod";
import { COUNTRIES, DEFAULT_COUNTRY } from "@/constants/countries";
import { DEFAULT_STATE, US_STATES } from "@/constants/states";

// Common enum for states and countries
export const stateEnum = z
  .enum(US_STATES.map((state) => state.value) as [string, ...string[]])
  .default(DEFAULT_STATE);

export const countryEnum = z
  .enum(COUNTRIES.map((country) => country.value) as [string, ...string[]])
  .default(DEFAULT_COUNTRY);

export const stateOrCountryEnum = z.union([stateEnum, countryEnum]);

// Create a type from the enum for better TypeScript integration
export type StateOrCountry = z.infer<typeof stateOrCountryEnum>;

// Common types
export type ApplicantType = "applicant" | "occupant";

// Rest of the file remains unchanged
export type ApplicantReference = {
  type: ApplicantType;
  index: number;
};

export type AddressType = {
  type: "applicant" | "occupant";
  index?: number;
};

export type AddressReference = {
  sameAs?: {
    type: "applicant" | "occupant";
    index?: number;
  };
};

export type ExistingAddress = {
  name: string;
  type: ApplicantType;
  index: number;
  address: string;
  city: string;
  state: string;
  zip: string;
};

export const getApplicantFieldPath = (
  applicantType: ApplicantType,
  applicantIndex: number,
  fieldName: string
): string => {
  if (applicantType === "applicant") {
    return `applicants.${applicantIndex}.${fieldName}`;
  } else {
    return `occupants.${applicantIndex}.${fieldName}`;
  }
};

export const getApplicantDisplayName = (
  applicantType: ApplicantType,
  applicantIndex: number,
  name?: string
): string => {
  let title = "";

  if (applicantType === "applicant") {
    if (applicantIndex === 0) {
      title = "Primary Applicant";
    } else {
      title = `Co-Applicant ${applicantIndex}`;
    }
  } else {
    title = `Occupant ${applicantIndex + 1}`;
  }

  if (name && name.trim() !== "") {
    return `${title} - ${name}`;
  }

  return title;
};
