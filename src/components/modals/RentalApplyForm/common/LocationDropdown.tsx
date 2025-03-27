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

interface LocationDropdownProps {
  type: "state" | "country";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export function LocationDropdown({
  type,
  value,
  onChange,
  placeholder,
  className,
}: LocationDropdownProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const options = type === "state" ? US_STATES : COUNTRIES;
  const filteredOptions = options.filter(
    (option) =>
      option.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      option.value.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className || "w-[150px]"}>
        <SelectValue placeholder={placeholder || `Select ${type}`} />
      </SelectTrigger>
      <SelectContent>
        <div className="pb-2">
          <Input
            placeholder={`Search ${type}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-8"
          />
        </div>
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
