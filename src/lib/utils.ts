import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { differenceInYears, parse, format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const today = new Date();
export const min18Years = new Date(
  today.getFullYear() - 18,
  today.getMonth(),
  today.getDate()
)
  .toISOString()
  .split("T")[0];
export const todaysDate = new Date().toISOString().split("T")[0];

export function calculateYearsBetween(
  startDate: string | Date,
  endDate: Date = new Date()
): number {
  try {
    // If startDate is a string, parse it
    const parsedStartDate =
      typeof startDate === "string"
        ? parse(startDate, "yyyy-MM-dd", new Date())
        : startDate;

    return differenceInYears(endDate, parsedStartDate);
  } catch (error) {
    console.error("Error calculating years between dates:", error);
    return 0;
  }
}

// Add this function to your utils file
export function isLessThanYearsAgo(
  dateString: string,
  years: number = 5
): boolean {
  if (!dateString) return true;

  return calculateYearsBetween(dateString) < years;
}

export function formatDate(
  dateString: string,
  formatStr: string = "MM/dd/yyyy"
): string {
  if (!dateString) return "";

  try {
    const date = parse(dateString, "yyyy-MM-dd", new Date());
    return format(date, formatStr);
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
}

export function formatPhoneNumber(value: string) {
  // Remove all non-digits
  const number = value.replace(/\D/g, "");

  // Return empty if no number
  if (!number) return "";

  // Format according to length
  if (number.length <= 3) {
    return `(${number}`;
  }
  if (number.length <= 6) {
    return `(${number.slice(0, 3)}) ${number.slice(3)}`;
  }
  return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(6, 10)}`;
}

export function formatCurrency(
  value: string | number,
  maxValue = 1000000
): string {
  // Handle empty values
  if (value === "" || value === null || value === undefined) return "";

  // Convert to string and remove non-numeric characters except decimal point
  const numStr = value.toString().replace(/[^0-9.]/g, "");

  // Parse to number
  const num = parseFloat(numStr);

  // Return empty string if not a valid number
  if (isNaN(num)) return "";

  // Enforce maximum value
  if (num > maxValue) return maxValue.toLocaleString("en-US");

  // Format with commas
  return num.toLocaleString("en-US");
}

export function processCurrencyInput(
  value: string,
  maxValue = 1000000
): number | string {
  // Remove all non-numeric characters except decimal point
  const cleanValue = value.replace(/[^0-9.]/g, "");

  // Return empty string for empty input
  if (cleanValue === "" || cleanValue === ".") return "";

  // Parse to number
  const num = parseFloat(cleanValue);

  // Return empty string if not a valid number
  if (isNaN(num)) return "";

  // Enforce maximum value
  return num > maxValue ? maxValue : num;
}

export function generateYearOptions(
  startYear = 1950,
  endYear = new Date().getFullYear() + 1
): Array<{ label: string; value: string }> {
  const years = [];
  for (let year = endYear; year >= startYear; year--) {
    years.push({ label: year.toString(), value: year.toString() });
  }
  return years;
};