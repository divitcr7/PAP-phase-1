import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BedDouble, Bath } from "lucide-react";

type Floor = {
  title: string;
  bedrooms: number;
  bathrooms: number;
  imgSrc: string;
};

const floors: Floor[] = [
  {
    title: "First Floor",
    bedrooms: 2,
    bathrooms: 2,
    imgSrc: "/images/banner/floor.png",
  },
  {
    title: "Second Floor",
    bedrooms: 2,
    bathrooms: 2,
    imgSrc: "/images/banner/floor.png",
  },
];

export default function FloorPlan() {
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
              <div className="text-left flex-1">{floor.title}</div>
              <div className="flex items-center gap-6 text-gray-600 text-base font-normal">
                <div className="flex items-center gap-1">
                  <BedDouble className="w-5 h-5 text-gray-600" />
                  {floor.bedrooms} Bedroom
                </div>
                <div className="flex items-center gap-1">
                  <Bath className="w-5 h-5 text-gray-600" />
                  {floor.bathrooms} Bathroom
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-4">
              <div className="rounded-lg overflow-hidden shadow-md">
                <img
                  src={floor.imgSrc}
                  alt={`${floor.title} Plan`}
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
