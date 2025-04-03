import { UseFormReturn, Path } from "react-hook-form";
import { formatPhoneNumber } from "@/lib/utils";
import { ApplyFormValues, occupantSchema } from "@/schemas/ApplyForm/ApplyForm";
import { CustomDropdown } from "../../common/CustomDropdown";
import { z } from "zod";
import { FormInputField, FormCheckboxField } from "../../common/FormFields";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { DEFAULT_STATE } from "@/constants/states";
import { useCallback, useEffect } from "react";
import { IDTypeDropdown } from "../../common/IDTypeDropdown";

type OccupantFields = z.infer<typeof occupantSchema>;

interface OccupantProps {
  form: UseFormReturn<ApplyFormValues>;
  occupantIndex: number;
  min18Years: string;
}

export default function Occupant({
  form,
  occupantIndex,
  min18Years,
}: OccupantProps) {
  // Helper function to get field path for occupant
  const getFieldName = useCallback(
    <K extends keyof OccupantFields["personalInfo"]>(
      field: K
    ): Path<ApplyFormValues> => {
      return `occupants.${occupantIndex}.personalInfo.${String(
        field
      )}` as Path<ApplyFormValues>;
    },
    [occupantIndex]
  );

  // Set default values when component mounts
  useEffect(() => {
    // Set default US citizen status if not already set
    if (form.getValues(getFieldName("isUSCitizen")) === undefined) {
      form.setValue(getFieldName("isUSCitizen"), true);
    }

    // Set default state values if US citizen
    if (form.getValues(getFieldName("isUSCitizen"))) {
      if (!form.getValues(getFieldName("driverLicenseState"))) {
        form.setValue(getFieldName("driverLicenseState"), DEFAULT_STATE);
      }
      if (!form.getValues(getFieldName("governmentIDState"))) {
        form.setValue(getFieldName("governmentIDState"), DEFAULT_STATE);
      }
    }
  }, [form, occupantIndex, getFieldName]);

  // Determine if the occupant is a US citizen
  const isUSCitizen = form.watch(getFieldName("isUSCitizen")) !== false;

  return (
    <div className="space-y-4 px-4">
      <div className="flex gap-4">
        <FormInputField
          form={form}
          name={getFieldName("fullName")}
          label="Full Name"
          required
          placeholder="John Doe"
          className="flex-1"
        />

        <FormInputField
          form={form}
          name={getFieldName("birthdate")}
          label="Birthdate"
          required
          type="date"
          max={min18Years}
          className="w-[250px]"
        />

        <FormCheckboxField
          form={form}
          name={getFieldName("isUSCitizen")}
          label="US Citizen"
          options={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
        />

        <FormInputField
          form={form}
          name={getFieldName("cellPhone")}
          label="Phone"
          required
          placeholder="(281) 555-0123"
          type="tel"
          maxLength={14}
          className="w-[250px]"
          onChange={(e) => {
            const formatted = formatPhoneNumber(e.target.value);
            form.setValue(getFieldName("cellPhone"), formatted);
          }}
        />
      </div>

      <div className="flex gap-4">
        <FormInputField
          form={form}
          name={getFieldName("relationship")}
          label="Relationship"
          required
          placeholder="Child, Parent, etc."
          className="flex-1"
        />

        <FormInputField
          form={form}
          name={getFieldName("socialSecurity")}
          label="Social Security No."
          required
          placeholder="123-45-6789"
          type="password"
          className="w-[350px]"
        />

        <FormInputField
          form={form}
          name={getFieldName("driverLicense")}
          label="Driver License"
          required
          placeholder="12345678"
        />

        <FormField
          control={form.control}
          name={getFieldName("driverLicenseState")}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="min-w-fit" required>
                  {isUSCitizen ? "State" : "Country"} (DL)
                </FormLabel>
                <FormControl>
                  <CustomDropdown
                    type={isUSCitizen ? "state" : "country"}
                    value={(field.value as string) || ""}
                    onChange={field.onChange}
                    placeholder={`Select ${isUSCitizen ? "state" : "country"}`}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex gap-4">
        <FormField
          control={form.control}
          name={getFieldName("governmentIDType")}
          render={({ field }) => (
            <FormItem className="">
              <div className="flex items-center gap-2">
                <FormLabel className="min-w-fit" required>
                  Government ID Type
                </FormLabel>
                <FormControl>
                  <IDTypeDropdown
                    value={(field.value as string) || ""}
                    onChange={field.onChange}
                    isUSCitizen={isUSCitizen}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />

        <FormInputField
          form={form}
          name={getFieldName("governmentID")}
          label="Government ID"
          required
          placeholder="TX12345678"
          className="w-[280px]"
        />

        <FormField
          control={form.control}
          name={getFieldName("governmentIDState")}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="min-w-fit" required>
                  {isUSCitizen ? "State" : "Country"} (Gov ID)
                </FormLabel>
                <FormControl>
                  <CustomDropdown
                    type={isUSCitizen ? "state" : "country"}
                    value={(field.value as string) || ""}
                    onChange={field.onChange}
                    placeholder={`Select ${isUSCitizen ? "state" : "country"}`}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
