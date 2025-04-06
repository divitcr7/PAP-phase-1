import { UseFormReturn, Path, useWatch } from "react-hook-form";
import { ApplicantType, ApplyFormValues } from "@/schemas/ApplyForm/ApplyForm";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { DEFAULT_EMPLOYMENT } from "@/constants/defaultApplyFormValues";
import { useCallback, useEffect, useState } from "react";
import { WorkDetails } from "./WorkDetails";
import { Separator } from "@/components/ui/separator";

interface YourWorkProps {
  form: UseFormReturn<ApplyFormValues>;
  applicantType: ApplicantType;
  applicantIndex: number;
  name?: string;
  getFieldPath: (
    applicantType: ApplicantType,
    index: number,
    fieldName: string
  ) => string;
}

export function YourWork({
  form,
  applicantType,
  applicantIndex,
  getFieldPath,
}: YourWorkProps) {
  const [showPreviousEmployment, setShowPreviousEmployment] = useState(false);
  const isRequired = applicantType !== "occupant";

  const currentEmploymentPath = getFieldPath(
    applicantType,
    applicantIndex,
    "currentEmployment"
  );

  const previousEmploymentPath = getFieldPath(
    applicantType,
    applicantIndex,
    "previousEmployment"
  );

  // Get the current employment start date
  const startDatePath =
    `${currentEmploymentPath}.startDate` as Path<ApplyFormValues>;
  const currentStartDate = useWatch({
    control: form.control,
    name: startDatePath,
  }) as string | undefined;

  const resetPreviousEmployment = useCallback(() => {
    form.setValue(previousEmploymentPath as Path<ApplyFormValues>, undefined);
  }, [form, previousEmploymentPath]);

  useEffect(() => {
    if (currentStartDate) {
      const startDate = new Date(currentStartDate);
      const today = new Date();
      const fiveYearsAgo = new Date();
      fiveYearsAgo.setFullYear(today.getFullYear() - 5);

      if (startDate > fiveYearsAgo) {
        setShowPreviousEmployment(true);
      } else {
        setShowPreviousEmployment(false);
        resetPreviousEmployment();
      }
    }
  }, [currentStartDate, resetPreviousEmployment]);

  const currentEmployment = form.watch(
    currentEmploymentPath as Path<ApplyFormValues>
  );
  const hasCurrentEmployment = !!currentEmployment;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium underline">YOUR WORK</h3>

        {applicantType === "occupant" && hasCurrentEmployment && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => {
              form.setValue(
                currentEmploymentPath as Path<ApplyFormValues>,
                undefined
              );
              form.trigger(); // Force re-render
            }}
            className="rounded-full hover:bg-destructive/10 transition-colors"
          >
            <X className="h-4 w-4 text-destructive" />
          </Button>
        )}
      </div>

      {applicantType === "occupant" && !hasCurrentEmployment ? (
        <Button
          type="button"
          variant="link"
          className="underline"
          size="sm"
          onClick={() => {
            form.setValue(
              currentEmploymentPath as Path<ApplyFormValues>,
              DEFAULT_EMPLOYMENT
            );
            form.trigger(); // Force re-render
          }}
        >
          <Plus className="h-4 w-4 mr-1" /> Add Work Information
        </Button>
      ) : (
        <>
          <WorkDetails
            form={form}
            type="current"
            applicantType={applicantType}
            applicantIndex={applicantIndex}
            isRequired={isRequired}
            getFieldPath={getFieldPath}
          />

          {showPreviousEmployment && (
            <>
              <Separator />
              <Accordion type="single" value="previous" collapsible={false}>
                <AccordionItem value="previous">
                  <AccordionTrigger className="font-medium italic underline">
                    Fill out if you have been with your current employer for
                    less than five years.
                  </AccordionTrigger>
                  <AccordionContent>
                    <WorkDetails
                      form={form}
                      type="previous"
                      applicantType={applicantType}
                      applicantIndex={applicantIndex}
                      isRequired={isRequired}
                      currentEmploymentStartDate={currentStartDate}
                      getFieldPath={getFieldPath}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </>
          )}
        </>
      )}
    </div>
  );
}
