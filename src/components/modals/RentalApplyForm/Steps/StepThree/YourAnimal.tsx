import { UseFormReturn } from "react-hook-form";
import { ApplyFormValues } from "@/schemas/ApplyForm/ApplyForm";
import { FormInputField } from "../../common/FormFields";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";

interface YourAnimalsProps {
  form: UseFormReturn<ApplyFormValues>;
}

export function YourAnimals({ form }: YourAnimalsProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <h3 className="text-lg font-medium underline">YOUR ANIMALS</h3>
        <span className="text-sm text-muted-foreground italic">
          (if applicable)
        </span>
      </div>

      <div className="space-y-4">
        <p className="text-sm">
          You may not have any animal in your unit without management's prior
          authorization in writing. If we allow your requested animal, you must
          sign a separate animal addendum, which may require additional
          deposits, rents, fees or other charges.
        </p>
        {(form.watch("pets") || []).map((_, index) => (
          <div key={index} className="">
            <div className="flex gap-4">
              <div className="grid grid-cols-13 items-center gap-4">
                <FormInputField
                  form={form}
                  name={`pets.${index}.type`}
                  label="Kind"
                  className="col-span-6"
                  placeholder="e.g. Dog, Cat"
                />
                <FormInputField
                  form={form}
                  name={`pets.${index}.weight`}
                  label="Weight"
                  type="number"
                  className="col-span-2"
                  placeholder="25"
                />
                <FormInputField
                  form={form}
                  name={`pets.${index}.breed`}
                  label="Breed"
                  className="col-span-4"
                  placeholder="e.g. Labrador"
                />
                <FormInputField
                  form={form}
                  name={`pets.${index}.age`}
                  label="Age"
                  type="number"
                  className="col-span-1"
                  placeholder="3"
                />
              </div>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className=""
                onClick={() => {
                  const currentPets = [...(form.getValues("pets") || [])];
                  currentPets.splice(index, 1);
                  form.setValue("pets", currentPets);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}
        {(form.watch("pets")?.length ?? 0) < 2 && (
          <Button
            type="button"
            variant="link"
            className="underline"
            onClick={() => {
              const pets = [...(form.getValues("pets") || [])];
              form.setValue("pets", [
                ...pets,
                {
                  type: "",
                  name: "",
                  gender: "",
                  color: "",
                  breed: "",
                  weight: "",
                  age: "",
                  neutered: false,
                  vaccinated: false,
                },
              ]);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Animal
          </Button>
        )}
      </div>
    </div>
  );
}
