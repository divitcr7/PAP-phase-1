import { UseFormReturn } from "react-hook-form";
import { ApplyFormValues } from "@/schemas/ApplyForm/ApplyForm";
import { FormSimpleCheckbox, FormTextareaField } from "../../common/FormFields";

interface RentalCriminalHistorySectionProps {
  form: UseFormReturn<ApplyFormValues>;
}

export function RentalCriminalHistory({
  form,
}: RentalCriminalHistorySectionProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium underline">
        RENTAL AND CRIMINAL HISTORY
      </h3>
      <div className="text-sm font-medium italic">Check only if applicable</div>
      <div className="text-sm">
        Have you or any occupant listed in this Application ever:
      </div>

      <div className="space-y-2">
        <FormSimpleCheckbox
          form={form}
          name="background.hasBeenEvicted"
          label="been evicted or asked to move out?"
        />

        <FormSimpleCheckbox
          form={form}
          name="background.hasMovedBeforeLease"
          label="moved out of a dwelling before the end of the lease term without the owner's consent?"
        />

        <FormSimpleCheckbox
          form={form}
          name="background.hasBankruptcy"
          label="declared bankruptcy?"
        />

        <FormSimpleCheckbox
          form={form}
          name="background.hasBeenSuedForRent"
          label="been sued for rent?"
        />

        <FormSimpleCheckbox
          form={form}
          name="background.hasBeenSuedForDamage"
          label="been sued for property damage?"
        />

        <FormSimpleCheckbox
          form={form}
          name="background.hasFelonyConviction"
          label="been convicted or received probation for a felony, sex crime or any crime against persons or property?"
        />
      </div>

      <FormTextareaField
        labelClassName="mb-2 text-sm font-medium"
        textareaClassName="w-full border-gray-300 focus:border-blue-500 focus:ring-blue-500 min-h-[80px]"
        form={form}
        name="background.rentalAndCriminalHistoryExplanation"
        label={
          <>
            Please indicate below the year, location, and type of each felony,
            sex crime or any crime against persons or property for which you
            were convicted or received probation.
            <br />
            We may need to discuss more facts before making a decision. You
            represent the answer is 'no' to any item not checked above.
          </>
        }
        rows={6}
        maxChars={500}
        placeholder="If applicable, please provide details including year, location, and type of each incident."
      />
    </div>
  );
}
