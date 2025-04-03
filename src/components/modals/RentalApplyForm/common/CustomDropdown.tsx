import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { US_STATES } from "@/constants/states";
import { COUNTRIES } from "@/constants/countries";

export interface OptionType {
  value: string;
  label: string;
}

interface CustomDropdownProps {
  type: "state" | "country" | string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  options?: OptionType[];
  showSearch?: boolean;
}

export function CustomDropdown({
  type,
  value,
  onChange,
  placeholder,
  className,
  options,
  showSearch = true,
}: CustomDropdownProps) {
  const [searchQuery, setSearchQuery] = useState("");

  // Use built-in options for state/country or custom options if provided
  const dropdownOptions = options || (type === "state" ? US_STATES : COUNTRIES);

  const filteredOptions = dropdownOptions.filter(
    (option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const safeValue = typeof value === "string" ? value : "";

  return (
    <Select value={safeValue} onValueChange={onChange}>
      <SelectTrigger className={className || "w-[120px]"}>
        <SelectValue placeholder={placeholder || `Select ${type}`} />
      </SelectTrigger>
      <SelectContent>
        {showSearch && (
          <div className="pb-2">
            <Input
              placeholder={`Search ${type}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-8"
            />
          </div>
        )}
        <div className="max-h-[200px] overflow-y-auto">
          {filteredOptions.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </div>
      </SelectContent>
    </Select>
  );
}
