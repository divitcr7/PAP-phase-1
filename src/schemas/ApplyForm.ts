import * as z from "zod";

export const applyFormSchema = z.object({
  // Step 1 - About You
  fullName: z.string().min(2, "Full name is required"),
  gender: z.string(),
  birthdate: z.string().min(1, "Birthdate is required"),
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
  driverLicenseState: z
    .string()
    .min(2, "State is required")
    .max(2, "State must be 2 characters")
    .regex(/^[A-Z]{2}$/, "State must be 2 capital letters"),
  governmentID: z
    .string()
    .regex(
      /^[A-Z]{2}\d{8}$/,
      "Government ID must be 2 capital letters followed by 8 digits"
    )
    .optional(),
  governmentIDState: z
    .string()
    .min(2, "State must be 2 characters")
    .max(2, "State must be 2 characters")
    .regex(/^[A-Z]{2}$/, "State must be 2 capital letters")
    .optional(),
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
        name: z.string().min(2, "Co-applicant name is required"),
        email: z.string().email("Invalid email address"),
      })
    )
    .optional(),

  // Other Occupants
  occupants: z
    .array(
      z.object({
        name: z.string().min(2, "Full name is required"),
        relationship: z.string().min(1, "Relationship is required"),
        birthdate: z.string().min(1, "Birthdate is required"),
        socialSecurity: z
          .string()
          .min(9, "Valid Social Security number is required"),
        driverLicense: z.string().optional(),
        driverLicenseState: z.string().optional(),
        governmentID: z.string().optional(),
        governmentIDState: z.string().optional(),
      })
    )
    .optional(),

  // Where You Live
  currentAddress: z.string().min(5, "Current address is required"),
  residenceType: z.enum(["rent", "own"]).optional(),
  residencyStartDate: z
    .string()
    .min(1, "Beginning date of residency is required"),
  monthlyPayment: z.string().min(1, "Monthly payment is required"),
  apartmentName: z.string().optional(),
  ownerName: z.string().optional(),
  ownerPhone: z.string().optional(),
  reasonForLeaving: z.string().optional(),

  // Previous Address (if less than 5 years)
  previousAddress: z.string().optional(),
  previousCity: z.string().optional(),
  previousState: z.string().optional(),
  previousZip: z.string().optional(),
  previousPhone: z.string().optional(),
  previousResidenceType: z.enum(["rent", "own"]).optional(),
  previousDateFrom: z.string().optional(),
  previousDateTo: z.string().optional(),
  previousMonthlyPayment: z.string().optional(),
  previousApartmentName: z.string().optional(),
  previousOwnerName: z.string().optional(),
  previousReasonForLeaving: z.string().optional(),

  // Step 2 - Your Work
  employer: z.string().min(2, "Employer name is required"),
  position: z.string().min(1, "Position is required"),
  workAddress: z.string().min(1, "Work address is required"),
  workCity: z.string().min(1, "City is required"),
  workState: z.string().min(1, "State is required"),
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
  previousWorkState: z.string().optional(),
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
    state: z.string().min(1, "State is required"),
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
        state: z.string(),
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
