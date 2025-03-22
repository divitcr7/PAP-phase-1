import { UseFormReturn } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ApplyFormValues } from "@/schemas/ApplyForm";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatPhoneNumber } from "@/lib/utils";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { US_STATES } from "@/constants/states";
import { GOVERNMENT_ID_TYPES, INTERNATIONAL_ID_TYPES } from "@/constants/identification";
import { COUNTRIES } from "@/constants/countries";

interface AboutYouProps {
  form: UseFormReturn<ApplyFormValues>;
  type: "primary" | "co-applicant";
  index?: number;
  min18Years: string;
  isUSCitizen: boolean;
}

export function AboutYou({
  form,
  type,
  index = 0,
  min18Years,
  isUSCitizen,
}: AboutYouProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium underline">
        {type === "primary" ? "ABOUT YOU" : `CO-APPLICANT ${index + 1}`}
      </h3>
      <div className="grid grid-cols-12 gap-12">
        {/* Full Name section */}
        <FormField
          control={form.control}
          name={
            type === "primary" ? "fullName" : `coApplicants.${index}.fullName`
          }
          render={({ field }) => (
            <FormItem className="col-span-6">
              <div className="flex items-center gap-2">
                <FormLabel className="min-w-fit" required>
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Doe" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Citizen */}
        <FormField
          control={form.control}
          name="isUSCitizen"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <div className="flex items-center gap-4 h-9">
                <FormLabel required>US Citizen</FormLabel>
                <FormControl>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === true}
                        onCheckedChange={() =>
                          form.setValue("isUSCitizen", true)
                        }
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === false}
                        onCheckedChange={() =>
                          form.setValue("isUSCitizen", false)
                        }
                      />
                      <span>No</span>
                    </label>
                  </div>
                </FormControl>
              </div>
            </FormItem>
          )}
        />

        {/* Birthdate */}
        <FormField
          control={form.control}
          name="birthdate"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <div className="flex items-center gap-2 max-w-fit">
                <FormLabel className="min-w-fit" required>
                  Birthdate
                </FormLabel>
                <FormControl>
                  <Input {...field} type="date" max={min18Years} />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      </div>

      <Accordion type="single" collapsible className="">
        <AccordionItem value="former-name">
          <AccordionTrigger className="underline">
            Former Name (If applicable)
          </AccordionTrigger>
          <AccordionContent>
            <FormField
              control={form.control}
              name="formerName"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel className="min-w-fit">
                      Former Full Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="John Smith"
                        className="max-w-[600px]"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="grid grid-cols-3 gap-8">
        <FormField
          control={form.control}
          name="socialSecurity"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="min-w-fit" required>
                  Social Security No.
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="123-45-6789" type="password" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="driverLicense"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="min-w-fit" required>
                  Driver License
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="12345678" />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="driverLicenseState"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="min-w-fit" required>
                  {isUSCitizen
                    ? "State (Driver License)"
                    : "Country (Driver License)"}
                </FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue
                        placeholder={`Select ${
                          isUSCitizen ? "State" : "Country"
                        }`}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-[150px]">
                    {isUSCitizen
                      ? US_STATES.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))
                      : COUNTRIES.map((country) => (
                          <SelectItem key={country.value} value={country.value}>
                            {country.label}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className="flex gap-12">
        <FormField
          control={form.control}
          name="governmentIDType"
          render={({ field }) => (
            <FormItem className="">
              <div className="flex items-center gap-2">
                <FormLabel className="min-w-fit" required>
                  Government ID Type
                </FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-[290px]">
                      <SelectValue placeholder="Select ID type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {(isUSCitizen
                      ? GOVERNMENT_ID_TYPES
                      : INTERNATIONAL_ID_TYPES
                    ).map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="governmentID"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="min-w-fit" required>
                  Government ID
                </FormLabel>
                <FormControl className="w-full">
                  <Input
                    className="w-full"
                    {...field}
                    placeholder="TX12345678"
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="governmentIDState"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormLabel className="min-w-fit" required>
                  {isUSCitizen ? "State" : "Country"} (Government ID)
                </FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue
                        placeholder={`Select ${
                          isUSCitizen ? "State" : "Country"
                        }`}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="w-[150px]">
                    {US_STATES.map((state) => (
                      <SelectItem key={state.value} value={state.value}>
                        {state.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </FormItem>
          )}
        />
      </div>

      {/* Contact Information */}
      <div className="grid grid-cols-4 gap-6">
        <FormField
          control={form.control}
          name="homePhone"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="min-w-fit">Home Phone</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="(281) 555-0123"
                    type="tel"
                    maxLength={14}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      field.onChange(formatted);
                    }}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cellPhone"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="min-w-fit" required>
                  Cell Phone
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="(281) 555-0123"
                    type="tel"
                    maxLength={14}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      field.onChange(formatted);
                    }}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="workPhonePersonal"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="min-w-fit">Work Phone</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="(281) 555-0123"
                    type="tel"
                    maxLength={14}
                    onChange={(e) => {
                      const formatted = formatPhoneNumber(e.target.value);
                      field.onChange(formatted);
                    }}
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormLabel className="min-w-fit" required>
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="email"
                    placeholder="work@company.com"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      {/* Additional Information */}
      <div className="flex gap-4 justify-between">
        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem className="col-span-3">
              <div className="flex items-center gap-2 h-9">
                <FormLabel className="min-w-fit" required>
                  Gender:
                </FormLabel>
                <FormControl>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "male"}
                        onCheckedChange={() => form.setValue("gender", "male")}
                      />
                      <span>Male</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === "female"}
                        onCheckedChange={() =>
                          form.setValue("gender", "female")
                        }
                      />
                      <span>Female</span>
                    </label>
                  </div>
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isMarried"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4 h-9">
                <FormLabel required>Marital Status</FormLabel>
                <FormControl>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === true}
                        onCheckedChange={() => form.setValue("isMarried", true)}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === false}
                        onCheckedChange={() =>
                          form.setValue("isMarried", false)
                        }
                      />
                      <span>No</span>
                    </label>
                  </div>
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="isSmoker"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4 h-9">
                <FormLabel required>
                  Do you or does any occupant smoke?
                </FormLabel>
                <FormControl>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === true}
                        onCheckedChange={() => form.setValue("isSmoker", true)}
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === false}
                        onCheckedChange={() => form.setValue("isSmoker", false)}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}

export default AboutYou;
