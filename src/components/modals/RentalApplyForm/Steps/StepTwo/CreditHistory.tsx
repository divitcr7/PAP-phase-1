import { UseFormReturn } from "react-hook-form";
import { ApplyFormValues } from "@/schemas/ApplyForm/ApplyForm";
import { FormTextareaField } from "../../common/FormFields";

export function CreditHistory({
  form,
}: {
  form: UseFormReturn<ApplyFormValues>;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium underline">CREDIT HISTORY</h3>
      <FormTextareaField
        labelClassName="mb-2 text-sm font-medium"
        textareaClassName="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500"
        form={form}
        name="creditHistory.creditProblems"
        label="If applicable, please explain any past credit problems:"
        rows={15}
        maxChars={500}
        placeholder="Please provide details about any past credit issues, including bankruptcies, late payments, or other credit problems."
      />
    </div>
  );
}
