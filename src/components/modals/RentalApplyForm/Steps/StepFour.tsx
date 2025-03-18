import type { UseFormReturn } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { ApplyFormValues } from "@/schemas/ApplyForm";

export default function StepFour({ form }: { form: UseFormReturn<ApplyFormValues> }) {
  return (
    <div className="space-y-6 px-6">
            <div className="space-y-4">
        <h3 className="text-lg font-medium">SPECIAL PROVISIONS</h3>
        <FormField
          control={form.control}
          name="specialProvisions"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea {...field} className="min-h-[250px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold text-center">APPLICATION AGREEMENT</h3>
        <div className="prose prose-sm max-w-none space-y-2 px-6">
          <p className="text-justify">The following Application Agreement will be signed by you and all co-applicants prior to signing a Lease. While some of the information below may not yet apply to your situation, there are some provisions that may become applicable prior to signing a Lease. In order to continue with this Application, you'll need to review the Application Agreement carefully and acknowledge that you accept the terms.</p>
          <ol className="list-decimal text-justify space-y-2 px-14">
            <li><span className="font-medium">Apartment Lease Information.</span> The Lease contemplated by the parties will be the current TAA Lease. Special information and conditions must be explicitly noted on the Lease.</li>
            <li><span className="font-medium">Approval when Lease is signed in advance.</span> If you and all co-applicants have already signed the Lease when we approve the Application, our representative will notify you (or one of you if there are co-applicants) of our approval, sign the Lease, and then credit the application deposit of all applicants toward the required security deposit.</li>
            <li><span className="font-medium">Approval when Lease isn't yet signed.</span> If you and all co-applicants have not signed the Lease when we approve the Application, our representative will notify you (or one of you if there are co-applicants) of the approval, sign the Lease when you and all co-applicants have signed, and then credit the application deposit of all applicants toward the required security deposit.</li>
            <li><span className="font-medium">If you fail to sign Lease after approval.</span> Unless we authorize otherwise in writing, you and all co-applicants must sign the Lease within 3 days after we give you our approval in person or by telephone or within 5 days after we mail you our approval. If you or any co-applicant fails to sign as required <span className="font-medium">your Application will be deemed withdraw</span>, and we may keep the application deposit as liquidated damages and terminate all further obligations under this Agreement.</li>
            <li><span className="font-medium">If you withdraw before approval.</span> If you or any co-applicant withdraws an Application or notifies us that you've changed your mind about renting the dwelling unit, we'll be entitled to retain all application deposits as liquidated damages, and the parties will then have no further obligation to each other.</li>
            <li><span className="font-medium">Approval/non-approval.</span> If we do not approve your Application within 7 days after the date we received a completed Application, your Application will be considered "disapproved." Notification may be in person or by mail or telephone unless you have requested that notification be by mail. You must not assume approval until you receive actual notice of approval. The 7 day time period may be changed only by separate written Agreement.</li>
            <li><span className="font-medium">Refund after non-approval.</span> If you or any co-applicant is disapproved or deemed disapproved under Paragraph 6, we'll refund all application deposits within 30 days of such disapproval. Refund checks may be made payable to all co-applicants and mailed to one applicant.</li>
            <li><span className="font-medium">Extension of deadlines.</span> If the deadline for approving or refunding under paragraphs 6 or 7 falls on a Saturday, Sunday, or a state or federal holiday, the deadline will be extended to the end of the next business day.</li>
            <li><span className="font-medium">Keys or access devices.</span> We'll furnish keys and/or access devices only after: (1) all parties have signed the Lease and other rental documents referred to in the Lease; and (2) all applicable rents and security deposits have been paid in full.</li>
            <li><span className="font-medium">Application submission.</span> Submission of an Application does not guarantee approval or acceptance. It does not bind us to accept the applicant or to sign a Lease. Images on our website may represent a sample of a unit and may not reflect specific details of any unit. For information not found on our website regarding unit availability, unit characteristics, pricing or other questions, please call or visit our office.</li>
            <li><span className="font-medium">Notice to or from co-applicants.</span> Any notice we give you or your co-applicant is considered notice to all co-applicants; and any notice from you or your co-applicant is considered notice from all co-applicants.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
