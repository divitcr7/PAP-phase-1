import { UseFormReturn } from "react-hook-form";
import { ApplyFormValues } from "@/schemas/ApplyForm/ApplyForm";
import { CustomDropdown } from "../../common/CustomDropdown";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMemo } from "react";
import { FormInputField } from "../../common/FormFields";

interface ReferralInfoProps {
  form: UseFormReturn<ApplyFormValues>;
}

export function ReferralInfo({ form }: ReferralInfoProps) {
  const referralSource = form.watch("referral.referralSource");

  const referralOptions = [
    { label: "Website", value: "website" },
    { label: "Friend", value: "friend" },
    { label: "Social Media", value: "social" },
    { label: "Other", value: "other" },
  ];

  const detailsConfig = useMemo(() => {
    const configs = {
      website: {
        label: "Website address",
        description: "(Enter the website URL)",
        placeholder: "https://example.com",
      },
      friend: {
        label: "Name",
        description: "(Referral from a person or locator)",
        placeholder: "John Doe",
      },
      social: {
        label: "Social Media",
        description: "(Please specify platform)",
        placeholder: "Instagram, Facebook, etc.",
      },
      other: {
        label: "Other",
        description: "(Please specify)",
        placeholder: "Please specify",
      },
    };

    return referralSource
      ? configs[referralSource as keyof typeof configs]
      : null;
  }, [referralSource]);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium underline">HOW DID YOU FIND US</h3>
      <div className="space-y-4">
        <div className="flex items-start gap-8">
          <FormField
            control={form.control}
            name="referral.referralSource"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-4">
                  <FormLabel className="">How did you hear about us?</FormLabel>
                  <FormControl>
                    <CustomDropdown
                      options={referralOptions}
                      value={field.value}
                      onChange={field.onChange}
                      placeholder="Select an option"
                      showSearch={false}
                      className="w-[180px]"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {detailsConfig && (
            <FormInputField
              form={form}
              name="referral.referralDetails"
              label={detailsConfig.label}
              description={detailsConfig.description}
              required
              placeholder={detailsConfig.placeholder}
              className="w-[500px]"
            />
          )}
        </div>
      </div>
    </div>
  );
}
