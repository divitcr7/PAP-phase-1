import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  GOVERNMENT_ID_TYPES,
  INTERNATIONAL_ID_TYPES,
} from "@/constants/identification";

interface IDTypeDropdownProps {
  value: string;
  onChange: (value: string) => void;
  isUSCitizen: boolean;
  placeholder?: string;
  className?: string;
}

export function IDTypeDropdown({
  value,
  onChange,
  isUSCitizen,
  placeholder = "Select ID type",
  className,
}: IDTypeDropdownProps) {
  const options = isUSCitizen ? GOVERNMENT_ID_TYPES : INTERNATIONAL_ID_TYPES;

  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className={className || "w-[290px]"}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((type) => (
          <SelectItem key={type.value} value={type.value}>
            {type.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
