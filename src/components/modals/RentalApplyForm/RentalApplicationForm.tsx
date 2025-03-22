import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
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
import StepTwo from "./Steps/StepTwo";
import StepThree from "./Steps/StepThree";
import StepFour from "./Steps/StepFour";
import StepFive from "./Steps/StepFive";
import StepSix from "./Steps/StepSix";
import { applyFormSchema, type ApplyFormValues } from "@/schemas/ApplyForm";

export default function RentalApplicationForm() {
  const [step, setStep] = useState(1);
  const [open, setOpen] = useState(false);

  const form = useForm<ApplyFormValues>({
    defaultValues: {
      gender: "male",
      birthdate: new Date(Date.now() - 18 * 365 * 24 * 60 * 60 * 1000)
        .toISOString()
        .split("T")[0],
      isMarried: false,
      isUSCitizen: true,
      isSmoker: false,
      hasCoApplicant: false,
      currentResidenceType: "rent",

      // ... other fields can use schema defaults
    },
    resolver: zodResolver(applyFormSchema),
    // mode: "onChange",
  });

  const totalSteps = 6;

  const onSubmit = (values: ApplyFormValues) => {
    console.log(values);
    // Handle form submission
    setOpen(false);
  };

  const nextStep = async () => {
    // const isValid = await form.trigger();
    // if (isValid) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    // }
  };

  const prevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const isUSCitizen = useWatch({
    control: form.control,
    name: "isUSCitizen",
  });

  const coApplicants = useWatch({
    control: form.control,
    name: "coApplicants",
  });

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
                isUSCitizen={isUSCitizen}
                coApplicantsCitizenship={coApplicants?.map(
                  (c) => c.isUSCitizen
                )}
              />
            )}
            {step === 2 && <StepTwo form={form} />}
            {step === 3 && <StepThree form={form} />}
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
