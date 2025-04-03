import { UseFormReturn, Path } from "react-hook-form";
import { ApplicantType, ApplyFormValues } from "@/schemas/ApplyForm/ApplyForm";
import { FormInputField, FormCurrencyField } from "../../common/FormFields";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { CustomDropdown } from "../../common/CustomDropdown";

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
  // Get the base paths for this applicant's employment details
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

  // Helper function to create properly typed field paths
  const getFieldName = (
    basePath: string,
    field: string
  ): Path<ApplyFormValues> => {
    return `${basePath}.${field}` as Path<ApplyFormValues>;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-start">
        <h3 className="text-lg font-medium underline">YOUR WORK</h3>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <FormInputField
          form={form}
          name={getFieldName(currentEmploymentPath, "employer")}
          label="Current Employer"
          required
          className="col-span-2"
        />

        <FormInputField
          form={form}
          name={getFieldName(currentEmploymentPath, "position")}
          label="Position"
          className="col-span-1"
        />

        <FormCurrencyField
          form={form}
          name={getFieldName(currentEmploymentPath, "grossMonthlyIncome")}
          label="Gross Monthly Income"
        />
      </div>

      <div className="flex gap-4">
        <FormInputField
          form={form}
          name={getFieldName(currentEmploymentPath, "startDate")}
          label="Beginning Date"
          type="date"
        />

        <FormInputField
          form={form}
          name={getFieldName(currentEmploymentPath, "workAddress")}
          label="Address"
          className="flex-1"
        />

        <FormInputField
          form={form}
          name={getFieldName(currentEmploymentPath, "workCity")}
          label="City"
        />

        <FormField
          control={form.control}
          name={getFieldName(currentEmploymentPath, "workState")}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="min-w-fit" required>
                  "State"
                </FormLabel>
                <FormControl>
                  <CustomDropdown
                    type="state"
                    value={(field.value as string) || ""}
                    onChange={field.onChange}
                    placeholder="state"
                    className="w-[120px]"
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className="flex gap-4">
        <FormInputField
          form={form}
          name={getFieldName(currentEmploymentPath, "workPhone")}
          label="Work Phone"
          type="tel"
          inputClassName="w-[140px]"
        />

        <FormInputField
          form={form}
          name={getFieldName(currentEmploymentPath, "supervisor")}
          label="Supervisor"
          className="flex-1"
        />

        <FormInputField
          form={form}
          name={getFieldName(currentEmploymentPath, "supervisorPhone")}
          label="Phone (Supervisor)"
          type="tel"
          inputClassName="w-[140px]"
        />

        <FormInputField
          form={form}
          name={getFieldName(currentEmploymentPath, "workZip")}
          label="ZIP"
          inputClassName="w-[100px]"
        />
      </div>

      <Accordion type="single" collapsible>
        <AccordionItem value="previous-employment">
          <AccordionTrigger className="font-medium italic underline">
            Fill out if you have been with your current employer for less than
            five years.
          </AccordionTrigger>
          <AccordionContent className="space-y-4">
            <div className="grid grid-cols-4 gap-4">
              <FormInputField
                form={form}
                name={getFieldName(previousEmploymentPath, "employer")}
                label="Previous Employer (Most Recent)"
                className="col-span-2"
              />

              <FormInputField
                form={form}
                name={getFieldName(previousEmploymentPath, "position")}
                label="Position"
                className="col-span-1"
              />

              <FormCurrencyField
                form={form}
                name={getFieldName(
                  previousEmploymentPath,
                  "grossMonthlyIncome"
                )}
                label="Gross Monthly Income"
              />
            </div>

            <div className="flex gap-4">
              <FormInputField
                form={form}
                name={getFieldName(previousEmploymentPath, "workAddress")}
                label="Address"
                className="flex-1"
              />

              <FormInputField
                form={form}
                name={getFieldName(previousEmploymentPath, "workCity")}
                label="City"
              />

              <FormField
                control={form.control}
                name={getFieldName(previousEmploymentPath, "workState")}
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2">
                      <FormLabel className="min-w-fit" required>
                        "State"
                      </FormLabel>
                      <FormControl>
                        <CustomDropdown
                          type="state"
                          value={(field.value as string) || ""}
                          onChange={field.onChange}
                          placeholder="state"
                          className="w-[120px]"
                        />
                      </FormControl>
                    </div>
                  </FormItem>
                )}
              />

              <FormInputField
                form={form}
                name={getFieldName(previousEmploymentPath, "workPhone")}
                label="Work Phone"
                type="tel"
                inputClassName="w-[140px]"
              />

              <FormInputField
                form={form}
                name={getFieldName(previousEmploymentPath, "workZip")}
                label="ZIP"
                inputClassName="w-[100px]"
              />
            </div>

            <div className="flex gap-4">
              <FormInputField
                form={form}
                name={getFieldName(previousEmploymentPath, "dateFrom")}
                label="Date: From"
                type="date"
              />

              <FormInputField
                form={form}
                name={getFieldName(previousEmploymentPath, "dateTo")}
                label="To"
                type="date"
              />

              <FormInputField
                form={form}
                name={getFieldName(previousEmploymentPath, "supervisor")}
                label="Supervisor"
                className="flex-1"
              />

              <FormInputField
                form={form}
                name={getFieldName(previousEmploymentPath, "supervisorPhone")}
                label="Phone (Supervisor)"
                type="tel"
                inputClassName="w-[140px]"
              />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
