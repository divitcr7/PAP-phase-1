import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ApplyFormValues } from "@/schemas/ApplyForm/ApplyForm";
import { UseFormReturn } from "react-hook-form";
import { FormInputField } from "../common/FormFields";

export default function StepSix({form}: { form: UseFormReturn<ApplyFormValues>}) {
  return (
    <div className="space-y-6">
      <div className="space-y-4 px-6">
        <h3 className="text-lg font-bold">Acknowledgment</h3>
        <div className="prose prose-sm max-w-none space-y-4 px-20">
          <p className="text-justify">
            You declare that all your statements in this Application are true and complete. Giving false information is a Class B Misdemeanor, punishable by up to 6 months in county jail and a $2000 fine. Applicant's submission of this Application, including payment of any fees and deposits, is being done only after applicant has fully investigated, to its satisfaction, those facts which applicant deems material and necessary to the decision to apply for a rental unit. You authorize us to verify your information through any means, including consumer-reporting agencies and other rental-housing owners. You acknowledge that you had an opportunity to review our rental-selection criteria, which include reasons your Application may be denied, such as criminal history, credit history, current income and rental history. You understand that if you do not meet our rental-selection criteria or if you fail to answer any question or give false information, we may reject the Application, retain all application fees as liquidated damages for our time and expense, and terminate your right of occupancy. In lawsuits relating to the Application or Lease, the prevailing party may recover from the non-prevailing party all attorney's fees and litigation costs. We may at any time furnish information to consumer-reporting agencies and other rental-housing owners regarding your performance of your legal obligations, including both favorable and unfavorable information about your compliance with the Lease, rules, and financial obligations. Fax or electronic signatures are legally binding. You acknowledge that our privacy policy is available to you.
          </p>
          <p className="text-justify font-medium">
            Right to review the Lease. Before you submit an Application or pay any fees or deposits, you have the right to review the Application and Lease, as well as any community rules or policies we have. You may also consult an attorney. These documents are binding legal documents when signed. We will not take a particular dwelling off the market until we receive a completed Application and any other required information or monies to rent that dwelling. Additional provisions or changes may be made in the Lease if agreed to in writing by all parties. You are entitled to a copy of the Lease after it is fully signed.
          </p>
          <p className="text-justify">
            Images on our website may represent a sample of a unit and may not reflect specific details of any unit. For information not found on our website regarding availability, unit characteristics or other questions, please call or visit our office.
          </p>
          <p className="text-justify font-medium">
            This Application and the Lease are binding documents when signed. Before submitting an Application or signing a Lease, you may take a copy of these documents to review and/or consult an attorney. Additional provisions or changes may be made in the Lease if agreed to in writing by all parties.
          </p>
        </div>

        <div className="flex justify-between px-20 pt-10">
          <FormInputField
            form={form}
            name="signature.signature"
            label="Applicant's Signature"
            placeholder="Type your full legal name"
            required
            className="w-[600px]"
            inputClassName="border-0 border-b border-black rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />

          <FormInputField
            form={form}
            name="signature.date"
            label="Date"
            type="date"
            required
            className="w-fit"
            inputClassName="border-0 border-b border-black rounded-none px-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>
      </div>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="office-use">
          <AccordionTrigger className="text-lg font-bold">
            For Office Use Only
          </AccordionTrigger>
          <AccordionContent>
            <div className="h-40"></div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
