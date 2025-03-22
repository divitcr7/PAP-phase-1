import { Dot } from "lucide-react";

interface FeaturesProps {
  features: string[];
}

export default function Features({ features }: FeaturesProps) {
  return (
    <div className="space-y-6 p-4">
      <h5 className="text-xl font-semibold">Amenities and Features</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-center gap-2 text-gray-700">
            <Dot />
            {feature}
          </div>
        ))}
      </div>
    </div>
  );
}
