import { UseFormReturn } from "react-hook-form";
import { ApplyFormValues } from "@/schemas/ApplyForm/ApplyForm";
import { FormInputField } from "../../common/FormFields";
import { CustomDropdown } from "../../common/CustomDropdown";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ApplicantInfo } from "../../RentalApplicationForm";
import { generateYearOptions } from "@/lib/utils";

interface YourVehiclesProps {
  form: UseFormReturn<ApplyFormValues>;
  applicants: ApplicantInfo[];
  occupants: ApplicantInfo[];
}

export function YourVehicles({
  form,
  applicants,
  occupants,
}: YourVehiclesProps) {

  const allPeople = [...applicants, ...occupants];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-medium underline">YOUR VEHICLES</h3>
        <span className="text-sm text-muted-foreground italic">
          (if applicable)
        </span>
      </div>

      <div className="space-y-4">
        <p className="text-sm font-medium italic">
          List all vehicles owned or operated by you or any occupants (including
          cars, trucks, motorcycles, trailers, etc.)
        </p>
        {(form.watch("vehicles") || []).map((_, index) => (
          <div key={index} className="">
            <div className="flex gap-1">
              <div className="flex gap-4 items-center">
                <FormField
                  control={form.control}
                  name={`vehicles.${index}.owner`}
                  render={({ field }) => (
                    <FormItem className="">
                      <div className="flex items-center gap-2">
                        <FormLabel className="min-w-fit">Owner</FormLabel>
                        <FormControl>
                          <CustomDropdown
                            options={allPeople.map((person) => ({
                              label:
                                person.name ||
                                `${
                                  person.type.charAt(0).toUpperCase() +
                                  person.type.slice(1)
                                } ${person.index + 1}`,
                              value: person.id,
                            }))}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Select Owner"
                            showSearch={false}
                            className="w-[130px]"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormInputField
                  form={form}
                  name={`vehicles.${index}.make`}
                  label="Make"
                  className="col-span-4"
                  placeholder="e.g. Toyota"
                />
                <FormInputField
                  form={form}
                  name={`vehicles.${index}.model`}
                  label="Model"
                  className="col-span-4"
                  placeholder="e.g. Camry"
                />
                <FormInputField
                  form={form}
                  name={`vehicles.${index}.color`}
                  label="Color"
                  className="col-span-3"
                  placeholder="e.g. Blue"
                />
                <FormField
                  control={form.control}
                  name={`vehicles.${index}.year`}
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel className="min-w-fit">Year</FormLabel>
                        <FormControl>
                          <CustomDropdown
                            options={generateYearOptions(
                              1950,
                              new Date().getFullYear()
                            )}
                            value={field.value}
                            onChange={field.onChange}
                            placeholder="Select Year"
                            className="w-[100px]"
                            showSearch={false}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormInputField
                  form={form}
                  name={`vehicles.${index}.license`}
                  label="License #"
                  className="col-span-3"
                  placeholder="ABC123"
                />
                <FormField
                  control={form.control}
                  name={`vehicles.${index}.state`}
                  render={({ field }) => (
                    <FormItem className="col-span-4">
                      <div className="flex items-center gap-2">
                        <FormLabel className="min-w-fit">State</FormLabel>
                        <FormControl>
                          <CustomDropdown
                            type="state"
                            value={(field.value as string) || ""}
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
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="col-span-1"
                onClick={() => {
                  const currentVehicles = [
                    ...(form.getValues("vehicles") || []),
                  ];
                  currentVehicles.splice(index, 1);
                  form.setValue("vehicles", currentVehicles);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        {(form.watch("vehicles")?.length ?? 0) < 4 && (
          <Button
            type="button"
            variant="link"
            className="underline"
            onClick={() => {
              const vehicles = [...(form.getValues("vehicles") || [])];
              form.setValue("vehicles", [
                ...vehicles,
                {
                  owner: "",
                  make: "",
                  model: "",
                  color: "",
                  year: "",
                  license: "",
                  state: "TX",
                },
              ]);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Vehicle
          </Button>
        )}
      </div>
    </div>
  );
}
