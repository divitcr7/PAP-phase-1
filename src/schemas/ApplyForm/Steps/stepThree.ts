import * as z from "zod";
import { stateEnum, stateOrCountryEnum } from "./base";

// Emergency contact schema
export const emergencyContactSchema = z.object({
  name: z.string(),
  relationship: z.string(),
  address: z.string(),
  city: z.string(),
  state: stateOrCountryEnum,
  zip: z.string(),
  homePhone: z.string(),
  cellPhone: z.string(),
  workPhone: z.string(),
  email: z.string(),
  authorizedPersons: z.object({
    abovePerson: z.boolean(),
    spouse: z.boolean(),
    parentChild: z.boolean(),
  }),
});

// Referral schema
export const referralSchema = z.object({
  referralSource: z.string(),
  referralDetails: z.string(),
});


// Vehicle schema
export const vehicleSchema = z.object({
  owner: z.string(),
  make: z.string(),
  model: z.string(),
  color: z.string(),
  year: z.string(),
  license: z.string(),
  state: stateEnum,
});

// Pet schema
export const petSchema = z.object({
  type: z.string(),
  breed: z.string(),
  weight: z.string(),
  age: z.string(),
  name: z.string(),
  color: z.string(),
  gender: z.string(),
  neutered: z.boolean(),
  vaccinated: z.boolean(),
});
