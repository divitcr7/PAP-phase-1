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
import { ApplyFormValues } from "@/schemas/ApplyForm";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function StepOne({ form, }: { form: UseFormReturn<ApplyFormValues>; }) {
  return (
    <div className="space-y-6">
      {/* About You */}
      <div className="space-y-3">
        <h3 className="text-lg font-medium underline">ABOUT YOU</h3>
        <div className="grid grid-cols-12 gap-12">
          {/* Full Name section */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem className="col-span-6">
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">Full Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Gender - Takes up 3 columns */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">Gender:</FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value === "male"}
                          onCheckedChange={() =>
                            form.setValue("gender", "male")
                          }
                        />
                        <span>Male</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value === "female"}
                          onCheckedChange={() =>
                            form.setValue("gender", "female")
                          }
                        />
                        <span>Female</span>
                      </label>
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Birthdate */}
          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem className="col-span-3">
                <div className="flex items-center gap-2 max-w-fit">
                  <FormLabel className="min-w-fit">Birthdate</FormLabel>
                  <FormControl>
                    <Input {...field} type="date" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Accordion type="single" collapsible className="">
          <AccordionItem value="former-name">
            <AccordionTrigger className="underline">
              Former Name (If applicable)
            </AccordionTrigger>
            <AccordionContent>
              <FormField
                control={form.control}
                name="formerName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} placeholder="Enter former name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="grid grid-cols-3 gap-8">
          <FormField
            control={form.control}
            name="socialSecurity"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">
                    Social Security No.
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="driverLicense"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">Driver License</FormLabel>
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
            name="driverLicenseState"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">
                    State (Driver License)
                  </FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-12">
          <FormField
            control={form.control}
            name="governmentID"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2">
                  <FormLabel className="min-w-fit">Government ID</FormLabel>
                  <FormControl className="w-full">
                    <Input className="w-full" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="governmentIDState"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-3">
                  <FormLabel className="min-w-fit">
                    State (Government ID State)
                  </FormLabel>
                  <FormControl className="w-full">
                    <Input className="w-full" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* Contact Information */}
        <div className="grid grid-cols-4 gap-6">
          <FormField
            control={form.control}
            name="homePhone"
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
            name="cellPhone"
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
            name="workPhonePersonal"
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
            name="email"
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

        {/* Additional Information */}
        <div className="flex gap-4 justify-between">
          <FormField
            control={form.control}
            name="isMarried"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-4">
                  <FormLabel>Marital Status</FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value === true}
                          onCheckedChange={() =>
                            form.setValue("isMarried", true)
                          }
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value === false}
                          onCheckedChange={() =>
                            form.setValue("isMarried", false)
                          }
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isUSCitizen"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-4">
                  <FormLabel>US Citizen</FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value === true}
                          onCheckedChange={() =>
                            form.setValue("isUSCitizen", true)
                          }
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value === false}
                          onCheckedChange={() =>
                            form.setValue("isUSCitizen", false)
                          }
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="isSmoker"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-4">
                  <FormLabel>Do you or does any occupant smoke?</FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value === true}
                          onCheckedChange={() =>
                            form.setValue("isSmoker", true)
                          }
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value === false}
                          onCheckedChange={() =>
                            form.setValue("isSmoker", false)
                          }
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="apartmentAddress"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-3">
                <FormLabel className="min-w-fit">
                  I am applying for the apartment located at
                </FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Co-Applicant Section */}
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="hasCoApplicant"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-4">
                  <FormLabel>Is there a Co-Applicant?</FormLabel>
                  <FormControl>
                    <div className="flex gap-4">
                      <label className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value === true}
                          onCheckedChange={() =>
                            form.setValue("hasCoApplicant", true)
                          }
                        />
                        <span>Yes</span>
                      </label>
                      <label className="flex items-center space-x-2">
                        <Checkbox
                          checked={field.value === false}
                          onCheckedChange={() =>
                            form.setValue("hasCoApplicant", false)
                          }
                        />
                        <span>No</span>
                      </label>
                    </div>
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {form.watch("hasCoApplicant") && (
            <div className="space-y-1">
              {form.watch("coApplicants", [])?.map((_, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <FormField
                    control={form.control}
                    name={`coApplicants.${index}.name`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <div className="flex items-center gap-2">
                          <FormLabel className="min-w-fit">Name</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Co-applicant name" />
                          </FormControl>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`coApplicants.${index}.email`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <div className="flex items-center gap-2">
                          <FormLabel className="min-w-fit">Email</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              placeholder="Co-applicant email"
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
                      const coApplicants = form.getValues("coApplicants") || [];
                      coApplicants.splice(index, 1);
                      form.setValue("coApplicants", coApplicants);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}

              {(form.watch("coApplicants", [])?.length ?? 0) < 3 && (
                <Button
                  className="underline"
                  variant="link"
                  type="button"
                  onClick={() => {
                    const coApplicants = form.getValues("coApplicants") || [];
                    form.setValue("coApplicants", [
                      ...coApplicants,
                      { name: "", email: "" },
                    ]);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Co-Applicant
                </Button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Other Occupants */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium underline">OTHER OCCUPANTS</h3>
        {form.watch("occupants")?.map((_, index) => (
          <div key={index} className="space-y-4 p-4 border rounded-lg">
            <div className="flex gap-4 items-center justify-between">
              <h4 className="font-medium">Occupant {index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => {
                  const occupants = form.getValues("occupants");
                  if (occupants) {
                    occupants.splice(index, 1);
                    form.setValue("occupants", occupants);
                  }
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex gap-4">
              <FormField
                control={form.control}
                name={`occupants.${index}.name`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <div className="flex items-center gap-2">
                      <FormLabel className="min-w-fit">Full Name</FormLabel>
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
                name={`occupants.${index}.relationship`}
                render={({ field }) => (
                  <FormItem className="w-[300px]">
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
                name={`occupants.${index}.birthdate`}
                render={({ field }) => (
                  <FormItem className="">
                    <div className="flex items-center gap-2">
                      <FormLabel className="min-w-fit">Birthdate</FormLabel>
                      <FormControl>
                        <Input {...field} type="date" className="w-[150px]" />
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
                name={`occupants.${index}.socialSecurity`}
                render={({ field }) => (
                  <FormItem className="w-[350px]">
                    <div className="flex items-center gap-2">
                      <FormLabel className="min-w-fit">
                        Social Security No.
                      </FormLabel>
                      <FormControl>
                        <Input {...field} type="password" />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`occupants.${index}.driverLicense`}
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <div className="flex items-center gap-2">
                      <FormLabel className="min-w-fit">
                        Driver License
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
                name={`occupants.${index}.driverLicenseState`}
                render={({ field }) => (
                  <FormItem className="w-[300px]">
                    <div className="flex items-center gap-2">
                      <FormLabel className="min-w-fit">State (DL)</FormLabel>
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
                name={`occupants.${index}.governmentID`}
                render={({ field }) => (
                  <FormItem className="w-[400px]">
                    <div className="flex items-center gap-2">
                      <FormLabel className="min-w-fit">Government ID</FormLabel>
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
                name={`occupants.${index}.governmentIDState`}
                render={({ field }) => (
                  <FormItem className="w-[300px]">
                    <div className="flex items-center gap-2">
                      <FormLabel className="min-w-fit">
                        State (Gov ID)
                      </FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        ))}

        {(form.watch("occupants", [])?.length ?? 0) < 6 && (
          <Button
            type="button"
            variant="link"
            className="underline"
            onClick={() => {
              const occupants = form.getValues("occupants") || [];
              form.setValue("occupants", [
                ...occupants,
                {
                  name: "",
                  relationship: "",
                  birthdate: "",
                  socialSecurity: "",
                  driverLicense: "",
                  driverLicenseState: "",
                  governmentID: "",
                  governmentIDState: "",
                },
              ]);
            }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Occupant
          </Button>
        )}
      </div>

      {/* Where you live */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium underline">WHERE YOU LIVE</h3>
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <FormField
              control={form.control}
              name="currentAddress"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex items-center gap-2">
                    <FormLabel className="min-w-fit">
                      <div className="flex flex-col items-center justify-between">
                        <div>Current Home Address</div>
                        <div className="text-xs text-muted-foreground">
                          Where you live
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
              name="ownerPhone"
              render={({ field }) => (
                <FormItem className="w-[240px]">
                  <div className="flex items-center gap-2">
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input {...field} type="tel" />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4 items-center">
            <FormField
              control={form.control}
              name="residenceType"
              render={({ field }) => (
                <FormItem className="min-w-fit">
                  <div className="flex items-center gap-2">
                    <FormLabel>Do you</FormLabel>
                    <div className="flex gap-2">
                      <label className="flex items-center space-x-1">
                        <Checkbox
                          checked={field.value === "rent"}
                          onCheckedChange={() =>
                            form.setValue("residenceType", "rent")
                          }
                        />
                        <span>Rent</span>
                      </label>
                      <label className="flex items-center space-x-1">
                        <Checkbox
                          checked={field.value === "own"}
                          onCheckedChange={() =>
                            form.setValue("residenceType", "own")
                          }
                        />
                        <span>Own</span>
                      </label>
                    </div>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="residencyStartDate"
              render={({ field }) => (
                <FormItem className="w-fit">
                  <div className="flex items-center gap-2">
                    <FormLabel>Beginning date of residency</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" className="w-fit" />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="monthlyPayment"
              render={({ field }) => (
                <FormItem className="">
                  <div className="flex items-center gap-2">
                    <FormLabel className="min-w-fit">
                      Monthly payment ($)
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        className="w-[180px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                      />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apartmentName"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex items-center gap-2">
                    <FormLabel className="min-w-fit">Apartment name</FormLabel>
                    <FormControl>
                      <Input {...field} className="" />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </div>

          <div className="flex gap-4">
            <FormField
              control={form.control}
              name="ownerName"
              render={({ field }) => (
                <FormItem className="w-[400px]">
                  <div className="flex items-center gap-2">
                    <FormLabel>Name of owner or manager</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="reasonForLeaving"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <div className="flex items-center gap-2">
                    <FormLabel>Reason for leaving</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="previous-address">
              <AccordionTrigger className="font-medium italic underline">
                Fill out if you have been at your current address for less than
                five years
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="previousAddress"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2">
                        <FormLabel className="min-w-fit">
                          <div className="flex flex-col items-center justify-between">
                            <div className="min-w-fit">
                              Previous home address
                            </div>
                            <div className="text-xs text-muted-foreground">
                              (most recent)
                            </div>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </div>
                    </FormItem>
                  )}
                />

                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="previousCity"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <div className="flex items-center gap-2">
                          <FormLabel>City</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="previousState"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <div className="flex items-center gap-2">
                          <FormLabel>State</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="previousZip"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <div className="flex items-center gap-2">
                          <FormLabel>ZIP</FormLabel>
                          <FormControl>
                            <Input {...field} className="w-[140px]" />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="previousPhone"
                    render={({ field }) => (
                      <FormItem className="flex-1 w-[240px]">
                        <div className="flex items-center gap-2">
                          <FormLabel className="min-w-fit">Phone</FormLabel>
                          <FormControl>
                            <Input {...field} type="tel" />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-4 items-center">
                  <FormField
                    control={form.control}
                    name="previousResidenceType"
                    render={({ field }) => (
                      <FormItem className="w-fit">
                        <div className="flex items-center gap-2">
                          <FormLabel>Do you</FormLabel>
                          <div className="flex gap-2">
                            <label className="flex items-center space-x-1">
                              <Checkbox
                                checked={field.value === "rent"}
                                onCheckedChange={() =>
                                  form.setValue("previousResidenceType", "rent")
                                }
                              />
                              <span>Rent</span>
                            </label>
                            <label className="flex items-center space-x-1">
                              <Checkbox
                                checked={field.value === "own"}
                                onCheckedChange={() =>
                                  form.setValue("previousResidenceType", "own")
                                }
                              />
                              <span>Own</span>
                            </label>
                          </div>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="previousDateFrom"
                    render={({ field }) => (
                      <FormItem className="w-fit">
                        <div className="flex items-center gap-2">
                          <FormLabel>Dates: From</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" className="w-fit" />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="previousDateTo"
                    render={({ field }) => (
                      <FormItem className="w-fit">
                        <div className="flex items-center gap-2">
                          <FormLabel>To</FormLabel>
                          <FormControl>
                            <Input {...field} type="date" className="w-fit" />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="previousMonthlyPayment"
                    render={({ field }) => (
                      <FormItem className="w-[300px]">
                        <div className="flex items-center gap-2">
                          <FormLabel className="min-w-fit">
                            Monthly payment ($)
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="number"
                              className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                            />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="previousApartmentName"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <div className="flex items-center gap-2">
                          <FormLabel className="min-w-fit">
                            Apartment name
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="previousOwnerName"
                    render={({ field }) => (
                      <FormItem className="w-[400px]">
                        <div className="flex items-center gap-2">
                          <FormLabel className="">
                            Name of owner or manager
                          </FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="previousReasonForLeaving"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <div className="flex items-center gap-2">
                          <FormLabel className="">Reason for leaving</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
}
