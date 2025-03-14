import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Bed, Bath, Ruler, Video, ArrowRight } from "lucide-react";
import { Button } from "../ui/button";

type PropertyDetailsProps = {
  title: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
};

export default function DetailsTitle({
  title,
  address,
  bedrooms,
  bathrooms,
  area,
}: PropertyDetailsProps) {
  return (
    <div className="p-4">
      <CardContent>
        <div className="flex justify-between">
          <h2 className="text-3xl font-bold text-gray-800">{title}</h2>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              className="hidden md:flex items-center gap-1.5 border px-10 py-5 border-blue-500 rounded-full"
            >
              <Video className="h-4 w-4" />
              Virtual Tour
            </Button>
            <Button
              variant="outline"
              className="hidden md:flex items-center gap-1.5 borer px-10 py-5 border-blue-500 rounded-full"
            >
              <ArrowRight className="h-4 w-4" />
              Next Property
            </Button>
            <Button className="">
              Apply
            </Button>
          </div>
        </div>
        <Separator className="my-4" />
        <div className="flex justify-between">
          <div className="flex gap-14">
            <div className="flex justify-between text-gray-700">
              <div>
                <h6 className="text-lg font-semibold">Details</h6>
                <div className="flex gap-5">
                  <div className="flex items-center gap-1">
                    <Bed className="w-5 h-5" />
                    Beds: <span>{bedrooms}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5" />
                    Baths: <span>{bathrooms}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Ruler className="w-5 h-5" />
                    Sqft <span>{area}</span>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h6 className="text-lg font-semibold">Location</h6>
              <p className="text-gray-500">{address}</p>
            </div>
          </div>
          <div>Price</div>
        </div>
      </CardContent>
    </div>
  );
}
