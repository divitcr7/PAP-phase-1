import { UseFormReturn, Path, useWatch } from "react-hook-form";
import { ApplicantType, ApplyFormValues } from "@/schemas/ApplyForm/ApplyForm";
import { FormInputField, FormCurrencyField } from "../../common/FormFields";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CustomDropdown } from "../../common/CustomDropdown";
import { todaysDate } from "@/lib/utils";

interface WorkDetailsProps {
  form: UseFormReturn<ApplyFormValues>;
  type: "current" | "previous";
  applicantType: ApplicantType;
  applicantIndex: number;
  isRequired: boolean;
  currentEmploymentStartDate?: string;
  previousEmploymentDateFrom?: string;
  previousEmploymentDateTo?: string;
  getFieldPath: (
    applicantType: ApplicantType,
    index: number,
    fieldName: string
  ) => string;
}

export function WorkDetails({
  form,
  type,
  applicantType,
  applicantIndex,
  isRequired,
  currentEmploymentStartDate,
  getFieldPath,
}: WorkDetailsProps) {
  const prefix = type === "current" ? "current" : "previous";

  const employmentPath = getFieldPath(
    applicantType,
    applicantIndex,
    `${prefix}Employment`
  );
  const getFieldName = (field: string): Path<ApplyFormValues> => {
    return `${employmentPath}.${field}` as Path<ApplyFormValues>;
  };

    const previousDateFromPath =
      `${employmentPath}.dateFrom` as Path<ApplyFormValues>;
    const previousDateToPath =
      `${employmentPath}.dateTo` as Path<ApplyFormValues>;

    const previousEmploymentDateFrom = useWatch({
      control: form.control,
      name: previousDateFromPath,
    }) as string | undefined;

    const previousEmploymentDateTo = useWatch({
      control: form.control,
      name: previousDateToPath,
    }) as string | undefined;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4">
        <FormInputField
          form={form}
          name={getFieldName("employer")}
          label="Current Employer"
          required={isRequired}
          className="col-span-2"
          placeholder="e.g. Texas Instruments"
        />

        <FormInputField
          form={form}
          name={getFieldName("position")}
          label="Position"
          className="col-span-1"
          placeholder="e.g. Software Engineer"
        />

        <FormCurrencyField
          form={form}
          name={getFieldName("grossMonthlyIncome")}
          label="Gross Monthly Income"
          placeholder="4500.00"
        />
      </div>

      <div className="flex gap-4">
        <FormInputField
          form={form}
          name={getFieldName("workAddress")}
          label="Address"
          className="flex-1"
          placeholder="e.g. 12500 TI Blvd"
        />

        <FormInputField
          form={form}
          name={getFieldName("workCity")}
          label="City"
          placeholder="e.g. Dallas"
        />

        <FormField
          control={form.control}
          name={getFieldName("workState")}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="min-w-fit" required={isRequired}>
                  State
                </FormLabel>
                <FormControl>
                  <CustomDropdown
                    type="state"
                    value={(field.value as string) || ""}
                    onChange={field.onChange}
                    placeholder="State"
                    className="w-[120px]"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormInputField
          form={form}
          name={getFieldName("workZip")}
          label="ZIP"
          inputClassName="w-[100px]"
          placeholder="e.g. 75243"
        />
      </div>

      <div className="flex gap-4">
        {type == "current" ? (
          <FormInputField
            form={form}
            name={getFieldName("startDate")}
            label="Beginning Date"
            type="date"
            max={todaysDate}
          />
        ) : (
          <>
            <FormInputField
              form={form}
              name={getFieldName("dateFrom")}
              label="Date: From"
              type="date"
              max={previousEmploymentDateTo || currentEmploymentStartDate || todaysDate}
            />

            <FormInputField
              form={form}
              name={getFieldName("dateTo")}
              label="To"
              type="date"
              min = {previousEmploymentDateFrom || todaysDate}
              max = {previousEmploymentDateTo || todaysDate}
            />
          </>
        )}
        <FormInputField
          form={form}
          name={getFieldName("workPhone")}
          label="Work Phone"
          type="tel"
          inputClassName="w-[140px]"
          placeholder="(214) 555-1234"
        />
        <FormInputField
          form={form}
          name={getFieldName("supervisor")}
          label="Supervisor"
          className="flex-1"
          placeholder="e.g. John Smith"
        />
        <FormInputField
          form={form}
          name={getFieldName("supervisorPhone")}
          label="Phone (Supervisor)"
          type="tel"
          inputClassName="w-[140px]"
          placeholder="(214) 555-1234"
        />
      </div>
    </div>
  );
}
