import { Plus, Trash2 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import AboutYou from "./AboutYou";
import { WhereYouLive } from "./WhereYouLive";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectValue,
  SelectItem,
} from "@/components/ui/select";
import {
  GOVERNMENT_ID_TYPES,
  INTERNATIONAL_ID_TYPES,
} from "@/constants/identification";
import { US_STATES } from "@/constants/states";
import { COUNTRIES } from "@/constants/countries";

const min18Years = new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)
  .toISOString()
  .split("T")[0];

interface StepOneProps {
  form: UseFormReturn<ApplyFormValues>;
  isUSCitizen: boolean;
  coApplicantsCitizenship?: boolean[];
}

export default function StepOne({
  form,
  isUSCitizen,
  coApplicantsCitizenship,
}: StepOneProps) {
  const residencyStartDate = form.watch("residencyStartDate");
  const previousDateFrom = form.watch("previousDateFrom");
  const previousDateTo = form.watch("previousDateTo");
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
  const requirePreviousAddress =
    residencyStartDate && new Date(residencyStartDate) > fiveYearsAgo;

  return (
    <div className="space-y-6">
      {/* About You */}
      <AboutYou
        form={form}
        type="primary"
        min18Years={min18Years}
        isUSCitizen={isUSCitizen}
      />

      {/* Co-Applicant Section */}
      <div className="space-y-4">
        <FormField
          control={form.control}
          name="hasCoApplicant"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-4">
                <FormLabel>Is there a Co-Applicant?</FormLabel>
                <FormControl>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === true}
                        onCheckedChange={() =>
                          form.setValue("hasCoApplicant", true)
                        }
                      />
                      <span>Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <Checkbox
                        checked={field.value === false}
                        onCheckedChange={() => {
                          form.setValue("hasCoApplicant", false);
                          form.setValue("coApplicants", []);
                        }}
                      />
                      <span>No</span>
                    </label>
                  </div>
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="apartmentAddress"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormLabel className="min-w-fit whitespace-nowrap">
                  I am applying for the apartment located at
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="905 Park Pl Blvd, Rosenberg, TX 77469"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.watch("hasCoApplicant") && (
          <div className="space-y-6">
            {form.watch("coApplicants", [])?.map((_, index) => (
              <div key={index} className="relative">
                <AboutYou
                  form={form}
                  type="co-applicant"
                  index={index}
                  min18Years={min18Years}
                  isUSCitizen={coApplicantsCitizenship?.[index] ?? true}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 right-0"
                  onClick={() => {
                    const coApplicants = form.getValues("coApplicants") || [];
                    coApplicants.splice(index, 1);
                    form.setValue("coApplicants", coApplicants);
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {(form.watch("coApplicants", [])?.length ?? 0) < 3 && (
              <Button
                type="button"
                variant="link"
                className="underline"
                onClick={() => {
                  const coApplicants = form.getValues("coApplicants") || [];
                  form.setValue("coApplicants", [
                    ...coApplicants,
                    {
                      fullName: "",
                      gender: "",
                      birthdate: "",
                      formerName: "",
                      socialSecurity: "",
                      driverLicense: "",
                      driverLicenseState: "",
                      governmentID: "",
                      governmentIDState: "",
                      homePhone: "",
                      cellPhone: "",
                      workPhone: "",
                      email: "",
                      isMarried: false,
                      isUSCitizen: false,
                    },
                  ]);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Co-Applicant
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Other Occupants */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium underline">OTHER OCCUPANTS</h3>
        {form.watch("occupants")?.map((occupant, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <div className="flex gap-4 items-center justify-between">
              <h4 className="font-medium">Occupant {index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  const occupants = form.getValues("occupants");
                  if (occupants) {
                    occupants.splice(index, 1);
                    form.setValue("occupants", occupants);
                  }
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-4 items-center">
              <FormField
                control={form.control}
                name={`occupants.${index}.name`}
                render={({ field }) => (
                  <FormItem className="flex-1">
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
              <FormField
                control={form.control}
                name={`occupants.${index}.birthdate`}
                render={({ field }) => (
                  <FormItem className="">
                    <div className="flex items-center gap-2">
                      <FormLabel className="min-w-fit" required>
                        Birthdate
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="date"
                          max={min18Years}
                          className="w-[150px]"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`occupants.${index}.isUSCitizen`}
                render={({ field }) => (
                  <FormItem className="">
                    <div className="flex items-center gap-2">
                      <FormLabel className="min-w-fit">US Citizen</FormLabel>
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`occupants.${index}.phone`}
                render={({ field }) => (
                  <FormItem className="w-[250px]">
                    <div className="flex items-center gap-2">
                      <FormLabel required className="whitespace-nowrap">
                        Phone
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
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name={`occupants.${index}.relationship`}
                render={({ field }) => (
                  <FormItem className="w-[300px]">
                    <div className="flex items-center gap-2">
                      <FormLabel className="min-w-fit" required>
                        Relationship
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Colleague" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`occupants.${index}.socialSecurity`}
                render={({ field }) => (
                  <FormItem className="w-[350px]">
                    <div className="flex items-center gap-2">
                      <FormLabel className="min-w-fit" required>
                        Social Security No.
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="123-45-6789"
                          type="password"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`occupants.${index}.driverLicense`}
                render={({ field }) => (
                  <FormItem className="">
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
                name={`occupants.${index}.driverLicenseState`}
                render={({ field }) => (
                  <FormItem className="">
                    <div className="flex items-center gap-2">
                      <FormLabel className="min-w-fit" required>
                        {form.watch(`occupants.${index}.isUSCitizen`)
                          ? "State (DL)"
                          : "Country (DL)"}
                      </FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[150px]">
                            <SelectValue
                              placeholder={
                                form.watch(`occupants.${index}.isUSCitizen`)
                                  ? "Select state"
                                  : "Select country"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-[150px]">
                          {form.watch(`occupants.${index}.isUSCitizen`)
                            ? US_STATES.map((state) => (
                                <SelectItem
                                  key={state.value}
                                  value={state.value}
                                >
                                  {state.label}
                                </SelectItem>
                              ))
                            : COUNTRIES.map((country) => (
                                <SelectItem
                                  key={country.value}
                                  value={country.value}
                                >
                                  {country.label}
                                </SelectItem>
                              ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name={`occupants.${index}.governmentIDType`}
                render={({ field }) => (
                  <FormItem className="">
                    <div className="flex items-center gap-2">
                      <FormLabel className="min-w-fit" required>
                        Government ID Type
                      </FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[290px]">
                            <SelectValue placeholder="Select ID type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {(occupant.isUSCitizen
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
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name={`occupants.${index}.governmentID`}
                render={({ field }) => (
                  <FormItem className="w-[280px]">
                    <div className="flex items-center gap-2">
                      <FormLabel className="min-w-fit" required>
                        Government ID
                      </FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="TX12345678" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`occupants.${index}.governmentIDState`}
                render={({ field }) => (
                  <FormItem className="">
                    <div className="flex items-center gap-2">
                      <FormLabel className="min-w-fit" required>
                        {form.watch(`occupants.${index}.isUSCitizen`)
                          ? "State (Gov ID)"
                          : "Country (Gov ID)"}
                      </FormLabel>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <FormControl>
                          <SelectTrigger className="w-[150px]">
                            <SelectValue
                              placeholder={
                                form.watch(`occupants.${index}.isUSCitizen`)
                                  ? "Select state"
                                  : "Select country"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-[150px]">
                          {form.watch(`occupants.${index}.isUSCitizen`)
                            ? US_STATES.map((state) => (
                                <SelectItem
                                  key={state.value}
                                  value={state.value}
                                >
                                  {state.label}
                                </SelectItem>
                              ))
                            : COUNTRIES.map((country) => (
                                <SelectItem
                                  key={country.value}
                                  value={country.value}
                                >
                                  {country.label}
                                </SelectItem>
                              ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        {(form.watch("occupants", [])?.length ?? 0) < 6 && (
          <Button
            type="button"
            variant="link"
            className="underline"
            onClick={() => {
              const occupants = form.getValues("occupants") || [];
              form.setValue("occupants", [
                ...occupants,
                {
                  name: "",
                  relationship: "",
                  isUSCitizen: true,
                  birthdate: "",
                  socialSecurity: "",
                  driverLicense: "",
                  driverLicenseState: "",
                  phone: "",
                  governmentIDType: "",
                  governmentID: "",
                  governmentIDState: "",
                },
              ]);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Occupant
          </Button>
        )}
      </div>

      {/* Where you live */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium underline">WHERE YOU LIVE</h3>
        <WhereYouLive form={form} type="current" />

        {/* Previous address */}
        <Accordion
          type="single"
          collapsible
          onValueChange={(value) => {
            if (value === "previous-address") {
              form.setValue("previousResidenceType", "rent");
            }
          }}
        >
          <AccordionItem
            value="previous-address"
            className={
              !requirePreviousAddress ? "opacity-50 pointer-events-none" : ""
            }
          >
            <AccordionTrigger className="font-medium italic underline">
              Fill out if you have been at your current address for less than
              five years
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <WhereYouLive
                form={form}
                type="previous"
                residencyStartDate={residencyStartDate}
                previousDateFrom={previousDateFrom}
                previousDateTo={previousDateTo}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}
