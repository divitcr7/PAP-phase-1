import type { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem
} from "@/components/ui/form";
import { ApplyFormValues } from "@/schemas/ApplyForm";
import { Input } from "@/components/ui/input";

export default function StepFive({ form }: { form: UseFormReturn<ApplyFormValues> }) {
  return (
        <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-bold">Disclosures</h3>
        <div className="prose prose-sm max-w-none space-y-4">
          <p className="text-justify">
            <span className="font-medium">1. Application fee (non-refundable).</span> You agree to pay to our representative the non-refundable application fee in the amount indicated in paragraph 3. Payment of the application fee does not guarantee that your Application will be accepted. The application fee offsets the cost of screening an applicant for acceptance.
          </p>
          <p className="text-justify">
            <span className="font-medium">2. Application deposit (may or may not be refundable).</span> In addition to any application fees, you agree to pay to our representative an application deposit in the amount indicated in paragraph 3. The application deposit is not a security deposit. The application deposit will be credited toward the required security deposit when the Lease has been signed by all parties; OR it will be refunded under paragraph 7 if the applicant is not approved; OR it will be retained by us as liquidated damages if you fail to sign or withdraw under paragraphs 4 and 5 of the Application Agreement.
          </p>
          <p className="text-justify">
            <span className="font-medium">3. Fees due.</span> Your Application will not be processed until we receive your completed Application (and the completed Application of all co-applicants, if applicable) and the following fees:
          </p>
          <div className="pl-8 space-y-2">
            <div className="flex items-center gap-2">
              <span>A. Application fee (non-refundable): $</span>
              <span className="border-b border-black min-w-[60px] text-center">75.00</span>
            </div>
            <div className="flex items-center gap-2">
              <span>B. Application deposit (may or may not be refundable): $</span>
              <FormField
                control={form.control}
                name="applicationDeposit"
                render={({ field }) => (
                  <FormItem className="m-0">
                    <FormControl>
                      <Input
                        {...field}
                        className="border-0 border-b border-black rounded-none px-0 w-[60px] focus-visible:ring-0 focus-visible:ring-offset-0"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>
          <p className="text-justify">
            <span className="font-medium">4. Completed Application.</span> Your Application will not be considered "complete" and will not be processed until we receive the following documentation and fees:
          </p>
          <div className="pl-8">
            <p>A. Your fully filled out and signed Application and any documents required by our rental criteria, such as proof of income.</p>
            <p>B. Fully filled out and signed Applications for each co-applicant (if applicable);</p>
            <p>C. Application fees for all applicants;</p>
            <p>D. Application deposit.</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold">Authorization and Acknowledgment</h3>
        <div className="prose prose-sm max-w-none">
          <p className="text-justify">
            I authorize
            <FormField
              control={form.control}
              name="authorizedCompany"
              render={({ field }) => (
                <FormItem className="inline-block mx-2">
                  <FormControl>
                    <Input
                      {...field}
                      defaultValue="Juniper Conroe, LLC"
                      className="border-0 border-b border-black rounded-none px-0 min-w-[200px] focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            (name of owner/agent) to obtain reports from any consumer or criminal record reporting agencies before, during, and after residency on matters relating to a lease by the above owner to me and to verify, by all available means, the information in this Application, including criminal background information, income history and other information reported by employer(s) to any state employment security agency. Work history information may be used only for this Application. Authority to obtain work history information expires 365 days from the date of this Application. You agree the information provided may be used for business purposes.
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold">Payment Authorization</h3>
        <div className="prose prose-sm max-w-none space-y-4">
          <p className="text-justify">
            I authorize
            <FormField
              control={form.control}
              name="authorizedCompany"
              render={({ field }) => (
                <FormItem className="inline-block mx-2">
                  <FormControl>
                    <Input
                      {...field}
                      defaultValue="Juniper Conroe, LLC"
                      className="border-0 border-b border-black rounded-none px-0 min-w-[200px] focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            (name of owner/agent) to collect payment of the application fee and application deposit in the amounts specified under paragraph 3 of the Disclosures.
          </p>
          <p className="text-justify">
            <span className="font-medium">Non-sufficient funds and dishonored payments.</span> If a check from an applicant is returned to us by a bank or other entity for any reason, if any credit card or debit card payment from applicant to us is rejected, or if we are unable, through no fault of our own or our bank, to successfully process any ACH debit, credit card, or debit card transaction, then:
          </p>
          <div className="pl-8 space-y-2">
            <div className="flex items-center gap-2">
              <span>1. Applicant shall pay a charge of $</span>
              <span className="border-b border-black min-w-[60px] text-center">75.00</span>
              <span>for each returned payment; and</span>
            </div>
            <p>2. We reserve the right to refer the matter for criminal prosecution.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
