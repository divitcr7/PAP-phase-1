import { Plus, X } from "lucide-react";
import type { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ApplyFormValues } from "../../../../schemas/ApplyForm";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";

export default function StepThree({
  form,
}: {
  form: UseFormReturn<ApplyFormValues>;
}) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium underline">HOW DID YOU FIND US</h3>
        <div className="space-y-4">
          <div className="flex items-start gap-8">
            <FormField
              control={form.control}
              name="referralSource"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-4">
                    <FormLabel className="min-w-[180px]">How did you hear about us?</FormLabel>
                    <FormControl>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="Select an option" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="website">Website</SelectItem>
                          <SelectItem value="friend">Friend</SelectItem>
                          <SelectItem value="social">Social Media</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            {form.watch("referralSource") && (
              <FormField
                control={form.control}
                name="referralDetails"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <div className="flex items-center gap-4">
                                            <FormLabel className="min-w-fit whitespace-nowrap">
                        <div className="flex flex-col items-start justify-between">
                          <div>
                            {form.watch("referralSource") === "website" && "Website address"}
                            {form.watch("referralSource") === "friend" && "Name"}
                            {form.watch("referralSource") === "social" && "Social Media"}
                            {form.watch("referralSource") === "other" && "Other"}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {form.watch("referralSource") === "website" && "(Enter the website URL)"}
                            {form.watch("referralSource") === "friend" && "(Referral from a person or locator)"}
                            {form.watch("referralSource") === "social" && "(Please specify platform)"}
                            {form.watch("referralSource") === "other" && "(Please specify)"}
                          </div>
                        </div>
                      </FormLabel>
                      <FormControl>
                        <Input {...field} className="w-[500px]" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium underline">EMERGENCY CONTACT</h3>
        <p className="text-sm font-medium italic">
          Emergency contact person over 18 who will not be living with you:
        </p>

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="emergencyContact.name"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">Name</FormLabel>
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
            name="emergencyContact.relationship"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">Relationship</FormLabel>
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
            name="emergencyContact.zip"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">ZIP</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormField
            control={form.control}
            name="emergencyContact.address"
            render={({ field }) => (
              <FormItem>
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
            name="emergencyContact.city"
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
            name="emergencyContact.state"
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

        <div className="grid grid-cols-4 gap-4">
          <FormField
            control={form.control}
            name="emergencyContact.homePhone"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">Home Phone</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emergencyContact.cellPhone"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">Cell Phone</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emergencyContact.workPhone"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">Work Phone</FormLabel>
                  <FormControl>
                    <Input {...field} type="tel" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="emergencyContact.email"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4">
          <p className="text-sm">
            If you die or are seriously ill, missing, or incarcerated according to an affidavit of (check one or more)
            <FormField
              control={form.control}
              name="emergencyContact.authorizedPersons.abovePerson"
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mx-2 inline-block"
                />
              )}
            />
            the above person,
            <FormField
              control={form.control}
              name="emergencyContact.authorizedPersons.spouse"
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mx-2 inline-block"
                />
              )}
            />
            your spouse, or
            <FormField
              control={form.control}
              name="emergencyContact.authorizedPersons.parentChild"
              render={({ field }) => (
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="mx-2 inline-block"
                />
              )}
            />
            your parent or child, we may allow such person(s) to enter your dwelling to remove all contents, as well as your property in the mailbox, storerooms, and common areas. If no box is checked, any of the above are authorized at our option. If you are seriously ill or injured, you authorize us to call EMS or send for an ambulance at your expense. We're not legally obligated to do so.
          </p>
        </div>
      </div>

        <Accordion type="single" collapsible>
          <AccordionItem value="vehicles">
            <AccordionTrigger>
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-medium underline">YOUR VEHICLES</h3>
                <span className="text-sm text-muted-foreground italic">
                  (if applicable)
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p className="text-sm font-medium italic">List all vehicles owned or operated by you or any occupants (including cars, trucks, motorcycles, trailers, etc.)</p>
                {(form.watch("vehicles") || []).map((_, index) => (
                  <div key={index} className="">
                    <div className="flex gap-1">
                    <div className="grid grid-cols-20 gap-4 items-center">
                      <FormField
                        control={form.control}
                        name={`vehicles.${index}.make`}
                        render={({ field }) => (
                          <FormItem className="col-span-4">
                            <div className="flex items-center gap-2">
                              <FormLabel className="min-w-fit">Make</FormLabel>
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
                        name={`vehicles.${index}.model`}
                        render={({ field }) => (
                          <FormItem className="col-span-4">
                            <div className="flex items-center gap-2">
                              <FormLabel className="min-w-fit">Model</FormLabel>
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
                        name={`vehicles.${index}.color`}
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <div className="flex items-center gap-2">
                              <FormLabel className="min-w-fit">Color</FormLabel>
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
                        name={`vehicles.${index}.year`}
                        render={({ field }) => (
                          <FormItem className="col-span-2">
                            <div className="flex items-center gap-2">
                              <FormLabel className="min-w-fit">Year</FormLabel>
                              <FormControl>
                                <Input {...field} type="number" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`vehicles.${index}.license`}
                        render={({ field }) => (
                          <FormItem className="col-span-3">
                            <div className="flex items-center gap-2">
                              <FormLabel className="min-w-fit">License #</FormLabel>
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
                        name={`vehicles.${index}.state`}
                        render={({ field }) => (
                          <FormItem className="col-span-4">
                            <div className="flex items-center gap-2">
                              <FormLabel className="min-w-fit">State</FormLabel>
                              <FormControl>
                                <Input {...field} maxLength={2} className="uppercase" />
                              </FormControl>
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="col-span-1"
                        onClick={() => {
                          const currentVehicles = [...(form.getValues("vehicles") || [])];
                          currentVehicles.splice(index, 1);
                          form.setValue("vehicles", currentVehicles);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {((form.watch("vehicles")?.length ?? 0) < 4) && (
                  <Button
                    type="button"
                    variant="link"
                    className="underline"
                    onClick={() => {
                      const vehicles = [...(form.getValues("vehicles") || [])];
                      form.setValue("vehicles", [
                        ...vehicles,
                        { make: "", model: "", color: "", year: "", license: "", state: "" },
                      ]);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Vehicle
                  </Button>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <Accordion type="single" collapsible>
          <AccordionItem value="animals">
            <AccordionTrigger>
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-medium underline">YOUR ANIMALS</h3>
                <span className="text-sm text-muted-foreground italic">
                  (if applicable)
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <p className="text-sm">
                  You may not have any animal in your unit without management's
                  prior authorization in writing. If we allow your requested
                  animal, you must sign a separate animal addendum, which may
                  require additional deposits, rents, fees or other charges.
                </p>
                {(form.watch("pets") || []).map((_, index) => (
                  <div key={index} className="">
                    <div className="flex gap-4">
                      <div className="grid grid-cols-13 items-center gap-4">
                        <FormField
                          control={form.control}
                          name={`pets.${index}.type`}
                          render={({ field }) => (
                            <FormItem className="col-span-6">
                              <div className="flex items-center gap-2">
                                <FormLabel className="min-w-fit">Kind</FormLabel>
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
                          name={`pets.${index}.weight`}
                          render={({ field }) => (
                            <FormItem className="col-span-2">
                              <div className="flex items-center gap-2">
                                <FormLabel className="min-w-fit">Weight</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name={`pets.${index}.breed`}
                          render={({ field }) => (
                            <FormItem className="col-span-4">
                              <div className="flex items-center gap-2">
                                <FormLabel className="min-w-fit">Breed</FormLabel>
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
                          name={`pets.${index}.age`}
                          render={({ field }) => (
                            <FormItem className="col-span-1">
                              <div className="flex items-center gap-2">
                                <FormLabel className="min-w-fit">Age</FormLabel>
                                <FormControl>
                                  <Input {...field} type="number" className="w-[60px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none" />
                                </FormControl>
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className=""
                        onClick={() => {
                          const currentPets = [...(form.getValues("pets") || [])];
                          currentPets.splice(index, 1);
                          form.setValue("pets", currentPets);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                {((form.watch("pets")?.length ?? 0) < 2) && (
                  <Button
                    type="button"
                    variant="link"
                    className="underline"
                    onClick={() => {
                      const pets = [...(form.getValues("pets") || [])];
                      form.setValue("pets", [
                        ...pets,
                        { type: "", breed: "", weight: "", age: "" },
                      ]);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Animal
                  </Button>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
    </div>
  );
}