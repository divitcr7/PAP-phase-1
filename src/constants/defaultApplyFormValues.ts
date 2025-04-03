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
  gender: "male",
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
const DEFAULT_ADDRESS = {
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
  residencyStartDate: "",
};

export const DEFAULT_PREVIOUS_ADDRESS = {
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
  previousDateFrom: "",
  previousDateTo: "",
};

// Employment information (shared between applicants)
const DEFAULT_EMPLOYMENT = {
  employer: "",
  position: "",
  workAddress: "",
  workCity: "",
  workState: DEFAULT_STATE,
  workZip: "",
  workPhone: "",
  supervisor: "",
  supervisorPhone: "",
  income: "",
  workStartDate: "",
  workEndDate: "",
  grossMonthlyIncome: "",
};

const DEFAULT_BANK_DETAILS = {
  bankName: "",
  bankBranch: "",
  bankAccountNumber: "",
  bankRoutingNumber: "",
  bankAccountType: "",
  bankAccountOpenDate: "",
  bankStatements: undefined,
};

export const DEFAULT_ADDITIONAL_INCOME = {
  type: "",
  source: "",
  amount: "",
};

const DEFAULT_CREDIT_HISTORY = {
  creditHistoryExplanation: "",
};

// Credit and background history (shared between applicants)
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
  make: "",
  model: "",
  color: "",
  year: "",
  license: "",
  state: DEFAULT_STATE,
};

// Pet information (for individual applicants/occupants)
export const DEFAULT_PET = {
  type: "",
  breed: "",
  weight: "",
  age: "",
  neutered: false,
  vaccinated: false,
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

// Complete applicant structure with all nested objects
export const DEFAULT_APPLICANT = {
  personalInfo: DEFAULT_APPLICANT_INFO,
  currentAddress: DEFAULT_ADDRESS,
  previousAddress: undefined,
  currentEmployment: DEFAULT_EMPLOYMENT,
  previousEmployment: undefined,
  bankDetails: DEFAULT_BANK_DETAILS,
  additionalIncomes: [],
  vehicles: [], // Array of vehicles specific to this applicant
  pets: [], // Array of pets specific to this applicant
};

// Complete occupant structure with all nested objects
export const DEFAULT_OCCUPANT = {
  personalInfo: DEFAULT_OCCUPANT_INFO,
  currentAddress: DEFAULT_ADDRESS,
  previousAddress: undefined,
  currentEmployment: DEFAULT_EMPLOYMENT,
  previousEmployment: undefined,
  bankDetails: DEFAULT_BANK_DETAILS,
  additionalIncomes: [],
  vehicles: [],
  pets: [],
};

// Default values for the entire form
export const DEFAULT_FORM_VALUES = {
  applicants: [
    {
      ...DEFAULT_APPLICANT,
    },
  ],
  isSmoker: false,
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
};