import type { UseFormReturn } from "react-hook-form";
import type { ApplyFormValues } from "../../../../../schemas/ApplyForm/ApplyForm";
import { EmergencyContact } from "./EmergencyContact";
import { ReferralInfo } from "./ReferralInfo";
import { YourAnimals } from "./YourAnimal";
import { YourVehicles } from "./YourVehicles";
import { ApplicantInfo } from "../../RentalApplicationForm";

export default function StepThree({
  form,
  applicants = [],
  occupants = [],
}: {
  form: UseFormReturn<ApplyFormValues>;
  applicants?: ApplicantInfo[];
  occupants?: ApplicantInfo[];
}) {
  return (
    <div className="space-y-6">
      <ReferralInfo form={form} />

      <EmergencyContact form={form} />

      <YourVehicles form={form} applicants={applicants} occupants={occupants} />

      <YourAnimals form={form} />
    </div>
  );
}
