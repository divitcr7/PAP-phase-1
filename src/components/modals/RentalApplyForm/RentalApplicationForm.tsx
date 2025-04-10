import { useState, useEffect, useMemo } from "react";
import { useForm, Path } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import StepOne from "./Steps/StepOne/StepOne";
import StepTwo from "./Steps/StepTwo/StepTwo";
import StepThree from "./Steps/StepThree/StepThree";
import StepFour from "./Steps/StepFour";
import StepFive from "./Steps/StepFive";
import StepSix from "./Steps/StepSix";
import {
  ApplicantType,
  applyFormSchema,
  type ApplyFormValues,
} from "@/schemas/ApplyForm/ApplyForm";
import {
  DEFAULT_APPLICANT,
  DEFAULT_FORM_VALUES,
  DEFAULT_OCCUPANT,
} from "@/constants/defaultApplyFormValues";
import { validateAddress, validatePersonalInfo } from "@/validators/formValidation";

export interface ApplicantInfo {
  id: string;
  type: ApplicantType;
  index: number;
  name: string;
  isRequiredDataFilled: boolean;
  hasCompleteAddress?: boolean;
}

export default function RentalApplicationForm() {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);

  const [applicants, setApplicants] = useState<ApplicantInfo[]>([
    {
      id: "primary-0",
      type: "applicant",
      index: 0,
      name: "",
      isRequiredDataFilled: false,
    },
  ]);

  // Track occupants separately
  const [occupants, setOccupants] = useState<ApplicantInfo[]>([]);

  // Create a deep copy of default values to avoid reference issues
  const defaultFormValues = useMemo(() => {
    return JSON.parse(JSON.stringify(DEFAULT_FORM_VALUES));
  }, []);

  const form = useForm<ApplyFormValues>({
    defaultValues: defaultFormValues,
    resolver: zodResolver(applyFormSchema),
    mode: "onBlur",
  });

  // Initialize form when dialog opens
  useEffect(() => {
    if (open) {
      form.reset(defaultFormValues);

      console.log("Form initialized with default values:", form.getValues());
    }
  }, [open, form, defaultFormValues]);

  // Reset form initialization state when dialog closes
  useEffect(() => {
    if (!open) setStep(1);
  }, [open]);

  useEffect(() => {
    // Check specific nested values
    console.log(
      "Primary applicant info:",
      form.getValues("applicants.0.personalInfo")
    );
    console.log(
      "Primary applicant address:",
      form.getValues("applicants.0.addresses")
    );
    console.log(
      "Default state value:",
      form.getValues("applicants.0.personalInfo.driverLicenseState")
    );
  }, [form]);

  useEffect(() => {
    const subscription = form.watch((formValues) => {
      if (formValues.applicants) {
        formValues.applicants.forEach((_, index) => {
          const isComplete = validatePersonalInfo(form, "applicant", index);
          const hasCompleteAddress = validateAddress(form, "applicant", index);

          setApplicants((prev) => {
            const newApplicants = [...prev];
            if (index < newApplicants.length) {
              const fullNamePath =
                `applicants.${index}.personalInfo.fullName` as Path<ApplyFormValues>;
              const fullName = form.getValues(fullNamePath);
              newApplicants[index] = {
                ...newApplicants[index],
                name: fullName || "",
                isRequiredDataFilled: isComplete,
                hasCompleteAddress: hasCompleteAddress,
              };
            }
            return newApplicants;
          });
        });
      }

      if (formValues.occupants) {
        formValues.occupants.forEach((_, index) => {
          const isComplete = validatePersonalInfo(form, "occupant", index);
          const hasCompleteAddress = validateAddress(form, "occupant", index);

          setOccupants((prev) => {
            const newOccupants = [...prev];
            if (index < newOccupants.length) {
              const fullNamePath =
                `occupants.${index}.personalInfo.fullName` as Path<ApplyFormValues>;
              const fullName = form.getValues(fullNamePath);
              newOccupants[index] = {
                ...newOccupants[index],
                name: fullName || "",
                isRequiredDataFilled: isComplete,
                hasCompleteAddress: hasCompleteAddress,
              };
            }
            return newOccupants;
          });
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  const addCoApplicant = () => {
    if (applicants.length < 4) {
      const newIndex = applicants.length;
      const newApplicant: ApplicantInfo = {
        id: `co-applicant-${newIndex}`,
        type: "applicant",
        index: newIndex,
        name: "",
        isRequiredDataFilled: false, // Initialize as false
      };

      setApplicants((prev) => [...prev, newApplicant]);

      // Initialize form values for the new co-applicant
      const currentApplicants = form.getValues("applicants") || [];
      form.setValue("applicants", [
        ...currentApplicants,
        { ...DEFAULT_APPLICANT },
      ]);
    }
  };

  // Remove a co-applicant
  const removeCoApplicant = (index: number) => {
    if (index > 0 && index < applicants.length) {
      setApplicants((prev) => {
        const newApplicants = [...prev];
        newApplicants.splice(index, 1);

        // Update indices for remaining co-applicants
        return newApplicants.map((app, i) => {
          if (i > 0) {
            return { ...app, index: i, id: `co-applicant-${i}` };
          }
          return app;
        });
      });

      // Update form values
      const currentApplicants = [...form.getValues("applicants")];
      currentApplicants.splice(index, 1);
      form.setValue("applicants", currentApplicants);
    }
  };

  // Add an occupant (max 10)
  const addOccupant = () => {
    if (occupants.length < 10) {
      const newIndex = occupants.length;
      const newOccupant: ApplicantInfo = {
        id: `occupant-${newIndex}`,
        type: "occupant",
        index: newIndex,
        name: "",
        isRequiredDataFilled: false, // Initialize as false
      };

      setOccupants((prev) => [...prev, newOccupant]);

      // Initialize form values for the new occupant
      const currentOccupants = form.getValues("occupants") || [];
      form.setValue("occupants", [
        ...currentOccupants,
        { ...DEFAULT_OCCUPANT },
      ]);
    }
  };

  const removeOccupant = (index: number) => {
    if (index >= 0 && index < occupants.length) {
      setOccupants((prev) => {
        const newOccupants = [...prev];
        newOccupants.splice(index, 1);

        // Update indices for remaining occupants
        return newOccupants.map((occ, i) => {
          return { ...occ, index: i, id: `occupant-${i}` };
        });
      });

      // Update form values
      const currentOccupants = [...(form.getValues("occupants") || [])];
      currentOccupants.splice(index, 1);
      form.setValue("occupants", currentOccupants);
    }
  };

  const totalSteps = 6;

  const onSubmit = (values: ApplyFormValues) => {
    console.log(values);
    // Handle form submission
    setOpen(false);
  };

  const nextStep = async () => {
    console.log(`Step ${step} form values:`, form.getValues());
    // const isValid = await form.trigger();
    // if (isValid) {
    // setStep((prev) => Math.min(prev + 1, totalSteps));
    // }
    setStep((prev) => Math.min(prev + 1, totalSteps));
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  // Create a helper function to get field path for any applicant
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Apply Now</Button>
      </DialogTrigger>
      <DialogContent className="!max-w-7xl max-h-[90vh] overflow-y-auto pr-4">
        <DialogHeader>
          <DialogTitle className="text-blue-800">
            Rental Application
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 mb-6">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors ${
                i + 1 <= step ? "bg-blue-500" : "bg-muted"
              }`}
            />
          ))}
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {step === 1 && (
              <StepOne
                form={form}
                applicants={applicants}
                occupants={occupants}
                addCoApplicant={addCoApplicant}
                removeCoApplicant={removeCoApplicant}
                addOccupant={addOccupant}
                removeOccupant={removeOccupant}
              />
            )}
            {step === 2 && (
              <StepTwo
                form={form}
                applicants={applicants}
                occupants={occupants}
              />
            )}
            {step === 3 && (
              <StepThree
                form={form}
                applicants={applicants}
                occupants={occupants}
              />
            )}
            {step === 4 && <StepFour form={form} />}
            {step === 5 && <StepFive form={form} />}
            {step === 6 && <StepSix form={form} />}

            <div className="flex justify-between pt-4">
              {step > 1 && (
                <Button type="button" variant="outline" onClick={prevStep}>
                  Previous
                </Button>
              )}
              {step < totalSteps ? (
                <Button type="button" onClick={nextStep} className="ml-auto">
                  Next
                </Button>
              ) : (
                <Button type="submit" className="ml-auto">
                  Submit Application
                </Button>
              )}
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
