import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add this function to your utils file
export function formatPhoneNumber(value: string) {
  // Remove all non-digits
  const number = value.replace(/\D/g, '');
  
  // Return empty if no number
  if (!number) return '';
  
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
