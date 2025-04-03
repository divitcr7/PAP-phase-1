import { UseFormReturn, Path } from "react-hook-form";
import { ApplicantType, ApplyFormValues } from "@/schemas/ApplyForm/ApplyForm";
import { FormInputField } from "../../common/FormFields";
import { Button } from "@/components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useCallback } from "react";
import { CustomDropdown } from "../../common/CustomDropdown";
import { ACCOUNT_TYPES } from "@/constants/accountType";

interface BankDetailsProps {
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

export function BankDetails({
  form,
  applicantType,
  applicantIndex,
  getFieldPath,
}: BankDetailsProps) {
  // Helper function to get field paths with proper typing
  const getField = useCallback(
    (fieldName: string): Path<ApplyFormValues> => {
      return `${getFieldPath(
        applicantType,
        applicantIndex,
        "bankDetails"
      )}.${fieldName}` as Path<ApplyFormValues>;
    },
    [applicantType, applicantIndex, getFieldPath]
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-start">
        <h3 className="text-lg font-medium underline">BANK INFORMATION</h3>
      </div>

      <div className="grid grid-cols-12 gap-4">
        <FormInputField
          form={form}
          name={getField("bankName")}
          label="Bank Name"
          required
          className="col-span-4"
        />

        <FormInputField
          form={form}
          name={getField("bankAccountNumber")}
          label="Account Number"
          required
          type="password"
          className="col-span-3"
        />

        <FormInputField
          form={form}
          name={getField("bankBranch")}
          label="Branch"
          className="col-span-2"
        />

        <FormField
          control={form.control}
          name={getField("bankAccountType")}
          render={({ field }) => (
            <FormItem className="col-span-3">
              <div className="flex items-center gap-2 w-full">
                <FormLabel className="min-w-fit" required={true}>
                  Account Type
                </FormLabel>
                <FormControl>
                  <CustomDropdown
                    type="accountType"
                    options={ACCOUNT_TYPES}
                    value={field.value}
                    onChange={field.onChange}
                    showSearch={false}
                    placeholder="Account Type"
                    className="w-full"
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
          name={getField("bankRoutingNumber")}
          label="Routing Number"
          required
          type="password"
          className="w-[25%]"
        />

        <FormInputField
          form={form}
          name={getField("bankAccountOpenDate")}
          label="Account Open Date"
          type="date"
          className="w-fit"
        />

        <FormField
          control={form.control}
          name={getField("bankStatements")}
          render={({ field }) => (
            <FormItem className="flex-1">
              <div className="flex items-center gap-3">
                <FormLabel className="whitespace-nowrap m-0" required>
                  Last 5 Months Bank Statements (PDF format)
                </FormLabel>
                <FormControl>
                  <div className="flex gap-2 items-center flex-1">
                    <Input
                      id="bankStatements"
                      type="file"
                      accept=".pdf"
                      multiple
                      onChange={(e) => {
                        field.onChange(e.target.files);
                      }}
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        document.getElementById("bankStatements")?.click();
                      }}
                      className="whitespace-nowrap"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload
                    </Button>
                  </div>
                </FormControl>
              </div>
              <FormMessage />
              <p className="text-xs text-muted-foreground mt-1">
                Please upload your last 5 months of bank statements in PDF
                format. This information will be kept confidential.
              </p>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
