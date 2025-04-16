import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BedDouble, Bath } from "lucide-react";
import { Floor } from "@/types/properties";

interface FloorPlanProps {
  floors: Floor[];
}

export default function FloorPlan({ floors }: FloorPlanProps) {
  return (
    <div className="space-y-6 p-4">
      <h5 className="text-xl font-semibold">Floor Plans</h5>
      <Accordion type="single" collapsible className="w-full pr-10">
        {floors.map((floor, index) => (
          <AccordionItem
            key={index}
            value={`floor-${index}`}
            className="space-y-4"
          >
            <AccordionTrigger className="bg-gray-100 px-6 flex justify-between items-center text-lg font-mediums w-full">
              <div className="text-left flex-1">
                {floor.title || floor.name}
              </div>
              <div className="flex items-center gap-6 text-gray-600 text-base font-normal">
                {floor.bedrooms && (
                  <div className="flex items-center gap-1">
                    <BedDouble className="w-5 h-5 text-gray-600" />
                    {floor.bedrooms} Bedroom
                  </div>
                )}
                {floor.bathrooms && (
                  <div className="flex items-center gap-1">
                    <Bath className="w-5 h-5 text-gray-600" />
                    {floor.bathrooms} Bathroom
                  </div>
                )}
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={floor.imgSrc || floor.image}
                  alt={`${floor.title || floor.name} Plan`}
                  width={1158}
                  height={815}
                  className="w-full h-auto"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
