import { UseFormReturn } from "react-hook-form";
import { ApplyFormValues } from "@/schemas/ApplyForm/ApplyForm";
import { FormInputField } from "../../common/FormFields";
import { CustomDropdown } from "../../common/CustomDropdown";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { formatPhoneNumber } from "@/lib/utils";

interface EmergencyContactProps {
  form: UseFormReturn<ApplyFormValues>;
}

export function EmergencyContact({ form }: EmergencyContactProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium underline">EMERGENCY CONTACT</h3>
      <p className="text-sm font-medium italic">
        Emergency contact person over 18 who will not be living with you:
      </p>

      <div className="flex flex-wrap gap-4">
        <FormInputField
          form={form}
          name="emergencyContact.name"
          label="Name"
          required
          placeholder="Full Name"
          className="flex-1"
        />
        <FormInputField
          form={form}
          name="emergencyContact.relationship"
          label="Relationship"
          required
          placeholder="e.g. Parent, Sibling"
          className="w-[35%]"
        />
        <FormInputField
          form={form}
          name="emergencyContact.zip"
          label="ZIP"
          required
          placeholder="12345"
          className="w-[12%]"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <FormInputField
          form={form}
          name="emergencyContact.address"
          label="Address"
          required
          placeholder="Street Address"
          className="flex-1"
        />
        <FormInputField
          form={form}
          name="emergencyContact.city"
          label="City"
          required
          placeholder="City"
          className="w-[25%]"
        />
        <FormField
          control={form.control}
          name="emergencyContact.state"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="min-w-fit">State</FormLabel>
                <FormControl>
                  <CustomDropdown
                    type="state"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select State"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
        <FormInputField
          form={form}
          name="emergencyContact.homePhone"
          label="Home Phone"
          placeholder="(281) 555-0123"
          type="tel"
          maxLength={14}
          onChange={(e) => {
            const formatted = formatPhoneNumber(e.target.value);
            form.setValue("emergencyContact.homePhone", formatted);
          }}
        />
        <FormInputField
          form={form}
          name="emergencyContact.cellPhone"
          label="Cell Phone"
          placeholder="(281) 555-0123"
          type="tel"
          maxLength={14}
          onChange={(e) => {
            const formatted = formatPhoneNumber(e.target.value);
            form.setValue("emergencyContact.cellPhone", formatted);
          }}
        />
        <FormInputField
          form={form}
          name="emergencyContact.workPhone"
          label="Work Phone"
          placeholder="(281) 555-0123"
          type="tel"
          maxLength={14}
          onChange={(e) => {
            const formatted = formatPhoneNumber(e.target.value);
            form.setValue("emergencyContact.workPhone", formatted);
          }}
        />
        <FormInputField
          form={form}
          name="emergencyContact.email"
          label="Email"
          type="email"
          placeholder="email@example.com"
        />
      </div>

      <div className="space-y-4">
        <p className="text-sm">
          If you die or are seriously ill, missing, or incarcerated according to
          an affidavit of (check one or more)
          <FormField
            control={form.control}
            name="emergencyContact.authorizedPersons.abovePerson"
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mx-2 inline-block"
              />
            )}
          />
          the above person,
          <FormField
            control={form.control}
            name="emergencyContact.authorizedPersons.spouse"
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mx-2 inline-block"
              />
            )}
          />
          your spouse, or
          <FormField
            control={form.control}
            name="emergencyContact.authorizedPersons.parentChild"
            render={({ field }) => (
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                className="mx-2 inline-block"
              />
            )}
          />
          your parent or child, we may allow such person(s) to enter your
          dwelling to remove all contents, as well as your property in the
          mailbox, storerooms, and common areas. If no box is checked, any of
          the above are authorized at our option. If you are seriously ill or
          injured, you authorize us to call EMS or send for an ambulance at your
          expense. We're not legally obligated to do so.
        </p>
      </div>
    </div>
  );
}
