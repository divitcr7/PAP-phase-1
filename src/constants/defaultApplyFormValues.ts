import { ApplyFormValues } from "@/schemas/ApplyForm/ApplyForm";
import { DEFAULT_STATE } from "./states";

// Base personal information shared between applicants and occupants
const DEFAULT_PERSON_INFO = {
  fullName: "",
  birthdate: "",
  isUSCitizen: true,
  socialSecurity: "",
  driverLicense: "",
  driverLicenseState: DEFAULT_STATE,
  governmentIDType: "",
  governmentID: "",
  governmentIDState: DEFAULT_STATE,
  cellPhone: "",
};

// Personal information specific to applicants (extends the base)
const DEFAULT_APPLICANT_INFO = {
  ...DEFAULT_PERSON_INFO,
  formerName: "",
  gender: "male" as const,
  isMarried: true,
  homePhone: "",
  workPhonePersonal: "",
  email: "",
};

// Personal information specific to occupants (extends the base)
const DEFAULT_OCCUPANT_INFO = {
  ...DEFAULT_PERSON_INFO,
  relationship: "",
};

// Address information (shared between applicants and occupants)
const ADDRESS_BASE = {
  address: "",
  city: "",
  state: DEFAULT_STATE,
  zip: "",
  ownerPhone: "",
  residenceType: "rent" as const,
  apartmentName: "",
  ownerName: "",
  reasonForLeaving: "",
  monthlyPayment: "",
};

// Current address information (extends the base)
export const DEFAULT_CURRENT_ADDRESS = {
  ...ADDRESS_BASE,
  residencyStartDate: "",
};

// Previous address information (extends the base)
export const DEFAULT_PREVIOUS_ADDRESS = {
  ...ADDRESS_BASE,
  residencyDateFrom: "",
  residencyDateTo: "",
};

export const DEFAULT_PRIMARY_APPLICANT_ADDRESS = {
  hasSharedAddress: false as const,
  current: DEFAULT_CURRENT_ADDRESS,
  previous: undefined,
};

const DEFAULT_ADDRESS = {
  hasSharedAddress: true as const,
  residentType: "applicant" as const,
  residentIndex: 0,
  residentName: "Primary Applicant",
  current: undefined,
  previous: undefined,
};

const EMPLOYMENT_BASE = {
  employer: "",
  position: "",
  address: "",
  city: "",
  state: DEFAULT_STATE,
  zip: "",
  phone: "",
  supervisor: "",
  supervisorPhone: "",
  income: "",
  grossMonthlyIncome: "",
};

// Current employment information (extends the base)
export const DEFAULT_CURRENT_EMPLOYMENT = {
  ...EMPLOYMENT_BASE,
  startDate: "",
};

// Previous employment information (extends the base)
export const DEFAULT_PREVIOUS_EMPLOYMENT = {
  ...EMPLOYMENT_BASE,
  startDate: "",
  endDate: "",
};

const DEFAULT_EMPLOYMENT = {
  current: DEFAULT_CURRENT_EMPLOYMENT,
  previous: undefined,
};

export const DEFAULT_BANK_DETAILS = {
  name: "",
  branch: "",
  accountNumber: "",
  routingNumber: "",
  accountType: "",
  accountOpenDate: "",
  statements: undefined,
};

export const DEFAULT_ADDITIONAL_INCOME = {
  type: "",
  source: "",
  amount: "",
};

const DEFAULT_CREDIT_HISTORY = {
  creditHistoryExplanation: "",
};

const DEFAULT_BACKGROUND = {
  hasBeenEvicted: false,
  hasBankruptcy: false,
  hasMovedBeforeLease: false,
  hasBeenSuedForRent: false,
  hasBeenSuedForDamage: false,
  hasFelonyConviction: false,
  rentalAndCriminalHistoryExplanation: "",
};

const DEFAULT_REFERRAL = {
  referralSource: "",
  referralDetails: "",
};

// Emergency contact information (primary applicant only)
const DEFAULT_EMERGENCY_CONTACT = {
  name: "",
  relationship: "",
  address: "",
  city: "",
  state: DEFAULT_STATE,
  zip: "",
  homePhone: "",
  cellPhone: "",
  workPhone: "",
  email: "",
  authorizedPersons: {
    abovePerson: false,
    spouse: false,
    parentChild: false,
  },
};

// Vehicle information (for individual applicants/occupants)
export const DEFAULT_VEHICLE = {
  owner: "",
  make: "",
  model: "",
  color: "",
  year: "",
  license: "",
  state: DEFAULT_STATE,
};

// Pet information (for individual applicants/occupants)
export const DEFAULT_PET = {
  kind: "",
  breed: "",
  weight: "",
  age: "",
  // name: "",
  // color: "",
  // gender: "",
  // neutered: false,
  // vaccinated: false,
};

// Special provisions (primary applicant only)
const DEFAULT_SPECIAL_PROVISIONS = {
  specialProvisions: "",
};

// Disclosures and acknowledgments (primary applicant only)
const DEFAULT_DISCLOSURES = {
  disclosureAcknowledged: false,
  authorizationAcknowledged: false,
  paymentAuthorized: false,
  applicationDeposit: "",
  authorizedCompany: "Juniper Conroe, LLC",
  paymentAuthorizedCompany: "Juniper Conroe, LLC",
};

// Signature (primary applicant only)
const DEFAULT_SIGNATURE = {
  signature: "",
  date: "",
};

const INFO_BASE = {
  employments: DEFAULT_EMPLOYMENT,
  bankDetails: DEFAULT_BANK_DETAILS,
  additionalIncomes: [],
};

export const DEFAULT_PRIMARY_APPLICANT = {
  personalInfo: DEFAULT_APPLICANT_INFO,
  addresses: DEFAULT_PRIMARY_APPLICANT_ADDRESS,
  ...INFO_BASE,
};

// Complete applicant structure with all nested objects
export const DEFAULT_APPLICANT = {
  personalInfo: DEFAULT_APPLICANT_INFO,
  addresses: DEFAULT_ADDRESS,
  ...INFO_BASE,
};

// Complete occupant structure with all nested objects
export const DEFAULT_OCCUPANT = {
  personalInfo: DEFAULT_OCCUPANT_INFO,
  addresses: DEFAULT_ADDRESS,
  ...INFO_BASE,
};

// Default values for the entire form
export const DEFAULT_FORM_VALUES: ApplyFormValues = {
  applicants: [{ ...DEFAULT_PRIMARY_APPLICANT }],
  isSmoker: false,
  apartmentAddress: "Test",
  emergencyContact: DEFAULT_EMERGENCY_CONTACT,
  creditHistory: DEFAULT_CREDIT_HISTORY,
  background: DEFAULT_BACKGROUND,
  referral: DEFAULT_REFERRAL,
  specialProvisions: DEFAULT_SPECIAL_PROVISIONS,
  disclosures: DEFAULT_DISCLOSURES,
  signature: DEFAULT_SIGNATURE,
  hasCoApplicant: false,
  hasOccupants: false,
  occupants: [],
  vehicles: [],
  pets: [],
};
