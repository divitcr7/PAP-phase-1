import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowRight,
  MapPin,
  Phone,
  Mail,
  User,
  Clock,
  Calendar,
  Building2,
  Copy,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { format } from "date-fns";
import { useState } from "react";
import { toast } from "@/lib/toast";

export interface Property {
  propertyId: string;
  abbreviation: string;
  name: string;
  type: string;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  timeZone: string;
  manager: string;
  currentPeriod?: {
    start: string;
    end: string;
  };
  managementTeam?: {
    personId: string;
    firstName: string;
    lastName: string;
    role: string;
  }[];
}

interface PropertiesCardProps {
  property: Property;
}

const PropertiesCard: React.FC<PropertiesCardProps> = ({ property }) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    toast.success("Login successful", {
      description: "Email copied to clipboard",
    });
    setTimeout(() => setIsCopied(false), 2000);
  };

  const openDialer = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const openGoogleMaps = (address: string) => {
    const formattedAddress = encodeURIComponent(
      `${address}, ${property.city}, ${property.state} ${property.zip}`
    );
    window.open(
      `https://www.google.com/maps/search/?api=1&query=${formattedAddress}`,
      "_blank"
    );
  };

  return (
    <div className="relative">
      <Card className="group overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] dark:bg-gray-800/50 dark:border-gray-700 dark:hover:border-blue-500/50 hover:border-blue-200 bg-white">
        <Link to={`/property/${property.propertyId}`}>
          <div className="relative w-full h-52 md:h-64 overflow-hidden">
            <div className="absolute bottom-0 left-0 right-0 z-10 p-4 bg-gradient-to-t from-black/40 via-black/20 to-transparent">
              <div className="flex items-center justify-between">
                <div className="font-semibold px-3 text-xl text-black">
                  {property.abbreviation}
                </div>
                {property.currentPeriod && (
                  <Badge
                    variant="outline"
                    className="bg-white/90 backdrop-blur-sm dark:bg-gray-800/90 dark:text-white dark:border-gray-600"
                  >
                    Available from{" "}
                    {format(new Date(property.currentPeriod.end), "MMM d, yyyy")}
                  </Badge>
                )}
              </div>
            </div>
            <img
              alt={property.name}
              src={`https://source.unsplash.com/random/800x600/?apartment&${property.propertyId}`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </Link>

        <CardContent className="">
          <div className="space-y-4">
            <Link to={`/property/${property.propertyId}`}>
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {property.name}
                </h2>
              </div>
            </Link>

            <div className="grid grid-cols-[60%_40%] gap-3 text-sm">
              <div
                className="flex items-start text-gray-600 dark:text-gray-300 text-sm cursor-pointer group/map hover:text-blue-500 transition-colors"
                onClick={() => openGoogleMaps(property.streetAddress)}
              >
                <MapPin className="h-4 w-4 mr-2 mt-1 shrink-0 group-hover/map:text-blue-500" />
                <div>
                  <p className="group-hover/map:underline">
                    {property.streetAddress}
                  </p>
                  <p className="group-hover/map:underline">
                    {property.city}, {property.state} {property.zip}
                  </p>
                  <span className="text-xs text-blue-400 opacity-0 group-hover/map:opacity-100 transition-opacity flex items-center mt-0.5">
                    <ExternalLink className="h-3 w-3 mr-1" /> Open in Maps
                  </span>
                </div>
              </div>
              <div>
                <div className="text-gray-600 underline backdrop-blur-sm flex items-center gap-1">
                  <Building2 className="h-4 w-4 mr-1.5 shrink-0" />
                  {property.type}
                </div>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Clock className="h-4 w-4 mr-1.5 shrink-0" />
                <span className="truncate">{property.timeZone}</span>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Calendar className="h-4 w-4 mr-1.5 shrink-0" />
                <span className="truncate">
                  {property.currentPeriod
                    ? `Since ${format(
                        new Date(property.currentPeriod.start),
                        "MMM d"
                      )}`
                    : "Available Now"}
                </span>
              </div>
              <div
                className="flex items-center text-gray-600 dark:text-gray-300 cursor-pointer group/email hover:text-blue-500 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  copyToClipboard(property.email);
                }}
              >
                <Mail className="h-4 w-4 mr-1.5 shrink-0 group-hover/email:text-blue-500" />
                <div className="flex items-center">
                  <p className="truncate group-hover/email:text-blue-500">
                    {property.email}
                  </p>
                  {isCopied ? (
                    <CheckCircle2 className="h-3.5 w-3.5 ml-1 text-green-500" />
                  ) : (
                    <Copy className="h-3 w-3 ml-1 opacity-0 group-hover/email:opacity-100" />
                  )}
                </div>
              </div>
              <div
                className="flex items-center text-gray-600 dark:text-gray-300 cursor-pointer group/phone hover:text-blue-500 transition-colors"
                onClick={() => openDialer(property.phone)}
              >
                <Phone className="h-4 w-4 mr-1.5 shrink-0 group-hover/phone:text-blue-500" />
                <p className="truncate group-hover/phone:underline">
                  {property.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-gray-700">
              <div className="flex items-center text-gray-600 dark:text-gray-300 text-sm">
                <User className="h-4 w-4 mr-1.5 shrink-0" />
                <p className="truncate">Manager: {property.manager}</p>
              </div>
            </div>

            {property.managementTeam && property.managementTeam.length > 0 && (
              <div className="pt-2 border-t border-gray-100 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Management Team:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {property.managementTeam.map((member, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="text-xs dark:border-gray-600 dark:text-gray-300"
                    >
                      {member.firstName} {member.lastName} ({member.role})
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <Link to={`/property/${property.propertyId}`}>
              <div className="flex justify-end pt-2">
                <div className="group/button flex items-center text-blue-500 dark:text-blue-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 relative">
                  <span className="mr-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all after:duration-300 group-hover/button:after:w-full">
                    Explore More
                  </span>
                  <ArrowRight className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PropertiesCard;
