import { Link } from "react-router";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

interface Property {
  name: string;
  imgSrc: string;
  totalUnits: number;
}

interface PadCardProps {
  property: Property;
  slug: string;
}

const PadCard: React.FC<PadCardProps> = ({ property, slug }) => {
  return (
    <Link to={`/${slug}`}>
      <Card className="overflow-hidden rounded-2xl h-fit shadow-sm border border-gray-100 flex flex-row !py-0 hover:shadow-md transition-shadow">
        <div className="w-1/2">
          <img
            alt={property.name}
            src={property.imgSrc}
            className="w-full h-full object-cover"
          />
        </div>
        <CardContent className="w-1/2 flex flex-col justify-center pl-0">
          <h6 className="text-lg font-semibold text-slate-900">
            {property.name}
          </h6>
          <p className="text-gray-600 text-sm">{property.totalUnits} Units</p>
          <div className="mt-6 text-md text-blue-500 font-medium flex items-center hover:text-blue-700 transition-colors">
            Explore Now <ArrowRight className="ml-1 h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PadCard;
