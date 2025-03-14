import React from "react";
import {
  Home,
  Settings,
  Warehouse,
  Bed,
  Bath,
  Ruler,
  Hammer,
} from "lucide-react";
import { CardContent } from "@/components/ui/card";

interface OverviewProps {
  id: number;
  type: string;
  garages: number;
  bedrooms: number;
  bathrooms: number;
  landSize: number;
  yearBuilt: number;
  size: number;
}

const Overview: React.FC<OverviewProps> = ({
  id,
  type,
  garages,
  bedrooms,
  bathrooms,
  landSize,
  yearBuilt,
  size,
}) => {
  const details = [
    { label: "ID", value: id, icon: Home },
    { label: "Type", value: type, icon: Settings },
    { label: "Garages", value: garages, icon: Warehouse },
    { label: "Bedrooms", value: `${bedrooms} Rooms`, icon: Bed },
    { label: "Bathrooms", value: `${bathrooms} Rooms`, icon: Bath },
    {
      label: "Land Size",
      value: `${landSize.toLocaleString()} SqFt`,
      icon: Ruler,
    },
    { label: "Year Built", value: yearBuilt, icon: Hammer },
    { label: "Size", value: `${size.toLocaleString()} SqFt`, icon: Ruler },
  ];

  return (
    <div className="p-4">
      <h6 className="text-xl font-semibold mb-4">Overview</h6>
      <CardContent className="grid grid-cols-4 gap-4">
        {details.map(({ label, value, icon: Icon }, index) => (
          <div key={index} className="flex items-center gap-3">
            <div className="rounded-lg border p-5">
              <Icon className="size-6 text-primary" />
            </div>
            <div>
              <span className="text-sm text-gray-500">{label}</span>
              <p className="text-base font-medium">{value}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </div>
  );
};

export default Overview;
