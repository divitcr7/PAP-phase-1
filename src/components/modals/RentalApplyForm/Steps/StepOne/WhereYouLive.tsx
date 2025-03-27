import { ExistingAddress, AddressType } from "@/schemas/ApplyForm";
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
import { formatPhoneNumber } from "@/lib/utils";
import { LocationDropdown } from "../../common/LocationDropdown";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface WhereYouLiveProps {
  form: UseFormReturn<ApplyFormValues>;
  type: "current" | "previous";
  residencyStartDate?: string;
  previousDateFrom?: string;
  previousDateTo?: string;
  applicantType: AddressType["type"];
  applicantIndex?: number;
  applicantName: string;
  existingAddresses?: ExistingAddress[];
  onAddressSelect?: (selected: string) => void;
  todaysDate: string;
}

export function WhereYouLive({
  form,
  type,
  residencyStartDate,
  previousDateFrom,
  previousDateTo,
  applicantType,
  applicantIndex = 0,
  applicantName,
  existingAddresses,
  onAddressSelect,
  todaysDate,
}: WhereYouLiveProps) {
  const prefix = type === "current" ? "current" : "previous";
  const showAddressSelection =
    applicantType !== "primary" && type === "current";

  // Improved helper function to get field name with proper typing
  const getFieldName = (field: string) => {
    if (applicantType === "primary") {
      return `${prefix}${field}` as keyof ApplyFormValues;
    } else if (applicantType === "co-applicant") {
      return `coApplicants.${applicantIndex}.${prefix}${field}` as keyof ApplyFormValues;
    } else {
      return `occupants.${applicantIndex}.${prefix}${field}` as keyof ApplyFormValues;
    }
  };

  // Helper function for date fields
  const getResidencyDateFieldName = () => {
    if (type === "current") {
      if (applicantType === "primary") {
        return "residencyStartDate" as const;
      } else if (applicantType === "co-applicant") {
        return `coApplicants.${applicantIndex}.residencyStartDate` as const;
      } else {
        return `occupants.${applicantIndex}.residencyStartDate` as const;
      }
    } else {
      if (applicantType === "primary") {
        return "previousDateFrom" as const;
      } else if (applicantType === "co-applicant") {
        return `coApplicants.${applicantIndex}.previousDateFrom` as const;
      } else {
        return `occupants.${applicantIndex}.previousDateFrom` as const;
      }
    }
  };

  const getPreviousToDateFieldName = () => {
    if (applicantType === "primary") {
      return "previousDateTo" as const;
    } else if (applicantType === "co-applicant") {
      return `coApplicants.${applicantIndex}.previousDateTo` as const;
    } else {
      return `occupants.${applicantIndex}.previousDateTo` as const;
    }
  };

  return (
    <div className="space-y-4">
      {/* Address Selection Dropdown */}
      {showAddressSelection &&
        existingAddresses &&
        existingAddresses.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Same address as:
            </span>
            <Select onValueChange={onAddressSelect}>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Select existing address" />
              </SelectTrigger>
              <SelectContent>
                {existingAddresses
                  .filter((addr) => addr.currentAddress) // Only show addresses that are filled
                  .map((addr, idx) => (
                    <SelectItem
                      key={idx}
                      value={`${addr.type}-${addr.index ?? 0}`}
                    >
                      {addr.name} (
                      {addr.type === "primary"
                        ? "Primary Applicant"
                        : addr.type === "co-applicant"
                        ? `Co-Applicant ${(addr.index ?? 0) + 1}`
                        : `Occupant ${(addr.index ?? 0) + 1}`}
                      )
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        )}

      {/* Title with applicant info */}
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-medium">{applicantName}</h3>
        <p className="text-sm text-muted-foreground">
          {applicantType === "primary"
            ? "Primary Applicant"
            : applicantType === "co-applicant"
            ? `Co-Applicant ${(applicantIndex ?? 0) + 1}`
            : `Occupant ${(applicantIndex ?? 0) + 1}`}
        </p>
      </div>

      <FormField
        control={form.control}
        name={getFieldName("Address")}
        render={({ field }) => (
          <FormItem className="flex-1">
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-start justify-between">
                <FormLabel className="min-w-fit whitespace-nowrap" required>
                  {type === "current"
                    ? "Current Home Address"
                    : "Previous Home Address"}
                </FormLabel>
                <div className="text-xs text-muted-foreground">
                  {type === "current" ? "Where you live" : "(most recent)"}
                </div>
              </div>
              <FormControl>
                <Input
                  {...field}
                  placeholder="5678 Oak Drive, Austin, TX 78701"
                />
              </FormControl>
            </div>
            <FormMessage />
          </FormItem>
        )}
      />

      <div className="flex gap-4 items-center">
        {/* City, State, ZIP, Phone fields */}
        <FormField
          control={form.control}
          name={getFieldName("City")}
          render={({ field }) => (
            <FormItem className="flex-1">
              <div className="flex items-center gap-2">
                <FormLabel required>City</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Austin" />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={getFieldName("State")}
          render={({ field }) => (
            <FormItem className="">
              <div className="flex items-center gap-2">
                <FormLabel required>State</FormLabel>
                <FormControl>
                  <LocationDropdown
                    type="state"
                    value={field.value}
                    onChange={field.onChange}
                    placeholder="Select state"
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={getFieldName("ZIP")}
          render={({ field }) => (
            <FormItem className="">
              <div className="flex items-center gap-2">
                <FormLabel required>ZIP</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="w-[100px]"
                    placeholder="78701"
                    maxLength={10}
                    minLength={5}
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={getFieldName("OwnerPhone")}
          render={({ field }) => (
            <FormItem className="w-[280px]">
              <div className="flex items-center gap-2">
                <FormLabel required className="whitespace-nowrap">
                  Owner Phone
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
        <FormField
          control={form.control}
          name={getFieldName("ResidenceType")}
          render={({ field }) => (
            <FormItem className="min-w-fit">
              <div className="flex items-center gap-2">
                <FormLabel required>Do you</FormLabel>
                <div className="flex gap-2">
                  <label className="flex items-center space-x-1">
                    <Checkbox
                      checked={field.value === "rent"}
                      onCheckedChange={() =>
                        form.setValue(`${prefix}ResidenceType`, "rent")
                      }
                    />
                    <span>Rent</span>
                  </label>
                  <label className="flex items-center space-x-1">
                    <Checkbox
                      checked={field.value === "own"}
                      onCheckedChange={() =>
                        form.setValue(`${prefix}ResidenceType`, "own")
                      }
                    />
                    <span>Own</span>
                  </label>
                </div>
              </div>
            </FormItem>
          )}
        />
      </div>

      <div className="flex gap-4 items-center">
        {type === "current" ? (
          <FormField
            control={form.control}
            name={getResidencyDateFieldName()}
            render={({ field }) => (
              <FormItem className="w-fit">
                <div className="flex items-center gap-2">
                  <FormLabel required>Beginning date of residency</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="date"
                      className="w-fit"
                      max={todaysDate}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
        ) : (
          <>
            <FormField
              control={form.control}
              name={getResidencyDateFieldName()}
              render={({ field }) => (
                <FormItem className="w-fit">
                  <div className="flex items-center gap-2">
                    <FormLabel>Dates: From</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        className="w-fit"
                        max={previousDateTo || residencyStartDate || todaysDate}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={getPreviousToDateFieldName()}
              render={({ field }) => (
                <FormItem className="w-fit">
                  <div className="flex items-center gap-2">
                    <FormLabel>To</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="date"
                        className="w-fit"
                        min={previousDateFrom || todaysDate}
                        max={residencyStartDate || todaysDate}
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </>
        )}
        {/* Date fields and other inputs */}
        <FormField
          control={form.control}
          name={getFieldName("ApartmentName")}
          render={({ field }) => (
            <FormItem className="flex-1">
              <div className="flex items-center gap-2">
                <FormLabel className="min-w-fit" required>
                  Apartment name
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Conroe Grand Apartments" />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={getFieldName("OwnerName")}
          render={({ field }) => (
            <FormItem className="w-[450px]">
              <div className="flex items-center gap-2">
                <FormLabel required className="whitespace-nowrap">
                  Name of owner or manager
                </FormLabel>
                <FormControl>
                  <Input {...field} placeholder="John Smith" />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control}
        name={getFieldName("ReasonForLeaving")}
        render={({ field }) => (
          <FormItem className="flex-1">
            <div className="flex items-center gap-2">
              <FormLabel required className="whitespace-nowrap">
                Reason for leaving
              </FormLabel>
              <FormControl>
                <Input {...field} placeholder="Relocating for work" />
              </FormControl>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
