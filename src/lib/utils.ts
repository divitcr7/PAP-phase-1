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
