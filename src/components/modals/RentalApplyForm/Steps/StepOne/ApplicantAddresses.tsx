import { useEffect, useState } from "react";
import { UseFormReturn, useWatch, Path } from "react-hook-form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { WhereYouLive } from "./WhereYouLive";
import {
  ApplyFormValues,
  ExistingAddress,
  ApplicantType,
} from "@/schemas/ApplyForm/ApplyForm";
import { Separator } from "@/components/ui/separator";
import { ApplicantDisplay } from "../../common/ApplicantDisplay";
import {
  DEFAULT_CURRENT_ADDRESS,
  DEFAULT_PREVIOUS_ADDRESS,
} from "@/constants/defaultApplyFormValues";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { FormCheckboxWithDropdown } from "../../common/FormFields";
import { ApplicantInfo } from "../../RentalApplicationForm";
import { isLessThanYearsAgo } from "@/lib/utils";

interface ApplicantAddressesProps {
  form: UseFormReturn<ApplyFormValues>;
  applicantType: ApplicantType;
  applicantIndex: number;
  applicantName: string;
  existingAddresses?: ExistingAddress[];
  onAddressSelect?: (value: string) => void;
  applicants: ApplicantInfo[];
  occupants: ApplicantInfo[];
}

export function ApplicantAddresses({
  form,
  applicantType,
  applicantIndex,
  applicantName,
  existingAddresses,
  onAddressSelect,
  applicants,
  occupants,
}: ApplicantAddressesProps) {
  const [showPreviousAddress, setShowPreviousAddress] = useState(false);

  const isPrimaryApplicant =
    applicantType === "applicant" && applicantIndex === 0;

  const basePath =
    applicantType === "applicant"
      ? `applicants.${applicantIndex}`
      : `occupants.${applicantIndex}`;

  const addressesPath = `${basePath}.addresses` as Path<ApplyFormValues>;
  const hasSharedAddressPath =
    `${basePath}.addresses.hasSharedAddress` as Path<ApplyFormValues>;
  const currentAddressPath =
    `${basePath}.addresses.current` as Path<ApplyFormValues>;
  const previousAddressPath =
    `${basePath}.addresses.previous` as Path<ApplyFormValues>;
  const residentTypePath =
    `${basePath}.addresses.residentType` as Path<ApplyFormValues>;
  const residentIndexPath =
    `${basePath}.addresses.residentIndex` as Path<ApplyFormValues>;
  const residentNamePath =
    `${basePath}.addresses.residentName` as Path<ApplyFormValues>;

  const hasSharedAddressValue = form.watch(hasSharedAddressPath);
  const currentAddressValue = form.watch(currentAddressPath);
  const selectedResidentType = form.watch(residentTypePath);
  const selectedResidentIndex = form.watch(residentIndexPath);

  useEffect(() => {
    if (isPrimaryApplicant) {
      const existingAddress = form.getValues(currentAddressPath);
      if (!existingAddress) {
        form.setValue(
          addressesPath,
          {
            hasSharedAddress: false,
            current: DEFAULT_CURRENT_ADDRESS,
            previous: undefined,
          },
          { shouldDirty: false }
        );
      }
    } else {
      if (form.getValues(hasSharedAddressPath) === undefined) {
        form.setValue(hasSharedAddressPath, true, { shouldDirty: false });
        form.setValue(residentTypePath, "applicant", { shouldDirty: false });
        form.setValue(residentIndexPath, 0, { shouldDirty: false });
        form.setValue(
          residentNamePath,
          applicants[0]?.name || "Primary Applicant",
          { shouldDirty: false }
        );
        form.setValue(currentAddressPath, undefined, { shouldDirty: false });
      }
    }
  }, [
    form,
    addressesPath,
    isPrimaryApplicant,
    currentAddressPath,
    hasSharedAddressPath,
    residentTypePath,
    residentIndexPath,
    residentNamePath,
    applicants,
  ]);

  const residencyStartDatePath =
    `${basePath}.addresses.current.residencyStartDate` as Path<ApplyFormValues>;
  const residencyStartDate = useWatch({
    control: form.control,
    name: residencyStartDatePath,
  });

  useEffect(() => {
    if (residencyStartDate && !hasSharedAddressValue) {
      // Use the utility function instead of manual calculation
      if (isLessThanYearsAgo(residencyStartDate)) {
        setShowPreviousAddress(true);
        const previousAddress = form.getValues(previousAddressPath);
        if (!previousAddress)
          form.setValue(previousAddressPath, DEFAULT_PREVIOUS_ADDRESS);
      } else {
        setShowPreviousAddress(false);
        form.setValue(previousAddressPath, undefined);
      }
    }
  }, [residencyStartDate, form, previousAddressPath, hasSharedAddressValue]);

  const handleAddAddress = () => {
    form.setValue(hasSharedAddressPath, false, { shouldDirty: false });
    form.setValue(currentAddressPath, DEFAULT_CURRENT_ADDRESS, {
      shouldDirty: false,
    });
    form.trigger();
  };

  const handleRemoveAddress = () => {
    form.setValue(hasSharedAddressPath, true, { shouldDirty: false });
    form.setValue(residentTypePath, "applicant", { shouldDirty: false });
    form.setValue(residentIndexPath, 0, { shouldDirty: false });
    form.setValue(
      residentNamePath,
      applicants[0]?.name || "Primary Applicant",
      { shouldDirty: false }
    );
    form.setValue(currentAddressPath, undefined, { shouldDirty: false });
    form.setValue(previousAddressPath, undefined, { shouldDirty: false });
    setShowPreviousAddress(false);
    form.trigger();
  };
  // ... existing code ...

  const getPeopleWithAddresses = () => {
    const peopleWithAddresses = [];

    // Always include primary applicant
    const primaryApplicant = applicants[0];
    if (primaryApplicant) {
      peopleWithAddresses.push({
        id: primaryApplicant.id,
        type: "applicant",
        index: 0,
        name: primaryApplicant.name || "Primary Applicant",
      });
    }

    // For co-applicants, only include if they have required address fields filled
    for (let i = 1; i < applicants.length; i++) {
      const coApp = applicants[i];
      // Check if this co-applicant has complete address
      if (coApp && coApp.hasCompleteAddress) {
        peopleWithAddresses.push({
          id: coApp.id,
          type: "applicant",
          index: i,
          name: coApp.name || `Co-Applicant ${i}`,
        });
      }
    }

    // For occupants, only include if they have required address fields filled
    for (let i = 0; i < occupants.length; i++) {
      const occ = occupants[i];
      // Check if this occupant has complete address
      if (occ && occ.hasCompleteAddress) {
        peopleWithAddresses.push({
          id: occ.id,
          type: "occupant",
          index: i,
          name: occ.name || `Occupant ${i + 1}`,
        });
      }
    }

    return peopleWithAddresses;
  };

  // ... rest of the existing code ...

  const residentOptions = getPeopleWithAddresses()
    .filter(
      (person) =>
        !(person.type === applicantType && person.index === applicantIndex)
    )
    .map((person) => ({
      value: `${person.type}-${person.index}`,
      label: person.name,
    }));

  const handleResidentChange = (value: string) => {
    const [type, indexStr] = value.split("-");
    const index = parseInt(indexStr, 10);

    if (type && !isNaN(index)) {
      form.setValue(residentTypePath, type as "applicant" | "occupant");
      form.setValue(residentIndexPath, index);

      const selectedResident =
        type === "applicant" ? applicants[index] : occupants[index];

      form.setValue(
        residentNamePath,
        selectedResident?.name ||
          (type === "applicant"
            ? index === 0
              ? "Primary Applicant"
              : `Co-Applicant ${index}`
            : `Occupant ${index + 1}`)
      );
    }
  };

  // Get the combined value for the dropdown
  const combinedResidentValue =
    selectedResidentType && selectedResidentIndex !== undefined
      ? `${selectedResidentType}-${selectedResidentIndex}`
      : "";

  const showAddressForm =
    isPrimaryApplicant ||
    (hasSharedAddressValue === false && currentAddressValue !== undefined);

  return (
    <div className="space-y-4 border border-gray-200 rounded-md py-2 px-4">
      <div className="flex justify-between">
        <ApplicantDisplay
          applicantType={applicantType}
          applicantIndex={applicantIndex}
          name={applicantName}
        />
        {!isPrimaryApplicant && showAddressForm && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={handleRemoveAddress}
            className="rounded-full hover:bg-destructive/10 transition-colors"
          >
            <X className="h-4 w-4 text-destructive" />
          </Button>
        )}
      </div>

      {isPrimaryApplicant ? (
        <>
          <WhereYouLive
            form={form}
            type="current"
            applicantType={applicantType}
            applicantIndex={applicantIndex}
            residencyStartDate={residencyStartDate}
            existingAddresses={existingAddresses}
            onAddressSelect={onAddressSelect}
          />
        </>
      ) : (
        <>
          {!showAddressForm ? (
            <div className="flex items-center justify-between">
              <Button
                type="button"
                variant="link"
                className="underline"
                size="sm"
                onClick={handleAddAddress}
                disabled={hasSharedAddressValue}
              >
                <Plus className="h-4 w-4 mr-1" /> Add Address Details
              </Button>

              <FormCheckboxWithDropdown
                form={form}
                checkboxName={hasSharedAddressPath}
                checkboxLabel="Same address as"
                dropdownOptions={residentOptions}
                dropdownValue={combinedResidentValue}
                onDropdownChange={handleResidentChange}
                dropdownPlaceholder="Select resident"
                required={true}
                className="flex-1 ml-4"
                defaultChecked={true}
              />
            </div>
          ) : (
            <WhereYouLive
              form={form}
              type="current"
              applicantType={applicantType}
              applicantIndex={applicantIndex}
              residencyStartDate={residencyStartDate}
              existingAddresses={existingAddresses}
              onAddressSelect={onAddressSelect}
            />
          )}
        </>
      )}

      {showPreviousAddress && !hasSharedAddressValue && (
        <>
          <Separator />
          <Accordion type="single" value="previous" collapsible={false}>
            <AccordionItem value="previous">
              <AccordionTrigger className="underline font-medium">
                Fill it out as you have been at your current address for less
                than five years.
              </AccordionTrigger>
              <AccordionContent>
                <WhereYouLive
                  form={form}
                  type="previous"
                  applicantType={applicantType}
                  applicantIndex={applicantIndex}
                  residencyStartDate={residencyStartDate}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </>
      )}
    </div>
  );
}
