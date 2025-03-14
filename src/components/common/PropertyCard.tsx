import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BathIcon, BedIcon, MapPin, RulerIcon } from "lucide-react";

type PropertyCardProps = {
  title: string;
  beds: number;
  baths: number;
  sqft: number;
  address: string;
  agent: string;
  avatar: string;
  price: number;
};

export default function PropertyCard({
  title,
  beds,
  baths,
  sqft,
  address,
  agent,
  avatar,
  price,
}: PropertyCardProps) {
  return (
    <div className="flex overflow-hidden rounded-xl border shadow-sm !p-0 h-56">
      {/* Left Sidebar */}
      <div className="w-[35%] bg-gray-200 p-4 flex flex-col items-start gap-2 rounded-l-xl">
        <Badge className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 font-normal">
          Featured
        </Badge>
        <Badge
          variant="secondary"
          className="bg-gray-400 text-white px-3 py-1 font-normal"
        >
          For Sale
        </Badge>
      </div>

      {/* Right Section */}
      <div className="p-4 flex flex-col justify-around">
        <h2 className="text-lg font-medium text-gray-800 truncate">{title}</h2>

        {/* Property Details */}
        <div className="flex items-center space-x-4 mt-3 text-sm text-gray-600">
          <div className="flex items-center space-x-1">
            <BedIcon className="w-5 h-5 text-gray-500" />
            <span>Beds: {beds}</span>
          </div>
          <div className="flex items-center space-x-1">
            <BathIcon className="w-5 h-5 text-gray-500" />
            <span>Baths: {baths}</span>
          </div>
          <div className="flex items-center space-x-1">
            <RulerIcon className="w-5 h-5 text-gray-500" />
            <span>Sqft: {sqft}</span>
          </div>
        </div>

        {/* Address */}
        <div className="flex items-center mt-2 text-sm text-gray-500">
          <MapPin className="w-4 h-4 min-w-4" />
          <span className="ml-1 truncate">{address}</span>
        </div>

        <Separator className="my-4" />

        {/* Agent & Price */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-sky-100 flex items-center justify-center">
              <img
                src={avatar || "/placeholder.svg"}
                alt={agent}
                className="w-8 h-8 rounded-full"
              />
            </div>
            <span className="text-sm font-medium text-gray-700">{agent}</span>
          </div>
          <h3 className="text-lg font-semibold">${price.toLocaleString()}</h3>
        </div>
      </div>
    </div>
  );
}
