import { UseFormReturn, Path, useWatch } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  ApplicantType,
  ApplyFormValues,
  ExistingAddress,
} from "@/schemas/ApplyForm/ApplyForm";
import { formatPhoneNumber, todaysDate } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { US_STATES } from "@/constants/states";
import { FormInputField, FormCheckboxField, FormCurrencyField } from "../../common/FormFields";
import { Input } from "@/components/ui/input";

interface WhereYouLiveProps {
  form: UseFormReturn<ApplyFormValues>;
  type: "current" | "previous";
  applicantType: ApplicantType;
  applicantIndex: number;
  residencyStartDate?: string;
  existingAddresses?: ExistingAddress[];
  onAddressSelect?: (value: string) => void;
  getFieldPath: (
    applicantType: ApplicantType,
    index: number,
    fieldName: string
  ) => string;
}

export function WhereYouLive({
  form,
  type,
  applicantType,
  applicantIndex,
  residencyStartDate,
  getFieldPath,
}: WhereYouLiveProps) {
  const prefix = type === "current" ? "current" : "previous";

  // Use getFieldPath to get the correct field path for this applicant/occupant
  const getField = (fieldName: string): Path<ApplyFormValues> => {
    return getFieldPath(
      applicantType,
      applicantIndex,
      `${prefix}${fieldName}`
    ) as Path<ApplyFormValues>;
  };

    const previousDateFromPath = getFieldPath(
      applicantType,
      applicantIndex,
      "previousDateFrom"
    );
    const previousDateToPath = getFieldPath(
      applicantType,
      applicantIndex,
      "previousDateTo"
    );

    // Fix: Explicitly type the return values as string
    const previousDateFrom = useWatch({
      control: form.control,
      name: previousDateFromPath as Path<ApplyFormValues>,
    }) as string | undefined;

    const previousDateTo = useWatch({
      control: form.control,
      name: previousDateToPath as Path<ApplyFormValues>,
    }) as string | undefined;

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name={getField("Address")}
        render={({ field }) => {
          console.log(
            `${prefix}Address value:`,
            field.value,
            typeof field.value
          );
          return (
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
                    value={typeof field.value === "string" ? field.value : ""}
                    placeholder="5678 Oak Drive, Austin, TX 78701"
                  />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          );
        }}
      />

      <div className="flex gap-4 items-center">
        {/* City, State, ZIP, Phone fields */}
        <FormInputField
          form={form}
          name={getField("City")}
          label="City"
          required
          placeholder="Austin"
          className="flex-1"
        />

        <FormField
          control={form.control}
          name={getField("State")}
          render={({ field }) => (
            <FormItem className="">
              <div className="flex items-center gap-2">
                <FormLabel required>State</FormLabel>
                <Select
                  value={(field.value as string) || ""}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="Select state" />
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

        <FormInputField
          form={form}
          name={getField("ZIP")}
          label="ZIP"
          required
          placeholder="78701"
          maxLength={10}
          inputClassName="w-[100px]"
        />

        <FormInputField
          form={form}
          name={getField("OwnerPhone")}
          label="Owner Phone"
          required
          placeholder="(281) 555-0123"
          type="tel"
          maxLength={14}
          className="w-[280px]"
          onChange={(e) => {
            const formatted = formatPhoneNumber(e.target.value);
            form.setValue(getField("OwnerPhone"), formatted);
          }}
        />

        <FormCheckboxField
          form={form}
          name={getField("ResidenceType")}
          label="Do you"
          required
          className="min-w-fit"
          options={[
            { value: "rent", label: "Rent" },
            { value: "own", label: "Own" },
          ]}
        />
      </div>

      <div className="flex gap-4 items-center">
        {type === "current" ? (
          <FormInputField
            form={form}
            name={getField("residencyStartDate")}
            label="Beginning date of residency"
            required
            type="date"
            max={todaysDate}
            className="w-fit"
            inputClassName="w-fit"
          />
        ) : (
          <>
            <FormInputField
              form={form}
              name={getField("previousDateFrom")}
              label="Dates: From"
              type="date"
              className="w-fit"
              inputClassName="w-fit"
              max={previousDateTo || residencyStartDate || todaysDate}
            />

            <FormInputField
              form={form}
              name={getField("previousDateTo")}
              label="To"
              type="date"
              className="w-fit"
              inputClassName="w-fit"
              min={previousDateFrom || todaysDate}
              max={residencyStartDate || todaysDate}
            />
          </>
        )}

        <FormInputField
          form={form}
          name={getField("ApartmentName")}
          label="Apartment name"
          required
          placeholder="Conroe Grand Apartments"
          className="flex-1"
        />

        <FormInputField
          form={form}
          name={getField("OwnerName")}
          label="Name of owner or manager"
          required
          placeholder="John Smith"
          className="w-[450px]"
        />
      </div>

      <div className="flex gap-4">
        <FormCurrencyField
          form={form}
          name={getField("MonthlyPayment")}
          label="Monthly Payment"
          required
          placeholder="2000"
          maxValue={1000000}
          className="w-[250px]"
        />
        <FormInputField
          form={form}
          name={getField("ReasonForLeaving")}
          label="Reason for leaving"
          required
          placeholder="Relocating for work"
          className="flex-1"
        />
      </div>
    </div>
  );
}
