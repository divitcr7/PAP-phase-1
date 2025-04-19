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
} from "lucide-react";
import { Badge } from "../ui/badge";
import { format } from "date-fns";

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
  return (
    <Link to={`/property/${property.propertyId}`}>
      <Card className="group overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] dark:bg-gray-800/50 dark:border-gray-700 dark:hover:border-blue-500/50 hover:border-blue-200 bg-white">
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

        <CardContent className="">
          <div className="space-y-4">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
                {property.name}
              </h2>
            </div>

            <div className="grid grid-cols-[60%_40%] gap-3 text-sm">
              <div className="flex items-start text-gray-600 dark:text-gray-300 text-sm">
                <MapPin className="h-4 w-4 mr-2 mt-1 shrink-0" />
                <div>
                  <p>{property.streetAddress}</p>
                  <p>
                    {property.city}, {property.state} {property.zip}
                  </p>
                </div>
              </div>
              <div>
                <div className="text-gray-600 underline backdrop-blur-sm  flex items-center gap-1">
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
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Mail className="h-4 w-4 mr-1.5 shrink-0" />
                <p className="truncate">{property.email}</p>
              </div>
              <div className="flex items-center text-gray-600 dark:text-gray-300">
                <Phone className="h-4 w-4 mr-1.5 shrink-0" />
                <p className="truncate">{property.phone}</p>
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

            <div className="flex justify-end pt-2">
              <div className="group/button flex items-center text-blue-500 dark:text-blue-400 font-medium hover:text-blue-600 dark:hover:text-blue-300 relative">
                <span className="mr-1 relative after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all after:duration-300 group-hover/button:after:w-full">
                  Explore More
                </span>
                <ArrowRight className="w-4 h-4 transform group-hover/button:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PropertiesCard;
