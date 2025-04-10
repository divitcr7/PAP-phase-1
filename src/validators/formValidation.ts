import { UseFormReturn } from "react-hook-form";
import {
  ApplicantType,
  ApplyFormValues,
  applyFormSchema,
} from "@/schemas/ApplyForm/ApplyForm";
import { isLessThanYearsAgo } from "@/lib/utils";

/**
 * Type-safe way to get nested values from form
 */
export const getNestedValue = <T>(
  form: UseFormReturn<ApplyFormValues>,
  path: string,
  defaultValue?: T
): T | undefined => {
  try {
    const value = form.getValues(path as unknown as keyof ApplyFormValues) as T;
    return value !== undefined ? value : defaultValue;
  } catch (error) {
    console.error(`Error getting value at path ${path}:`, error);
    return defaultValue;
  }
};

/**
 * Checks if a value is not empty (not undefined, null, or empty string)
 */
export const hasValue = <T>(value: T | null | undefined): boolean => {
  return value !== undefined && value !== null && value !== "";
};

/**
 * Checks if a field at the given path has a valid value
 */
export const fieldHasValue = <T>(
  form: UseFormReturn<ApplyFormValues>,
  path: string
): boolean => {
  const value = getNestedValue<T>(form, path);
  return hasValue(value);
};

/**
 * Generic function to validate that all required fields in a section have values
 */
export const validateRequiredFields = (
  form: UseFormReturn<ApplyFormValues>,
  basePath: string,
  requiredFields: string[]
): boolean => {
  return requiredFields.every((field) =>
    fieldHasValue(form, `${basePath}.${field}`)
  );
};

/**
 * Validates a specific section of the form using Zod
 */
export const validateFormSection = (
  form: UseFormReturn<ApplyFormValues>,
  path: string
): boolean => {
  try {
    // Get the data at the specified path
    const data = getNestedValue(form, path);
    if (!data) return false;

    // Get nested path parts
    const pathParts = path.split(".");

    // Create a test object with the same structure as the path
    const testObj: Record<string, unknown> = {};
    let current = testObj;

    // Build the nested structure
    for (let i = 0; i < pathParts.length - 1; i++) {
      current[pathParts[i]] = {};
      current = current[pathParts[i]] as Record<string, unknown>;
    }

    // Set the actual data at the deepest level
    current[pathParts[pathParts.length - 1]] = data;

    // Validate using the schema
    try {
      applyFormSchema.parse(testObj);
      return true;
    } catch (error) {
      console.log(`Validation error for ${path}:`, error);
      return false;
    }
  } catch (error) {
    console.error(`Error validating ${path}:`, error);
    return false;
  }
};

/**
 * Checks if required personal info fields are filled
 */
export const validatePersonalInfo = (
  form: UseFormReturn<ApplyFormValues>,
  type: ApplicantType,
  index: number
): boolean => {
  const basePath = `${
    type === "applicant" ? "applicants" : "occupants"
  }.${index}.personalInfo`;

  const commonRequiredFields = [
    // "fullName",
    // "birthdate",
    "isUSCitizen",
    // "socialSecurity",
    // "cellPhone",
    // "socialSecurity",
    // "driverLicense",
    // "driverLicenseState",
    // "governmentIDType",
    // "governmentID",
    // "governmentIDState",
  ];
  const requiredFields =
    type === "applicant"
      ? [
          ...commonRequiredFields,
          "gender",
          "isMarried",
          // "email"
        ]
      : [
          ...commonRequiredFields,
          // "relationship"
        ];

  return validateRequiredFields(form, basePath, requiredFields);
};

export const validateAddress = (
  form: UseFormReturn<ApplyFormValues>,
  type: ApplicantType,
  index: number
): boolean => {
  const basePath = `${
    type === "applicant" ? "applicants" : "occupants"
  }.${index}.addresses`;

  const hasSharedAddress = getNestedValue<boolean>(
    form,
    `${basePath}.hasSharedAddress`
  );

  if (hasSharedAddress) {
    const sharedAddressFields = [
      "residentType",
      "residentIndex",
      "residentName",
    ];
    return validateRequiredFields(form, basePath, sharedAddressFields);
  }

  const requiredAddressFields = [
    // "address",
    // "city",
    "state",
    // "zip",
    // "residenceType",
    // "ownerPhone",
    // "apartmentName",
    // "ownerName",
    // "reasonForLeaving",
    // "monthlyPayment",
  ];

  const requiredCurrentAddressFields = [
    ...requiredAddressFields,
    "residencyStartDate",
  ];

  const hasCurrentAddressFields = validateRequiredFields(
    form,
    `${basePath}.current`,
    requiredCurrentAddressFields
  );

  // Check if previous address is required (residency < 5 years)
  const startDateStr = getNestedValue<string>(
    form,
    `${basePath}.current.residencyStartDate`
  );

  if (!startDateStr) return hasCurrentAddressFields;

  // Use our utility function instead of direct date-fns calls
  if (isLessThanYearsAgo(startDateStr)) {
    const requiredPreviousAddressFields = [
      ...requiredAddressFields,
      "residencyDateFrom",
      // "residencyDateTo",
    ];

    const hasPreviousAddressFields = validateRequiredFields(
      form,
      `${basePath}.previous`,
      requiredPreviousAddressFields
    );

    return hasCurrentAddressFields && hasPreviousAddressFields;
  }

  return hasCurrentAddressFields;
};

export const validateEmployment = (
  form: UseFormReturn<ApplyFormValues>,
  type: ApplicantType,
  index: number
): boolean => {
  // For occupants, employment is optional
  if (type === "occupant") return true;

  const basePath = `${
    type === "applicant" ? "applicants" : "occupants"
  }.${index}.employments`;

  const requiredFields = ["employer", "position", "income", "startDate"];

  return validateRequiredFields(form, basePath, requiredFields);
};

export const validateApplicantOrOccupant = (
  form: UseFormReturn<ApplyFormValues>,
  type: ApplicantType,
  index: number
): {
  isValid: boolean;
  validPersonalInfo: boolean;
  validAddress: boolean;
  validEmployment: boolean;
} => {
  const validPersonalInfo = validatePersonalInfo(form, type, index);
  const validAddress = validateAddress(form, type, index);
  const validEmployment = validateEmployment(form, type, index);

  return {
    isValid:
      validPersonalInfo &&
      validAddress &&
      (type === "occupant" || validEmployment),
    validPersonalInfo,
    validAddress,
    validEmployment,
  };
};
