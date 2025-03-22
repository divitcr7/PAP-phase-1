import { NearbyProps } from "@/types/properties";


export default function Nearby({ nearbyDescription, nearbyPlaces }: NearbyProps) {
  return (
    <section className="space-y-4 p-4">
      <h5 className="text-xl font-semibold">What's Nearby?</h5>
      <p className="text-gray-600">{nearbyDescription}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(nearbyPlaces).map(([place, distance], index) => (
          <div key={index} className="flex">
            <span className="text-gray-700 min-w-32">{place}:</span>
            <span className="font-semibold text-gray-900">{distance}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
