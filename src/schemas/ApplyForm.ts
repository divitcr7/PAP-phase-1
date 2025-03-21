import { US_STATES } from "@/constants/states";
import * as z from "zod";

export const applyFormSchema = z.object({
  // Step 1 - About You
  fullName: z.string().min(4, "Full name is required"),
  gender: z.string(),
  birthdate: z.string(),
  formerName: z.string().optional(),
  socialSecurity: z
    .string()
    .min(9, "Valid Social Security number is required")
    .max(11, "Invalid Social Security number")
    .regex(/^\d{3}-?\d{2}-?\d{4}$/, "Invalid Social Security number format"),
  driverLicense: z
    .string()
    .min(8, "Driver License is required")
    .max(8, "Driver License must be 8 characters")
    .regex(/^\d{8}$/, "Driver License must be 8 digits"),
  driverLicenseState: z.enum(
    US_STATES.map((state) => state.value) as [string, ...string[]]
  ),
  governmentIDType: z.string(),
  governmentID: z
    .string(),
  governmentIDState: z.enum(
    US_STATES.map((state) => state.value) as [string, ...string[]]
  ),
  homePhone: z
    .string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Please enter a valid phone number")
    .optional(),
  cellPhone: z
    .string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Please enter a valid phone number"),
  workPhonePersonal: z
    .string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Please enter a valid phone number")
    .optional(),
  email: z.string().email("Invalid email address"),
  isMarried: z.boolean(),
  isUSCitizen: z.boolean(),
  isSmoker: z.boolean(),
  apartmentAddress: z.string().min(1, "Apartment address is required"),

  hasCoApplicant: z.boolean(),
  coApplicants: z
    .array(
      z.object({
        fullName: z.string().min(2, "Full name is required"),
        gender: z.string(),
        birthdate: z.string().min(1, "Birthdate is required"),
        formerName: z.string().optional(),
        socialSecurity: z
          .string()
          .min(9, "Valid Social Security number is required")
          .max(11, "Invalid Social Security number")
          .regex(
            /^\d{3}-?\d{2}-?\d{4}$/,
            "Invalid Social Security number format"
          ),
        driverLicense: z
          .string()
          .min(8, "Driver License is required")
          .max(8, "Driver License must be 8 characters")
          .regex(/^\d{8}$/, "Driver License must be 8 digits"),
        driverLicenseState: z.enum(
          US_STATES.map((state) => state.value) as [string, ...string[]]
        ),
        governmentID: z
          .string()
          .regex(
            /^[A-Z]{2}\d{8}$/,
            "Government ID must be 2 capital letters followed by 8 digits"
          )
          .optional(),
        governmentIDState: z.enum(
          US_STATES.map((state) => state.value) as [string, ...string[]]
        ),
        homePhone: z
          .string()
          .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Please enter a valid phone number")
          .optional(),
        cellPhone: z
          .string()
          .regex(
            /^\(\d{3}\) \d{3}-\d{4}$/,
            "Please enter a valid phone number"
          ),
        workPhone: z
          .string()
          .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Please enter a valid phone number")
          .optional(),
        email: z.string().email("Invalid email address"),
        isMarried: z.boolean(),
        isUSCitizen: z.boolean(),
      })
    )
    .optional(),
  // ... existing code ...

  // Other Occupants
  occupants: z
    .array(
      z.object({
        name: z.string().min(2, "Full name is required"),
        isUSCitizen: z.boolean(),
        relationship: z.string().min(1, "Relationship is required"),
        birthdate: z.string().min(1, "Birthdate is required"),
        socialSecurity: z
          .string()
          .min(9, "Valid Social Security number is required"),
        driverLicense: z.string().optional(),
        driverLicenseState: z.enum(
          US_STATES.map((state) => state.value) as [string, ...string[]]
        ),
        phone: z
          .string()
          .regex(
            /^\(\d{3}\) \d{3}-\d{4}$/,
            "Please enter a valid phone number"
          ),
        governmentID: z.string().optional(),
        governmentIDState: z.enum(
          US_STATES.map((state) => state.value) as [string, ...string[]]
        ),
        governmentIDType: z.string().optional(),
      })
    )
    .optional(),

  // Where You Live
  // Where You Live
  currentAddress: z.string().min(5, "Current address is required"),
  currentCity: z.string().min(1, "City is required"),
  currentState: z.enum(
    US_STATES.map((state) => state.value) as [string, ...string[]]
  ),
  currentZIP: z.string().min(5, "ZIP code is required"),
  currentResidenceType: z.enum(["rent", "own"]),
  residencyStartDate: z
    .string()
    .min(1, "Beginning date of residency is required"),
  monthlyPayment: z.string().min(1, "Monthly payment is required"),
  currentApartmentName: z.string().min(1, "Apartment name is required"),
  currentOwnerName: z.string().min(1, "Owner name is required"),
  currentOwnerPhone: z
    .string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Please enter a valid phone number"),
  currentReasonForLeaving: z.string().min(1, "Reason for leaving is required"),

  // Previous Address (if less than 5 years)
  previousAddress: z.string().optional(),
  previousCity: z.string().optional(),
  previousState: z.enum(
    US_STATES.map((state) => state.value) as [string, ...string[]]
  ),
  previousZIP: z.string().optional(),
  previousOwnerPhone: z
    .string()
    .regex(/^\(\d{3}\) \d{3}-\d{4}$/, "Please enter a valid phone number")
    .optional(),
  previousResidenceType: z.enum(["rent", "own"]).optional(),
  previousDateFrom: z
    .string()
    .refine((date) => !date || new Date(date) <= new Date(), {
      message: "Date cannot be in the future",
    })
    .optional(),
  previousDateTo: z
    .string()
    .refine((date) => !date || new Date(date) <= new Date(), {
      message: "Date cannot be in the future",
    })
    .superRefine((date, ctx) => {
      if (!date) return;

      const fromDate = (
        ctx as z.RefinementCtx & { parent: { previousDateFrom?: string } }
      ).parent.previousDateFrom;

      if (fromDate && new Date(date) < new Date(fromDate)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "End date must be after start date",
        });
      }
    })
    .optional(),
  previousMonthlyPayment: z.string().optional(),
  previousApartmentName: z.string().optional(),
  previousOwnerName: z.string().optional(),
  previousReasonForLeaving: z.string().optional(),

  // Step 2 - Your Work
  employer: z.string().min(2, "Employer name is required"),
  position: z.string().min(1, "Position is required"),
  workAddress: z.string().min(1, "Work address is required"),
  workCity: z.string().min(1, "City is required"),
  workState: z.enum(
    US_STATES.map((state) => state.value) as [string, ...string[]]
  ),
  workZIP: z.string().min(5, "ZIP code is required"),
  workPhone: z.string().min(10, "Work phone is required"),
  employmentDate: z.string().min(1, "Beginning date of employment is required"),
  grossMonthlyIncome: z.string().min(1, "Monthly income is required"),
  supervisorName: z.string().min(1, "Supervisor name is required"),
  supervisorPhone: z.string().min(10, "Supervisor phone is required"),

  // Previous Employment
  previousEmployer: z.string().optional(),
  previousPosition: z.string().optional(),
  previousWorkAddress: z.string().optional(),
  previousWorkCity: z.string().optional(),
  previousWorkState: z.enum(
    US_STATES.map((state) => state.value) as [string, ...string[]]
  ),
  previousWorkZIP: z.string().optional(),
  previousWorkPhone: z.string().optional(),
  previousEmploymentDateFrom: z.string().optional(),
  previousEmploymentDateTo: z.string().optional(),
  previousGrossMonthlyIncome: z.string().optional(),
  previousSupervisorName: z.string().optional(),
  previousSupervisorPhone: z.string().optional(),
  previousEmploymentStartDate: z
    .string()
    .min(1, "Beginning date of employment is required"),
  previousEmploymentEndDate: z
    .string()
    .min(1, "Beginning date of employment is required"),

  // Additional Income
  additionalIncomes: z
    .array(
      z.object({
        type: z.string().min(1, "Income type is required"),
        source: z.string().min(1, "Income source is required"),
        amount: z.string().min(1, "Amount is required"),
      })
    )
    .optional(),

  // Credit History
  creditProblems: z.string().optional(),

  // Rental and Criminal History
  bankruptcy: z.boolean(),
  eviction: z.boolean(),
  refusedToPayRent: z.boolean(),
  felonyConviction: z.boolean(),
  criminalHistory: z.boolean(),
  explanation: z.string().optional(),

  // Additional Income
  additionalIncome: z.string().optional(),
  additionalIncomeSource: z.string().optional(),

  // Step 3 - How Did You Find Us
  // How Did You Find Us
  referralSource: z.string().min(1, "Please select an option"),
  referralDetails: z.string().optional(),

  // Emergency Contact
  emergencyContact: z.object({
    name: z.string().min(2, "Emergency contact name is required"),
    relationship: z.string().min(1, "Relationship is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.enum(
      US_STATES.map((state) => state.value) as [string, ...string[]]
    ),
    zip: z.string().min(5, "ZIP code is required"),
    homePhone: z.string().optional(),
    cellPhone: z.string().min(10, "Cell phone number is required"),
    workPhone: z.string().optional(),
    email: z.string().email("Invalid email address").optional(),
    authorizedPersons: z.object({
      abovePerson: z.boolean(),
      spouse: z.boolean(),
      parentChild: z.boolean(),
    }),
  }),

  // Your Vehicles
  vehicles: z
    .array(
      z.object({
        make: z.string(),
        model: z.string(),
        color: z.string(),
        year: z.string(),
        license: z.string(),
        state: z.enum(
          US_STATES.map((state) => state.value) as [string, ...string[]]
        ),
      })
    )
    .optional(),

  pets: z
    .array(
      z.object({
        type: z.string(),
        breed: z.string(),
        weight: z.string(),
        age: z.string().optional(),
      })
    )
    .optional(),

  // Step 4 - Your Animals
  // Special Provisions
  specialProvisions: z.string().optional(),

  // Step 5 - Disclosures
  disclosureAcknowledged: z.boolean(),

  // Authorization and Acknowledgment
  authorizationAcknowledged: z.boolean(),

  // Payment Authorization
  paymentAuthorized: z.boolean(),

  applicationDeposit: z.string().optional(),
  authorizedCompany: z.string().default("Juniper Conroe, LLC"),

  // Step 6 - Acknowledgment
  signature: z.string().min(2, "Signature is required"),
  date: z.string().min(1, "Date is required"),
});

export type ApplyFormValues = z.infer<typeof applyFormSchema>;
