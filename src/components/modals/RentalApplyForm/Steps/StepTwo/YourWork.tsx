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
import {
  DEFAULT_CURRENT_EMPLOYMENT,
  DEFAULT_PREVIOUS_EMPLOYMENT,
} from "@/constants/defaultApplyFormValues";
import { useEffect, useState } from "react";
import { WorkDetails } from "./WorkDetails";
import { Separator } from "@/components/ui/separator";
import { isLessThanYearsAgo } from "@/lib/utils";

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

  // Initialize current employment for non-occupants
  useEffect(() => {
    if (applicantType !== "occupant") {
      const currentEmployment = form.getValues(
        currentEmploymentPath as Path<ApplyFormValues>
      );
      if (!currentEmployment) {
        form.setValue(
          currentEmploymentPath as Path<ApplyFormValues>,
          DEFAULT_CURRENT_EMPLOYMENT
        );
      }
    }
  }, [form, applicantType, applicantIndex, currentEmploymentPath]);

  const startDatePath =
    `${currentEmploymentPath}.startDate` as Path<ApplyFormValues>;
  const currentStartDate = useWatch({
    control: form.control,
    name: startDatePath,
  }) as string | undefined;

    useEffect(() => {
      if (currentStartDate) {
        if (isLessThanYearsAgo(currentStartDate)) {
          setShowPreviousEmployment(true);
          const previousEmployment = form.getValues(
            previousEmploymentPath as Path<ApplyFormValues>
          );
          if (!previousEmployment) {
            form.setValue(
              previousEmploymentPath as Path<ApplyFormValues>,
              DEFAULT_PREVIOUS_EMPLOYMENT
            );
          }
        } else {
          setShowPreviousEmployment(false);
          form.setValue(
            previousEmploymentPath as Path<ApplyFormValues>,
            undefined
          );
        }
      }
    }, [currentStartDate, form, previousEmploymentPath]);

  const currentEmployment = form.watch(
    currentEmploymentPath as Path<ApplyFormValues>
  );
  const hasCurrentEmployment = !!currentEmployment;

  const handleRemoveWork = () => {
    form.setValue(currentEmploymentPath as Path<ApplyFormValues>, undefined);
    form.setValue(previousEmploymentPath as Path<ApplyFormValues>, undefined);
    setShowPreviousEmployment(false);
    form.trigger();
  };

  const handleAddWork = () => {
    form.setValue(
      currentEmploymentPath as Path<ApplyFormValues>,
      DEFAULT_CURRENT_EMPLOYMENT
    );
    form.trigger();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium underline">YOUR WORK</h3>

        {applicantType === "occupant" && hasCurrentEmployment && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemoveWork}
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
          onClick={handleAddWork}
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
