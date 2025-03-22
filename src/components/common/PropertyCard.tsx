import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { BathIcon, BedIcon, MapPin, RulerIcon } from "lucide-react";
import { Link } from "react-router";
import slugify from "slugify";

type PropertyCardProps = {
  title: string;
  beds: number;
  baths: number;
  sqft: number;
  address: string;
  agent: string;
  avatar: string;
  price: number;
  tags: string[];
  propertyName: string;
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
  tags,
  propertyName,
}: PropertyCardProps) {
  const unitSlug = slugify(title, { lower: true });
  const propertySlug = slugify(propertyName, { lower: true });

  return (
    <Link to={`/${propertySlug}/${unitSlug}`}>
      <div className="flex overflow-hidden rounded-xl border shadow-sm !p-0 h-56 hover:shadow-md transition-shadow">
        {/* Left Sidebar */}
        <div className="w-[35%] bg-gray-200 p-4 flex flex-col items-start gap-2 rounded-l-xl">
          {tags.map((tag, index) => (
            <Badge
              key={index}
              className={`${
                tag === "Featured"
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400"
              } text-white px-3 py-1 font-normal`}
            >
              {tag}
            </Badge>
          ))}
        </div>

        {/* Rest of the component remains the same */}
        <div className="p-4 flex flex-col justify-around">
          <h2 className="text-lg font-medium text-gray-800 truncate">
            {title}
          </h2>

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

          <div className="flex items-center mt-2 text-sm text-gray-500">
            <MapPin className="w-4 h-4 min-w-4" />
            <span className="ml-1 truncate">{address}</span>
          </div>

          <Separator className="my-4" />

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
    </Link>
  );
}
