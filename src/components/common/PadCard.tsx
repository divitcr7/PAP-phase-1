import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, MapPin, Phone, Mail, User } from "lucide-react";
import { Badge } from "../ui/badge";

// Updated interface to match API response
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

interface PadCardProps {
  property: Property;
}

const PadCard: React.FC<PadCardProps> = ({ property }) => {
  // Use propertyId for routing instead of slug
  return (
    <Link to={`/property/${property.propertyId}`}>
      <Card className="overflow-hidden rounded-2xl h-fit shadow-sm border border-gray-100 flex flex-col md:flex-row !py-0 hover:shadow-md transition-shadow">
        <div className="w-full md:w-1/3 h-48 md:h-auto">
          {/* Using a placeholder image since API doesn't provide images */}
          <img
            alt={property.name}
            src={`https://source.unsplash.com/random/300x200/?apartment&${property.propertyId}`}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="w-full md:w-2/3 flex flex-col justify-between p-4">
          <div>
            <div className="flex justify-between items-start mb-2">
              <h6 className="text-lg font-semibold text-slate-900">
                {property.name}
              </h6>
              <Badge className="bg-blue-500 text-white">{property.type}</Badge>
            </div>

            <div className="flex items-center text-gray-600 text-sm mb-2">
              <MapPin className="h-4 w-4 mr-1" />
              <p>
                {property.streetAddress}, {property.city}, {property.state}{" "}
                {property.zip}
              </p>
            </div>

            <div className="flex flex-col gap-1 mt-2">
              <div className="flex items-center text-gray-600 text-sm">
                <Phone className="h-4 w-4 mr-1" />
                <p>{property.phone}</p>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <Mail className="h-4 w-4 mr-1" />
                <p className="truncate">{property.email}</p>
              </div>
              <div className="flex items-center text-gray-600 text-sm">
                <User className="h-4 w-4 mr-1" />
                <p>Manager: {property.manager}</p>
              </div>
            </div>

            {property.managementTeam && property.managementTeam.length > 0 && (
              <div className="mt-3">
                <p className="text-sm font-medium text-gray-700">
                  Management Team:
                </p>
                <div className="flex flex-wrap gap-2 mt-1">
                  {property.managementTeam.slice(0, 2).map((member, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {member.firstName} {member.lastName} ({member.role})
                    </Badge>
                  ))}
                  {property.managementTeam.length > 2 && (
                    <Badge variant="outline" className="text-xs">
                      +{property.managementTeam.length - 2} more
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 text-md text-blue-500 font-medium flex items-center hover:text-blue-700 transition-colors">
            Explore Units <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PadCard;
