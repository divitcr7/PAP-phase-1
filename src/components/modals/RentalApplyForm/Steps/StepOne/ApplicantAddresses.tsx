import { useEffect, useState, useCallback } from "react";
import { UseFormReturn, useWatch, Path } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WhereYouLive } from "./WhereYouLive";
import {
  ApplyFormValues,
  ExistingAddress,
  ApplicantType
} from "@/schemas/ApplyForm/ApplyForm";
import { Separator } from "@/components/ui/separator";
import { ApplicantDisplay } from "../../common/ApplicantDisplay";

interface ApplicantAddressesProps {
  form: UseFormReturn<ApplyFormValues>;
  applicantType: ApplicantType;
  applicantIndex: number;
  applicantName: string;
  existingAddresses?: ExistingAddress[];
  onAddressSelect?: (value: string) => void;
  getFieldPath: (
    applicantType: ApplicantType,
    index: number,
    fieldName: string
  ) => string;
}

export function ApplicantAddresses({
  form,
  applicantType,
  applicantIndex,
  applicantName,
  existingAddresses,
  onAddressSelect,
  getFieldPath,
}: ApplicantAddressesProps) {
  const [showPreviousAddress, setShowPreviousAddress] = useState(false);

  // Get residency start date for this applicant
  const residencyStartDatePath = getFieldPath(
    applicantType,
    applicantIndex,
    "residencyStartDate"
  );

  // Fix: Explicitly type the return value as string
  const residencyStartDate = useWatch({
    control: form.control,
    name: residencyStartDatePath as Path<ApplyFormValues>,
  }) as string | undefined;

  // Memoize the resetPreviousFields function to avoid recreating it on every render
  const resetPreviousFields = useCallback(() => {
    const fieldsToReset = [
      "previousAddress",
      "previousCity",
      "previousState",
      "previousZIP",
      "previousOwnerPhone",
      "previousResidenceType",
      "previousDateFrom",
      "previousDateTo",
      "previousApartmentName",
      "previousOwnerName",
      "previousMonthlyPayment",
      "previousReasonForLeaving",
    ];

    fieldsToReset.forEach((field) => {
      form.setValue(
        getFieldPath(
          applicantType,
          applicantIndex,
          field
        ) as Path<ApplyFormValues>,
        ""
      );
    });
  }, [form, getFieldPath, applicantType, applicantIndex]);

  // Check if previous address is needed based on residency start date
  useEffect(() => {
    if (residencyStartDate) {
      const startDate = new Date(residencyStartDate);
      const today = new Date();
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(today.getFullYear() - 5);
      
      if (startDate > fiveYearsAgo) {
        setShowPreviousAddress(true);
      } else {
        setShowPreviousAddress(false);
        resetPreviousFields();
      }
    }
  }, [residencyStartDate, resetPreviousFields]);

  return (
    <div className="space-y-4 border border-gray-200 rounded-md py-2 px-4">
      <ApplicantDisplay
        applicantType={applicantType}
        applicantIndex={applicantIndex}
        name={applicantName}
      />
      {/* Current address */}
      <WhereYouLive
        form={form}
        type="current"
        applicantType={applicantType}
        applicantIndex={applicantIndex}
        residencyStartDate={residencyStartDate}
        existingAddresses={existingAddresses}
        onAddressSelect={onAddressSelect}
        getFieldPath={getFieldPath}
      />

      {/* Previous address - only show if residency start date is less than 5 years ago */}
      {showPreviousAddress && (
        <>
          <Separator />
          <Accordion type="single" value="previous" collapsible={false}>
            <AccordionItem value="previous">
              <AccordionTrigger className="underline font-medium">
                Fill it out as you have been at your current address for less
                than five years.
              </AccordionTrigger>
              <AccordionContent>
                <WhereYouLive
                  form={form}
                  type="previous"
                  applicantType={applicantType}
                  applicantIndex={applicantIndex}
                  residencyStartDate={residencyStartDate}
                  getFieldPath={getFieldPath}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </div>
  );
}
