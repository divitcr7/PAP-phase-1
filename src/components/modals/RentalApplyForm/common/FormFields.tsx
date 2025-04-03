import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import { UseFormReturn, Path, FieldValues, PathValue } from "react-hook-form";
import { formatCurrency } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";

// Base props for all form fields
interface BaseFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  required?: boolean;
  className?: string;
}

// Props for input fields
interface FormInputFieldProps<T extends FieldValues>
  extends BaseFormFieldProps<T> {
  placeholder?: string;
  type?: string;
  maxLength?: number;
  max?: string;
  min?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputClassName?: string;
}

// Props for checkbox fields
interface FormCheckboxFieldProps<T extends FieldValues>
  extends BaseFormFieldProps<T> {
  options: {
    value: string | boolean;
    label: string;
  }[];
  inline?: boolean;
}

interface FormCurrencyFieldProps<T extends FieldValues>
  extends BaseFormFieldProps<T> {
  placeholder?: string;
  maxValue?: number;
  inputClassName?: string;
}

interface FormSimpleCheckboxProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: React.ReactNode;
  className?: string;
}

// Props for textarea fields
interface FormTextareaFieldProps<T extends FieldValues>
  extends BaseFormFieldProps<T> {
  placeholder?: string;
  rows?: number;
  textareaClassName?: string;
}

// Simple checkbox with label component
export function FormSimpleCheckbox<T extends FieldValues>({
  form,
  name,
  label,
  className = "",
}: FormSimpleCheckboxProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={`flex items-start space-x-3 space-y-0 ${className}`}
        >
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>
          <FormLabel className="font-normal">{label}</FormLabel>
        </FormItem>
      )}
    />
  );
}

// Textarea field component
export function FormTextareaField<T extends FieldValues>({
  form,
  name,
  label,
  required = false,
  className = "",
  placeholder = "",
  rows = 4,
  textareaClassName = "",
}: FormTextareaFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel required={required}>{label}</FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder={placeholder}
              className={`min-h-[${rows * 24}px] ${textareaClassName}`}
              rows={rows}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Reusable currency input field component
export function FormCurrencyField<T extends FieldValues>({
  form,
  name,
  label,
  required = false,
  className = "",
  placeholder = "",
  maxValue = 1000000,
  inputClassName = "",
}: FormCurrencyFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className="flex items-center gap-2">
            <FormLabel className="min-w-fit" required={required}>
              {label}
            </FormLabel>
            <FormControl>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2">
                  $
                </span>
                <Input
                  {...field}
                  type="text"
                  inputMode="numeric"
                  className={`pl-7 ${inputClassName}`}
                  placeholder={placeholder}
                  value={formatCurrency(field.value)}
                  onChange={(e) => {
                    // Remove all non-numeric characters except decimal point
                    const value = e.target.value.replace(/[^0-9.]/g, "");
                    const num = parseFloat(value);

                    // Check if it's a valid number and not exceeding max value
                    if (!isNaN(num) && num <= maxValue) {
                      field.onChange(num);
                    } else if (value === "" || value === ".") {
                      field.onChange("");
                    }
                  }}
                />
              </div>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

// Reusable input field component
export function FormInputField<T extends FieldValues>({
  form,
  name,
  label,
  required = false,
  className = "",
  placeholder = "",
  type = "text",
  maxLength,
  max,
  min,
  onChange,
  inputClassName = "",
}: FormInputFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className="flex items-center gap-2">
            <FormLabel className="min-w-fit" required={required}>
              {label}
            </FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder={placeholder}
                type={type}
                maxLength={maxLength}
                max={max}
                min={min}
                className={inputClassName}
                onChange={onChange || field.onChange}
                value={(field.value as string) || ""}
              />
            </FormControl>
          </div>
          {/* <FormMessage /> */}
        </FormItem>
      )}
    />
  );
}

// Reusable checkbox field component for yes/no or multiple choice
export function FormCheckboxField<T extends FieldValues>({
  form,
  name,
  label,
  required = false,
  className = "",
  options,
  inline = true,
}: FormCheckboxFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div
            className={`flex items-center ${
              inline ? "gap-4 h-9" : "flex-col gap-2"
            }`}
          >
            <FormLabel className={inline ? "" : "mb-1"} required={required}>
              {label}
            </FormLabel>
            <FormControl>
              <div className={`flex ${inline ? "gap-4" : "flex-col gap-2"}`}>
                {options.map((option, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <Checkbox
                      checked={field.value === option.value}
                      onCheckedChange={() =>
                        form.setValue(
                          name,
                          option.value as PathValue<T, Path<T>>
                        )
                      }
                    />
                    <span>{option.label}</span>
                  </label>
                ))}
              </div>
            </FormControl>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
