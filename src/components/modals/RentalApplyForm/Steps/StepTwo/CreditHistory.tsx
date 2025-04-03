import { UseFormReturn } from "react-hook-form";
import { ApplyFormValues } from "@/schemas/ApplyForm/ApplyForm";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";

export function CreditHistory({
  form,
}: {
  form: UseFormReturn<ApplyFormValues>;
}) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium underline">CREDIT HISTORY</h3>
      <FormField
        control={form.control}
        name="creditHistory.creditProblems"
        render={({ field }) => (
          <FormItem>
            <FormLabel>
              If applicable, please explain any past credit problems:
            </FormLabel>
            <FormControl>
              <Textarea {...field} className="min-h-[100px]" />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
