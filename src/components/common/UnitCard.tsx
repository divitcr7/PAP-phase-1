import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BathIcon,
  BedIcon,
  MapPin,
  RulerIcon,
  Building2,
  Hash,
} from "lucide-react";
import { Link } from "react-router";
import { Amenity } from "@/hooks/useUnits"; // Import the Amenity type

// Define the Unit interface based on the API response
interface Unit {
  unitId: string;
  propertyId: string;
  unitNumber: string;
  unitTypeId: string;
  unitType: string;
  buildingId: string;
  building: string;
  floor: string;
  squareFeet: number;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  excludedFromOccupancy: boolean;
  availableForOnlineMarketing: boolean;
  marketRent: number;
  amenities: Amenity[]; // Use the imported Amenity type
}

type UnitCardProps = {
  unit: Unit;
  propertyId: string;
  propertyName: string;
};

export default function UnitCard({
  unit,
  propertyId,
  propertyName,
}: UnitCardProps) {
  // Extract bed count from unitType (assuming format like "2-1" for 2 bed, 1 bath)
  const bedCount = parseInt(unit.unitType.split("-")[0]) || 1;
  const bathCount = parseInt(unit.unitType.split("-")[1]) || 1;

  return (
    <Link to={`/property/${propertyId}/unit/${unit.unitId}`}>
      <div className="flex overflow-hidden rounded-xl border shadow-sm !p-0 h-56 hover:shadow-md transition-shadow bg-white">
        {/* Left Sidebar */}
        <div className="w-[35%] bg-gray-200 p-4 flex flex-col items-start gap-2 rounded-l-xl">
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 font-normal">
            {unit.availableForOnlineMarketing ? "Available" : "Not Available"}
          </Badge>
          <Badge className="bg-gray-400 text-white px-3 py-1 font-normal">
            Unit Type: {unit.unitType}
          </Badge>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col justify-around">
          <h2 className="text-lg font-medium text-gray-800 truncate">
            Unit {unit.unitNumber}
          </h2>

          <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <BedIcon className="w-5 h-5 text-gray-500" />
              <span>Beds: {bedCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <BathIcon className="w-5 h-5 text-gray-500" />
              <span>Baths: {bathCount}</span>
            </div>
            <div className="flex items-center space-x-1">
              <RulerIcon className="w-5 h-5 text-gray-500" />
              <span>SqFt: {unit.squareFeet}</span>{" "}
              {/* "SqFt" is a common abbreviation for square feet */}
            </div>
          </div>

          <div className="flex items-center mt-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4 min-w-4" />
            <span className="ml-1 truncate">{unit.streetAddress}</span>
          </div>

          <div className="flex items-center mt-1 text-sm text-gray-500">
            <Building2 className="w-4 h-4 min-w-4" />
            <span className="ml-1">
              Building: {unit.building}, Floor: {unit.floor}
            </span>
          </div>

          <Separator className="my-3" />

          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Hash className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">
                {propertyName}
              </span>
            </div>
            <h3 className="text-lg font-semibold">
              $
              {unit.marketRent.toLocaleString(undefined, {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </h3>
          </div>
        </div>
      </div>
    </Link>
  );
}
