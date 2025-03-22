import { useState } from "react";
import { PropertyDescription } from "@/types/properties";
import { Button } from "@/components/ui/button";

interface DescriptionProps {
  description: PropertyDescription;
}

export default function Description({ description }: DescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const content = isExpanded ? description.fullContent : description.preview;

  return (
    <div className="p-4 space-y-4">
      <h5 className="font-semibold text-3xl">{description.title}</h5>
      <div className="space-y-4">
        {content.map((paragraph, index) => (
          <p key={index} className="text-gray-600 leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
      <Button
        variant={"link"}
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-blue-600 underline hover:text-blue-800 transition-colors !px-0"
      >
        {isExpanded ? "View Less" : "View More"}
      </Button>
    </div>
  );
}
