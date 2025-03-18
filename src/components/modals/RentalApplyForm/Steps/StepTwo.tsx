import type { UseFormReturn } from "react-hook-form";
import { Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { ApplyFormValues } from "@/schemas/ApplyForm";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function StepTwo({
  form,
}: {
  form: UseFormReturn<ApplyFormValues>;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium underline">YOUR WORK</h3>

        <div className="grid grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="employer"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">Current Employer</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="position"
            render={({ field }) => (
              <FormItem className="col-span-1">
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">Position</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="grossMonthlyIncome"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-1">
                  <FormLabel className="min-w-fit">
                    Gross Monthly Income ($)
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type="number"
                      className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="employmentDate"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">Beginning Date</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" className="w-fit" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workAddress"
            render={({ field }) => (
              <FormItem className="flex-1">
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">Address</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workCity"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">City</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workState"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">State</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="workPhone"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">Work Phone</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" className="w-[140px]" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="supervisorName"
            render={({ field }) => (
              <FormItem className="flex-1">
                <div className="flex items-center gap-2">
                  <FormLabel className="min">Supervisor</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="supervisorPhone"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">
                    Phone (Supervisor)
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" className="w-[140px]" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="workZIP"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">ZIP</FormLabel>
                  <FormControl>
                    <Input {...field} className="w-[100px]" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="previous-employment">
            <AccordionTrigger className="font-medium italic underline">
              Fill out if you have been with your current employer for less than five years.
            </AccordionTrigger>
            <AccordionContent className="space-y-4">
              <div className="grid grid-cols-4 gap-4">
                <FormField
                  control={form.control}
                  name="employer"
                  render={({ field }) => (
                    <FormItem className="col-span-2">
                      <div className="flex items-center gap-2">
                        <FormLabel className="min-w-fit">
                          <div className="flex flex-col items-center justify-between">
                            <div>Previous Employer</div>
                            <div className="text-xs text-muted-foreground">
                              (Most Recent)
                            </div>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="position"
                  render={({ field }) => (
                    <FormItem className="col-span-1">
                      <div className="flex items-center gap-2">
                        <FormLabel className="min-w-fit">Position</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="grossMonthlyIncome"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-1">
                        <FormLabel className="min-w-fit">
                          Gross Monthly Income ($)
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="number"
                            className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="workAddress"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex items-center gap-2">
                        <FormLabel className="min-w-fit">Address</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workCity"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel className="min-w-fit">City</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workState"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel className="min-w-fit">State</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workPhone"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel className="min-w-fit">Work Phone</FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" className="w-[140px]" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="workZIP"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel className="min-w-fit">ZIP</FormLabel>
                        <FormControl>
                          <Input {...field} className="w-[100px]" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="previousEmploymentStartDate"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel className="min-w-fit">Date: From</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" className="w-fit" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="previousEmploymentEndDate"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel className="min-w-fit">To</FormLabel>
                        <FormControl>
                          <Input {...field} type="date" className="w-fit" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="supervisorName"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <div className="flex items-center gap-2">
                        <FormLabel className="min">Supervisor</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="supervisorPhone"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel className="min-w-fit">
                          Phone (Supervisor)
                        </FormLabel>
                        <FormControl>
                          <Input {...field} type="tel" className="w-[140px]" />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium underline">ADDITIONAL INCOME</h3>
        <p className="text-sm font-medium italic">Income must be verified to be considered</p>

        {form.watch("additionalIncomes", [])?.map((_, index) => (
          <div
            key={index}
            className="grid grid-cols-3 gap-4 items-start"
          >
            <FormField
              control={form.control}
              name={`additionalIncomes.${index}.type`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel className="min-w-fit">Type</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name={`additionalIncomes.${index}.source`}
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2">
                    <FormLabel className="min-w-fit">Source</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-2">
              <FormField
                control={form.control}
                name={`additionalIncomes.${index}.amount`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <div className="flex items-center gap-2">
                      <FormLabel className="min-w-fit">
                        Gross Monthly ($)
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="number"
                          className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  const incomes = form.getValues("additionalIncomes") || [];
                  incomes.splice(index, 1);
                  form.setValue("additionalIncomes", incomes);
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))}

        {(form.watch("additionalIncomes", [])?.length ?? 0) < 2 && (
          <Button
            type="button"
            variant="link"
            className="underline"
            onClick={() => {
              const incomes = form.getValues("additionalIncomes") || [];
              form.setValue("additionalIncomes", [
                ...incomes,
                { type: "", source: "", amount: "" },
              ]);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Additional Income
          </Button>
        )}
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium underline">CREDIT HISTORY</h3>
        <FormField
          control={form.control}
          name="creditProblems"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                If applicable, please explain any past credit problems:
              </FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-[100px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium underline">
          RENTAL AND CRIMINAL HISTORY
        </h3>
        <div className="text-sm font-medium italic">
          Check only if applicable
        </div>
        <div className="text-sm">
          Have you or any occupant listed in this Application ever:
        </div>

        <div className="space-y-2">
          <FormField
            control={form.control}
            name="bankruptcy"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>been evicted or asked to move out?</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankruptcy"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>
                  moved out of a dwelling before the end of the lease term
                  without the owner's consent?
                </FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankruptcy"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>declared bankruptcy?</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankruptcy"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>been sued for rent?</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankruptcy"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>been sued for property damage?</FormLabel>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="bankruptcy"
            render={({ field }) => (
              <FormItem className="flex items-start space-x-3 space-y-0">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <FormLabel>been convicted or received probation for a felony, sex crime or any crime against persons or property?</FormLabel>
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="explanation"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="leading-5">Please indicate below the year, location, and type of each felony, sex crime or any crime against persons or property for which you were convicted or received probation.<br /> We may need to discuss more facts before making a decision. You represent the answer is "no" to any item not checked above.</FormLabel>
              <FormControl>
                <Textarea {...field} className="min-h-[100px]" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
