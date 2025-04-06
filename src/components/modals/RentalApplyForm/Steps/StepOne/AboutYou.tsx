import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatPhoneNumber, min18Years } from "@/lib/utils";
import { IDTypeDropdown } from "../../common/IDTypeDropdown";
import { UseFormReturn, Path } from "react-hook-form";
import { ApplyFormValues, applicantInfoSchema } from "@/schemas/ApplyForm/ApplyForm";
import { CustomDropdown } from "../../common/CustomDropdown";
import { z } from "zod";
import { FormInputField, FormCheckboxField } from "../../common/FormFields";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

type ApplicantFields = z.infer<typeof applicantInfoSchema>;

interface AboutYouProps {
  form: UseFormReturn<ApplyFormValues>;
  applicantIndex: number
}

export default function AboutYou({
  form,
  applicantIndex
}: AboutYouProps) {

  const getFieldName = <K extends keyof ApplicantFields>(
    field: K
  ): Path<ApplyFormValues> => {
    return `applicants.${applicantIndex}.${String(
      field
    )}` as Path<ApplyFormValues>;
  };

  // Determine if the applicant is a US citizen
  const isUSCitizen = form.getValues(getFieldName("isUSCitizen")) !== false;

  return (
    <div
      className={`space-y-3 px-4 ${
        applicantIndex === 0
          ? "border border-gray-200 rounded-md py-2 mt-1"
          : ""
      }`}
    >
      <div className="grid grid-cols-12 gap-12">
        {/* Full Name section */}
        <FormInputField
          form={form}
          name={getFieldName("fullName")}
          label="Full Name"
          required
          placeholder="John Doe"
          className="col-span-6"
        />

        {/* Citizen */}
        <FormCheckboxField
          form={form}
          name={getFieldName("isUSCitizen")}
          label="US Citizen"
          required
          className="col-span-3"
          options={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
        />

        {/* Birthdate */}
        <FormInputField
          form={form}
          name={getFieldName("birthdate")}
          label="Birthdate"
          required
          type="date"
          max={min18Years}
          className="col-span-3 w-fit"
        />
      </div>

      <Accordion type="single" collapsible className="">
        <AccordionItem value="former-name">
          <AccordionTrigger className="underline">
            Former Name (If applicable)
          </AccordionTrigger>
          <AccordionContent>
            <FormInputField
              form={form}
              name={getFieldName("formerName")}
              label="Former Full Name"
              placeholder="John Smith"
              inputClassName="max-w-[600px]"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="grid grid-cols-3 gap-8">
        <FormInputField
          form={form}
          name={getFieldName("socialSecurity")}
          label="Social Security No."
          required
          placeholder="123-45-6789"
          type="password"
        />

        <FormInputField
          form={form}
          name={getFieldName("driverLicense")}
          label="Driver License"
          required
          placeholder="12345678"
        />

        {/* State/Country Logic */}
        <FormField
          control={form.control}
          name={getFieldName("driverLicenseState")}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="min-w-fit" required>
                  {isUSCitizen ? "State" : "Country"} (Driver License)
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
            </FormItem>
          )}
        />
      </div>

      <div className="flex gap-12">
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
          inputClassName="w-full"
        />

        <FormField
          control={form.control}
          name={getFieldName("governmentIDState")}
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormLabel className="min-w-fit" required>
                  {isUSCitizen ? "State" : "Country"} (Government ID)
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
            </FormItem>
          )}
        />
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-4 gap-6">
        <FormInputField
          form={form}
          name={getFieldName("homePhone")}
          label="Home Phone"
          placeholder="(281) 555-0123"
          type="tel"
          maxLength={14}
          onChange={(e) => {
            const formatted = formatPhoneNumber(e.target.value);
            form.setValue(getFieldName("homePhone"), formatted);
          }}
        />

        <FormInputField
          form={form}
          name={getFieldName("cellPhone")}
          label="Cell Phone"
          required
          placeholder="(281) 555-0123"
          type="tel"
          maxLength={14}
          onChange={(e) => {
            const formatted = formatPhoneNumber(e.target.value);
            form.setValue(getFieldName("cellPhone"), formatted);
          }}
        />

        <FormInputField
          form={form}
          name={getFieldName("workPhonePersonal")}
          label="Work Phone"
          placeholder="(281) 555-0123"
          type="tel"
          maxLength={14}
          onChange={(e) => {
            const formatted = formatPhoneNumber(e.target.value);
            form.setValue(getFieldName("workPhonePersonal"), formatted);
          }}
        />

        <FormInputField
          form={form}
          name={getFieldName("email")}
          label="Email"
          required
          placeholder="work@company.com"
          type="email"
        />
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-3 gap-4 justify-between">
        <FormCheckboxField
          form={form}
          name={getFieldName("gender")}
          label="Gender:"
          required
          className="col-span-1"
          options={[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
          ]}
        />

        <FormCheckboxField
          form={form}
          name={getFieldName("isMarried")}
          label="Marital Status"
          required
          options={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
        />

        {applicantIndex === 0 && <FormCheckboxField
          form={form}
          name="isSmoker"
          label="Do you or does any occupant smoke?"
          required
          options={[
            { value: true, label: "Yes" },
            { value: false, label: "No" },
          ]}
        />}
      </div>

      {applicantIndex === 0 && <FormInputField
        form={form}
        name="apartmentAddress"
        label="I am applying for the apartment located at"
        required
        placeholder="905 Park Pl Blvd, Rosenberg, TX 77469"
        className="min-w-fit whitespace-nowrap"
      />}
    </div>
  );
}
