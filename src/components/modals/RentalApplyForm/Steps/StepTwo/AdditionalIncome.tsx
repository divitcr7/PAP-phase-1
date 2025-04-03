import { UseFormReturn, Path } from "react-hook-form";
import { ApplicantType, ApplyFormValues } from "@/schemas/ApplyForm/ApplyForm";
import { FormInputField, FormCurrencyField } from "../../common/FormFields";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { DEFAULT_ADDITIONAL_INCOME } from "@/constants/defaultApplyFormValues";
import { useCallback } from "react";

interface AdditionalIncomeProps {
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

// Define the structure of an additional income item
interface AdditionalIncomeItem {
  type: string;
  source: string;
  amount: string | number;
}

export function AdditionalIncome({
  form,
  applicantType,
  applicantIndex,
  getFieldPath,
}: AdditionalIncomeProps) {
  // Get the base path for this applicant's additional incomes
  const basePath = getFieldPath(
    applicantType,
    applicantIndex,
    "additionalIncomes"
  );

  // Helper function to create properly typed field paths
  const getFieldName = useCallback(
    (
      index: number,
      field: keyof AdditionalIncomeItem
    ): Path<ApplyFormValues> => {
      return `${basePath}.${index}.${field}` as Path<ApplyFormValues>;
    },
    [basePath]
  );

  // Get the current additional incomes array for this applicant
  const additionalIncomes =
    form.watch(basePath as Path<ApplyFormValues>) ||
    ([] as AdditionalIncomeItem[]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-start">
        <h3 className="text-lg font-medium underline">ADDITIONAL INCOME</h3>
      </div>

      <p className="text-sm font-medium italic">
        Income must be verified to be considered
      </p>

      {additionalIncomes.map((_: AdditionalIncomeItem, index: number) => (
        <div key={index} className="grid grid-cols-3 gap-4 items-start">
          <FormInputField
            form={form}
            name={getFieldName(index, "type")}
            label="Type"
          />

          <FormInputField
            form={form}
            name={getFieldName(index, "source")}
            label="Source"
          />

          <div className="flex gap-2">
            <FormCurrencyField
              form={form}
              name={getFieldName(index, "amount")}
              label="Gross Monthly"
              className="flex-1"
            />

            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => {
                const incomes = [...additionalIncomes];
                incomes.splice(index, 1);
                form.setValue(basePath as Path<ApplyFormValues>, incomes);
              }}
              className="mt-8"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => {
          const incomes = [
            ...additionalIncomes,
            { ...DEFAULT_ADDITIONAL_INCOME },
          ];
          form.setValue(basePath as Path<ApplyFormValues>, incomes);
        }}
        className="flex items-center gap-1"
      >
        <Plus className="h-4 w-4" /> Add Additional Income
      </Button>
    </div>
  );
}
