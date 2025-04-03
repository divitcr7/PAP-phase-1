import type { UseFormReturn } from "react-hook-form";
import {
  ApplyFormValues,
  getApplicantFieldPath,
} from "@/schemas/ApplyForm/ApplyForm";
import { YourWork } from "./YourWork";
import { BankDetails } from "./BankDetail";
import { AdditionalIncome } from "./AdditionalIncome";
import { CreditHistory } from "./CreditHistory";
import { ApplicantInfo } from "../../RentalApplicationForm";
import { RentalCriminalHistory } from "./RentalCriminalHistory";

interface StepTwoProps {
  form: UseFormReturn<ApplyFormValues>;
  applicants: ApplicantInfo[];
  occupants?: ApplicantInfo[];
}

export default function StepTwo({ form, applicants, occupants = [] }: StepTwoProps) {
  // Get primary applicant and co-applicants
  const primaryApplicant = applicants[0];
  const coApplicants = applicants.slice(1);

  return (
    <div className="space-y-6">
      {/* Primary Applicant Work and Bank Details */}
      <div className="space-y-6">
        <div>{primaryApplicant?.name}</div>
        <YourWork
          form={form}
          applicantType="applicant"
          applicantIndex={0}
          getFieldPath={getApplicantFieldPath}
        />

        <BankDetails
          form={form}
          applicantType="applicant"
          applicantIndex={0}
          getFieldPath={getApplicantFieldPath}
        />

        <AdditionalIncome
          form={form}
          applicantType="applicant"
          applicantIndex={0}
          getFieldPath={getApplicantFieldPath}
        />
      </div>

      {/* Co-Applicant Work and Bank Details */}
      {form.watch("hasCoApplicant") &&
        coApplicants.map((coApp, index) => (
          <div
            key={coApp.id}
            className="space-y-6 mt-8 pt-6 border-t border-gray-200"
          >
            <div>{coApp.name}</div>
            <YourWork
              form={form}
              applicantType="applicant"
              applicantIndex={index + 1}
              getFieldPath={getApplicantFieldPath}
            />

            <BankDetails
              form={form}
              applicantType="applicant"
              applicantIndex={index + 1}
              getFieldPath={getApplicantFieldPath}
            />

            <AdditionalIncome
              form={form}
              applicantType="applicant"
              applicantIndex={index + 1}
              getFieldPath={getApplicantFieldPath}
            />
          </div>
        ))}

      {/* Occupant Work and Bank Details */}
      {form.watch("hasOccupants") &&
        occupants.map((occ, index) => (
          <div
            key={occ.id}
            className="space-y-6 mt-8 pt-6 border-t border-gray-200"
          >
            <div>{occ.name}</div>
            <YourWork
              form={form}
              applicantType="occupant"
              applicantIndex={index}
              getFieldPath={getApplicantFieldPath}
            />

            <BankDetails
              form={form}
              applicantType="occupant"
              applicantIndex={index}
              getFieldPath={getApplicantFieldPath}
            />

            <AdditionalIncome
              form={form}
              applicantType="occupant"
              applicantIndex={index}
              getFieldPath={getApplicantFieldPath}
            />
          </div>
        ))}

      {/* Credit History and Background - These are shared for the entire application */}
      <div className="space-y-6 mt-8 pt-6 border-t border-gray-200">
        <CreditHistory form={form} />
        <RentalCriminalHistory form={form} />
      </div>
    </div>
  );
}
