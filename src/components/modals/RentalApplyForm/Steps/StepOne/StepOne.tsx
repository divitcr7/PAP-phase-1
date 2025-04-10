import { Plus, Trash2 } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ApplyFormValues } from "@/schemas/ApplyForm/ApplyForm";
import AboutYou from "./AboutYou";
import { ApplicantInfo } from "../../RentalApplicationForm";
import { ApplicantAddresses } from "./ApplicantAddresses";
import Occupant from "./Occupants";
import { min18Years } from "@/lib/utils";

interface StepOneProps {
  form: UseFormReturn<ApplyFormValues>;
  applicants: ApplicantInfo[];
  occupants: ApplicantInfo[];
  addCoApplicant: () => void;
  removeCoApplicant: (index: number) => void;
  addOccupant: () => void;
  removeOccupant: (index: number) => void;
}

export default function StepOne({
  form,
  applicants,
  occupants,
  addCoApplicant,
  removeCoApplicant,
  addOccupant,
  removeOccupant,
}: StepOneProps) {
  // Get primary applicant and co-applicants
  const primaryApplicant = applicants[0];
  const coApplicants = applicants.slice(1);

  return (
    <div className="space-y-6">
      {/* About You */}
      <div>
        <h3 className="text-lg font-medium underline">About You</h3>
        <AboutYou form={form} applicantIndex={0} />
      </div>

      {/* Co-Applicant Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium underline">Co-Applicants</h3>
        </div>

        {coApplicants.length > 0 && (
          <div className="space-y-6">
            {coApplicants.map((coApp, idx) => (
              <div
                key={coApp.id}
                className="space-y-4 border border-gray-200 rounded-md pb-2"
              >
                <div className="flex gap-4 items-center justify-between px-4">
                  <h3 className="text-lg font-medium">
                    Co-Applicant {idx + 1}
                  </h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className=""
                    onClick={() => removeCoApplicant(idx + 1)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <AboutYou form={form} applicantIndex={idx + 1} />
              </div>
            ))}
          </div>
        )}

        {coApplicants.length < 3 && (
          <Button
            type="button"
            variant="link"
            className="underline"
            onClick={() => {
              form.setValue("hasCoApplicant", true);
              addCoApplicant();
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Co-Applicant
          </Button>
        )}
      </div>
      {/* Occupants Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium underline">Other Occupants</h3>
        </div>

        {occupants.length > 0 && (
          <div className="space-y-6">
            {occupants.map((occ, idx) => (
              <div
                key={occ.id}
                className="space-y-4 border border-gray-200 rounded-md pb-2"
              >
                <div className="flex gap-4 items-center justify-between px-4">
                  <h3 className="text-lg font-medium">Occupant {idx + 1}</h3>
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className=""
                    onClick={() => removeOccupant(idx)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <Occupant
                  form={form}
                  occupantIndex={idx}
                  min18Years={min18Years}
                />
              </div>
            ))}
          </div>
        )}

        {occupants.length === 0 && (
          <p className="text-muted-foreground text-sm italic">
            No additional occupants added yet. Click "Add Occupant" to include
            others who will live in the apartment.
          </p>
        )}

        <Button
          type="button"
          variant="link"
          className="underline"
          onClick={() => {
            form.setValue("hasOccupants", true);
            addOccupant();
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Occupant
        </Button>
      </div>

      {/* Where you live */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium underline">WHERE YOU LIVE</h3>

        {/* Primary Applicant Addresses */}
        <ApplicantAddresses
          form={form}
          applicantType="applicant"
          applicantIndex={0}
          applicantName={primaryApplicant?.name || ""}
          applicants={applicants}
          occupants={occupants}
        />

        {/* Co-Applicant Addresses - only show for those with required data filled */}
        {form.watch("hasCoApplicant") &&
          coApplicants
            .filter((coApp) => coApp.isRequiredDataFilled)
            .map((coApp, index) => (
              <ApplicantAddresses
                key={coApp.id}
                form={form}
                applicantType="applicant"
                applicantIndex={index + 1}
                applicantName={coApp.name || ""}
                applicants={applicants}
                occupants={occupants}
              />
            ))}

        {/* Occupant Addresses - only show for those with required data filled */}
        {form.watch("hasOccupants") &&
          occupants
            .filter((occ) => occ.isRequiredDataFilled)
            .map((occ, index) => (
              <ApplicantAddresses
                key={occ.id}
                form={form}
                applicantType="occupant"
                applicantIndex={index}
                applicantName={occ.name || ""}
                applicants={applicants}
                occupants={occupants}
              />
            ))}
      </div>
    </div>
  );
}
