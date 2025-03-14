import { Dot } from "lucide-react";

const featureGroups: string[][] = [
  [
    "Smoke alarm",
    "Carbon monoxide alarm",
    "First aid kit",
    "Self check-in with lockbox",
    "Security cameras",
  ],
  [
    "Hangers",
    "Bed linens",
    "Extra pillows & blankets",
    "Iron",
    "TV with standard cable",
  ],
  ["Refrigerator", "Microwave", "Dishwasher", "Coffee maker"],
];

export default function Features() {
  return (
    <div className="space-y-6 p-4">
      <h5 className="text-xl font-semibold">Amenities and Features</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {featureGroups.map((features, index) => (
          <div key={index} className="">
            <ul className="space-y-3">
              {features.map((feature, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700">
                  <Dot />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
