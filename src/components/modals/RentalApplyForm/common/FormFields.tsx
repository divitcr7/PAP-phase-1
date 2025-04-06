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
import { useState } from "react";

// Base props for all form fields
interface BaseFormFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  description?: string;
  required?: boolean;
  className?: string;
}

// Props for input fields
interface FormInputFieldProps<T extends FieldValues>
  extends BaseFormFieldProps<T> {
  placeholder?: string;
  type?: string;
  maxLength?: number;
  max?: string | number;
  min?: string | number;
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
  required?: boolean;
}

// Props for textarea fields
interface FormTextareaFieldProps<T extends FieldValues> {
  form: UseFormReturn<T>;
  name: Path<T>;
  required?: boolean;
  className?: string;
  placeholder?: string;
  rows?: number;
  label: React.ReactNode;
  labelClassName?: string;
  textareaClassName?: string;
  maxChars?: number;
}

export function FormSimpleCheckbox<T extends FieldValues>({
  form,
  name,
  label,
  className = "",
  required,
}: FormSimpleCheckboxProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const value = field.value === undefined ? false : !!field.value;

        return (
          <FormItem
            className={`flex items-start space-x-3 space-y-0 ${className}`}
          >
            <FormControl>
              <Checkbox
                checked={value}
                onCheckedChange={(checked) => {
                  field.onChange(checked || false);
                }}
              />
            </FormControl>
            <FormLabel className="font-normal" required={required}>
              {label}
            </FormLabel>
          </FormItem>
        );
      }}
    />
  );
}

export function FormTextareaField<T extends FieldValues>({
  form,
  name,
  label,
  required = false,
  className = "",
  placeholder = "",
  rows = 4,
  labelClassName = "",
  textareaClassName = "",
  maxChars,
}: FormTextareaFieldProps<T>) {

  const [charCount, setCharCount] = useState(0);

  const isApproachingLimit =
    maxChars &&
    charCount >= Math.max(maxChars - Math.min(Math.floor(maxChars * 0.1), 10), 3);

  const isAtLimit = maxChars && charCount >= maxChars;

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel required={required} className={labelClassName}>
            {label}
          </FormLabel>
          <FormControl>
            <Textarea
              {...field}
              placeholder={placeholder}
              className={`resize-none ${textareaClassName}`}
              rows={rows}
              onChange={(e) => {
                const value = e.target.value;
                setCharCount(value.length);
                field.onChange(e);
              }}
              maxLength={maxChars}
            />
          </FormControl>
          {maxChars && charCount > 0 && (
            <div
              className={`text-sm mt-1 text-right ${
                isAtLimit
                  ? "text-red-600 font-medium"
                  : isApproachingLimit
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              {charCount}/{maxChars} characters used
            </div>
          )}
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
                    const value = e.target.value.replace(/[^0-9.]/g, "");
                    const num = parseFloat(value);
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

export function FormInputField<T extends FieldValues>({
  form,
  name,
  label,
  description,
  required = false,
  className = "",
  placeholder = "",
  type = "text",
  maxLength,
  max,
  min,
  onChange,
  inputClassName = "[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
}: FormInputFieldProps<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <div className="flex items-center gap-2">
            <FormLabel className="min-w-fit" required={required}>
              {description ? (
                <div className="flex flex-col items-start justify-between">
                  <div>{label}</div>
                  <div className="text-xs text-muted-foreground">
                    {description}
                  </div>
                </div>
              ) : (
                label
              )}
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
        </FormItem>
      )}
    />
  );
}

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
