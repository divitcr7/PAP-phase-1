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
import { ApplicantDisplay } from "../../common/ApplicantDisplay";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { ChevronRight, Trash2 } from "lucide-react";
import { Path } from "react-hook-form";
import { useCallback, useEffect } from "react";

interface StepTwoProps {
  form: UseFormReturn<ApplyFormValues>;
  applicants: ApplicantInfo[];
  occupants?: ApplicantInfo[];
}

export default function StepTwo({
  form,
  applicants,
  occupants = [],
}: StepTwoProps) {
  const primaryApplicant = applicants[0];
  const coApplicants = applicants.slice(1);

  const hasOccupantSection = useCallback(
    (occupantIndex: number, sectionName: string) => {
      const path = getApplicantFieldPath(
        "occupant",
        occupantIndex,
        sectionName
      ) as Path<ApplyFormValues>;
      return !!form.getValues(path);
    },
    [form]
  );

  const hasAnyOccupantDetails = useCallback(
    (occupantIndex: number) => {
      return (
        hasOccupantSection(occupantIndex, "currentEmployment") ||
        hasOccupantSection(occupantIndex, "bankDetails") ||
        hasOccupantSection(occupantIndex, "additionalIncomes")
      );
    },
    [hasOccupantSection]
  );

  const addOccupantSection = useCallback(
    (occupantIndex: number) => {
      const additionalIncomesPath = getApplicantFieldPath(
        "occupant",
        occupantIndex,
        "additionalIncomes"
      ) as Path<ApplyFormValues>;

      form.setValue(additionalIncomesPath, []);

      form.trigger();
    },
    [form]
  );

  const removeAllOccupantDetails = useCallback(
    (occupantIndex: number) => {
      // Set all sections to undefined
      const currentEmploymentPath = getApplicantFieldPath(
        "occupant",
        occupantIndex,
        "currentEmployment"
      ) as Path<ApplyFormValues>;

      const bankDetailsPath = getApplicantFieldPath(
        "occupant",
        occupantIndex,
        "bankDetails"
      ) as Path<ApplyFormValues>;

      const additionalIncomesPath = getApplicantFieldPath(
        "occupant",
        occupantIndex,
        "additionalIncomes"
      ) as Path<ApplyFormValues>;

      // Set all values to undefined
      form.setValue(currentEmploymentPath, undefined);
      form.setValue(bankDetailsPath, undefined);
      form.setValue(additionalIncomesPath, undefined);

      // Force re-render
      form.trigger();
    },
    [form]
  );

  useEffect(() => {
    if (form.getValues("hasOccupants") && occupants.length > 0) {
      occupants.forEach((_, index) => {
        if (hasAnyOccupantDetails(index)) {
          removeAllOccupantDetails(index);
        }
      });
    }
  }, [form, occupants, hasAnyOccupantDetails, removeAllOccupantDetails]);

  return (
    <div className="space-y-6">
      <div className="space-y-6 border border-gray-200 rounded-md py-2 px-4">
        <ApplicantDisplay
          applicantType="applicant"
          applicantIndex={0}
          name={primaryApplicant?.name}
        />
        <YourWork
          form={form}
          applicantType="applicant"
          applicantIndex={0}
          getFieldPath={getApplicantFieldPath}
        />

        <Separator />
        <BankDetails
          form={form}
          applicantType="applicant"
          applicantIndex={0}
          getFieldPath={getApplicantFieldPath}
        />

        <Separator />
        <AdditionalIncome
          form={form}
          applicantType="applicant"
          applicantIndex={0}
          getFieldPath={getApplicantFieldPath}
        />
      </div>

      {/* Co-Applicant Work and Bank Details */}
      {form.getValues("hasCoApplicant") &&
        coApplicants.map((coApp, index) => (
          <div
            key={coApp.id}
            className="space-y-6 mt-8 border border-gray-200 rounded-md py-2 px-4"
          >
            <ApplicantDisplay
              applicantType="applicant"
              applicantIndex={index + 1}
              name={coApp?.name}
            />
            <YourWork
              form={form}
              applicantType="applicant"
              applicantIndex={index + 1}
              getFieldPath={getApplicantFieldPath}
            />

            <Separator />
            <BankDetails
              form={form}
              applicantType="applicant"
              applicantIndex={index + 1}
              getFieldPath={getApplicantFieldPath}
            />

            <Separator />
            <AdditionalIncome
              form={form}
              applicantType="applicant"
              applicantIndex={index + 1}
              getFieldPath={getApplicantFieldPath}
            />
          </div>
        ))}

      {/* Occupant Work and Bank Details */}
      {form.getValues("hasOccupants") &&
        occupants.map((occ, index) => (
          <div
            key={occ.id}
            className="mt-8 border border-gray-200 rounded-md py-2 px-4"
          >
            {!hasAnyOccupantDetails(index) ? (
              <div className="flex items-center justify-between py-2">
                <ApplicantDisplay
                  applicantType="occupant"
                  applicantIndex={index}
                  name={occ?.name}
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    addOccupantSection(index);
                  }}
                  className="flex items-center gap-1"
                >
                  <ChevronRight className="h-4 w-4" />
                  Add Details for Occupant {index + 1}
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <ApplicantDisplay
                    applicantType="occupant"
                    applicantIndex={index}
                    name={occ?.name}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removeAllOccupantDetails(index)}
                    className="rounded-full hover:bg-destructive/10 transition-colors"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>

                <YourWork
                  form={form}
                  applicantType="occupant"
                  applicantIndex={index}
                  name={occ?.name}
                  getFieldPath={getApplicantFieldPath}
                />

                <Separator />
                <BankDetails
                  form={form}
                  applicantType="occupant"
                  applicantIndex={index}
                  getFieldPath={getApplicantFieldPath}
                />

                <Separator />
                <AdditionalIncome
                  form={form}
                  applicantType="occupant"
                  applicantIndex={index}
                  getFieldPath={getApplicantFieldPath}
                />
              </div>
            )}
          </div>
        ))}

      {/* Credit History and Background - These are shared for the entire application */}
      <Separator />
      <div className="space-y-6 mt-8 pt-6 border-gray-200">
        <CreditHistory form={form} />
        <RentalCriminalHistory form={form} />
      </div>
    </div>
  );
}