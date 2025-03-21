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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { US_STATES } from "@/constants/states";

interface WhereYouLiveProps {
  form: UseFormReturn<ApplyFormValues>;
  type: "current" | "previous";
  residencyStartDate?: string;
  previousDateFrom?: string;
  previousDateTo?: string;
}

export function WhereYouLive({
  form,
  type,
  residencyStartDate,
  previousDateFrom,
  previousDateTo,
}: WhereYouLiveProps) {
  const prefix = type === "current" ? "current" : "previous";
  const todaysDate = new Date().toISOString().split("T")[0];

  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name={`${prefix}Address`}
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
          name={`${prefix}City`}
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
          name={`${prefix}State`}
          render={({ field }) => (
            <FormItem className="">
              <div className="flex items-center gap-2">
                <FormLabel required>State</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
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
        <FormField
          control={form.control}
          name={`${prefix}ZIP`}
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
          name={`${prefix}OwnerPhone`}
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
          name={`${prefix}ResidenceType`}
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
            name="residencyStartDate"
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
              name="previousDateFrom"
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
              name="previousDateTo"
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
          name={`${prefix}ApartmentName`}
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
          name={`${prefix}OwnerName`}
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
        name={`${prefix}ReasonForLeaving`}
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
