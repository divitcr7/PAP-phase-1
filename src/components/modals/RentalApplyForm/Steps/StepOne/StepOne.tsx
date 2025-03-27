import { useEffect, useMemo, useState } from "react";
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
import {
  ApplyFormValues,
  ExistingAddress,
  AddressReference,
} from "@/schemas/ApplyForm";
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
import { LocationDropdown } from "../../common/LocationDropdown";

const today = new Date();
const min18Years = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
)
  .toISOString()
  .split("T")[0];
const todaysDate = new Date().toISOString().split("T")[0];

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
  const fiveYearsAgo = useMemo(() => {
    const date = new Date();
    date.setFullYear(date.getFullYear() - 5);
    return date;
  }, []);
  fiveYearsAgo.setFullYear(fiveYearsAgo.getFullYear() - 5);
  // const requirePreviousAddress = residencyStartDate && new Date(residencyStartDate) > fiveYearsAgo;

  const [previousAddressOpen, setPreviousAddressOpen] = useState(false);

    const addCoApplicant = () => {
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
          governmentIDType: "",
          governmentID: "",
          governmentIDState: "",
          homePhone: "",
          cellPhone: "",
          workPhone: "",
          email: "",
          isMarried: false,
          isUSCitizen: false,
          // Address fields
          currentAddress: "",
          currentCity: "",
          currentState: "",
          currentZIP: "",
          currentOwnerPhone: "",
          currentResidenceType: "rent" as const,
          currentApartmentName: "",
          currentOwnerName: "",
          currentReasonForLeaving: "",
          residencyStartDate: "", // Added
          monthlyPayment: "", // Added
          // Previous address fields
          previousAddress: "",
          previousCity: "",
          previousState: "",
          previousZIP: "",
          previousOwnerPhone: "",
          previousResidenceType: "rent" as const,
          previousApartmentName: "",
          previousOwnerName: "",
          previousReasonForLeaving: "",
          previousDateFrom: "",
          previousDateTo: "",
          previousMonthlyPayment: "",
        },
      ]);
    };

    const addOccupant = () => {
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
          // Address fields
          currentAddress: "",
          currentCity: "",
          currentState: "",
          currentZIP: "",
          currentOwnerPhone: "",
          currentResidenceType: "rent" as const,
          currentApartmentName: "",
          currentOwnerName: "",
          currentReasonForLeaving: "",
          residencyStartDate: "", // Added
          monthlyPayment: "", // Added
          // Previous address fields
          previousAddress: "",
          previousCity: "",
          previousState: "",
          previousZIP: "",
          previousOwnerPhone: "",
          previousResidenceType: "rent" as const,
          previousApartmentName: "",
          previousOwnerName: "",
          previousReasonForLeaving: "",
          previousDateFrom: "",
          previousDateTo: "",
          previousMonthlyPayment: "",
        },
      ]);
    };

  useEffect(() => {
    if (residencyStartDate) {
      const startDate = new Date(residencyStartDate);
      if (startDate > fiveYearsAgo) {
        setPreviousAddressOpen(true);
      } else {
        setPreviousAddressOpen(false);
        // Clear previous address fields
        form.setValue("previousAddress", "");
        form.setValue("previousCity", "");
        form.setValue("previousState", "");
        form.setValue("previousZIP", "");
        form.setValue("previousOwnerPhone", "");
        form.setValue("previousResidenceType", "rent");
        form.setValue("previousDateFrom", "");
        form.setValue("previousDateTo", "");
        form.setValue("previousApartmentName", "");
        form.setValue("previousOwnerName", "");
        form.setValue("previousReasonForLeaving", "");
      }
    }
  }, [residencyStartDate, fiveYearsAgo, form]);

  const copyAddress = (
    selected: string,
    targetType: "co-applicant" | "occupant",
    targetIndex: number
  ) => {
    const [sourceType, sourceIndex] = selected.split("-");

    // Set the address reference with correct type structure
    const addressReference: AddressReference = {
      sameAs: {
        type: sourceType as "primary" | "co-applicant" | "occupant",
        index: sourceType !== "primary" ? Number(sourceIndex) : undefined,
      },
    };

    // Copy the address fields
    if (targetType === "co-applicant") {
      form.setValue(
        `coApplicants.${targetIndex}.addressReference`,
        addressReference
      );
      form.setValue(
        `coApplicants.${targetIndex}.currentAddress`,
        "Same as " +
          (sourceType === "primary"
            ? "Primary Applicant"
            : sourceType === "co-applicant"
            ? `Co-Applicant ${Number(sourceIndex) + 1}`
            : `Occupant ${Number(sourceIndex) + 1}`)
      );
    } else {
      form.setValue(
        `occupants.${targetIndex}.addressReference`,
        addressReference
      );
      form.setValue(
        `occupants.${targetIndex}.currentAddress`,
        "Same as " +
          (sourceType === "primary"
            ? "Primary Applicant"
            : sourceType === "co-applicant"
            ? `Co-Applicant ${Number(sourceIndex) + 1}`
            : `Occupant ${Number(sourceIndex) + 1}`)
      );
    }
  };

  // Get existing addresses for dropdown
  const getExistingAddresses = (): ExistingAddress[] => {
    const addresses: ExistingAddress[] = [];

    // Add primary applicant
    if (form.watch("currentAddress")) {
      addresses.push({
        name: form.watch("fullName"),
        type: "primary",
        currentAddress: form.watch("currentAddress"),
        currentCity: form.watch("currentCity"),
        currentState: form.watch("currentState"),
        currentZIP: form.watch("currentZIP"),
        currentOwnerPhone: form.watch("currentOwnerPhone"),
        currentResidenceType: form.watch("currentResidenceType"),
      });
    }

    // Add co-applicants
    form.watch("coApplicants")?.forEach((coApp, index) => {
      if (coApp.currentAddress && !coApp.addressReference) {
        addresses.push({
          name: coApp.fullName,
          type: "co-applicant",
          index,
          currentAddress: coApp.currentAddress,
          currentCity: coApp.currentCity,
          currentState: coApp.currentState,
          currentZIP: coApp.currentZIP,
          currentOwnerPhone: coApp.currentOwnerPhone,
          currentResidenceType: coApp.currentResidenceType,
        });
      }
    });

    // Add occupants
    form.watch("occupants")?.forEach((occ, index) => {
      if (occ.currentAddress && !occ.addressReference) {
        addresses.push({
          name: occ.name,
          type: "occupant",
          index,
          currentAddress: occ.currentAddress,
          currentCity: occ.currentCity,
          currentState: occ.currentState,
          currentZIP: occ.currentZIP,
          currentOwnerPhone: occ.currentOwnerPhone,
          currentResidenceType: occ.currentResidenceType,
        });
      }
    });

    return addresses;
  };

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
                onClick={addCoApplicant}
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
                                form.setValue(
                                  `occupants.${index}.isUSCitizen`,
                                  true
                                )
                              }
                            />
                            <span>Yes</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <Checkbox
                              checked={field.value === false}
                              onCheckedChange={() =>
                                form.setValue(
                                  `occupants.${index}.isUSCitizen`,
                                  false
                                )
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
                      <FormControl>
                        <LocationDropdown
                          type={
                            form.watch(`occupants.${index}.isUSCitizen`)
                              ? "state"
                              : "country"
                          }
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={`Select ${
                            form.watch(`occupants.${index}.isUSCitizen`)
                              ? "state"
                              : "country"
                          }`}
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
                          {(form.watch(`occupants.${index}.isUSCitizen`)
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
                      <FormControl>
                        <LocationDropdown
                          type={
                            form.watch(`occupants.${index}.isUSCitizen`)
                              ? "state"
                              : "country"
                          }
                          value={field.value}
                          onChange={field.onChange}
                          placeholder={`Select ${
                            form.watch(`occupants.${index}.isUSCitizen`)
                              ? "state"
                              : "country"
                          }`}
                        />
                      </FormControl>
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
            onClick={addOccupant}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Occupant
          </Button>
        )}
      </div>

      {/* Where you live */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium underline">WHERE YOU LIVE</h3>
        <WhereYouLive
          form={form}
          type="current"
          residencyStartDate={residencyStartDate}
          applicantType="primary"
          applicantName={form.watch("fullName")}
          existingAddresses={[]}
          todaysDate={todaysDate}
        />

        {/* Previous address */}
        {previousAddressOpen && (
          <Accordion type="single" value="previous" collapsible={false}>
            <AccordionItem value="previous">
              <AccordionTrigger>Previous Address</AccordionTrigger>
              <AccordionContent>
                <WhereYouLive
                  form={form}
                  type="previous"
                  residencyStartDate={residencyStartDate}
                  previousDateFrom={previousDateFrom}
                  previousDateTo={previousDateTo}
                  applicantType="primary"
                  applicantName={form.watch("fullName")}
                  todaysDate={todaysDate}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {/* Co-Applicants' Addresses */}
        {form.watch("coApplicants")?.map((coApp, index) => (
          <WhereYouLive
            key={`co-app-${index}`}
            form={form}
            type="current"
            applicantType="co-applicant"
            applicantIndex={index}
            applicantName={coApp.fullName}
            existingAddresses={getExistingAddresses()}
            onAddressSelect={(selected) =>
              copyAddress(selected, "co-applicant", index)
            }
            todaysDate={todaysDate}
          />
        ))}

        {/* Occupants' Addresses */}
        {form.watch("occupants")?.map((occ, index) => (
          <WhereYouLive
            key={`occ-${index}`}
            form={form}
            type="current"
            applicantType="occupant"
            applicantIndex={index}
            applicantName={occ.name}
            existingAddresses={getExistingAddresses()}
            onAddressSelect={(selected) =>
              copyAddress(selected, "occupant", index)
            }
            todaysDate={todaysDate}
          />
        ))}
      </div>
    </div>
  );
}
