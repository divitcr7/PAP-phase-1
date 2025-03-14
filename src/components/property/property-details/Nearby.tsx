const nearbyPlaces = [
  [
    { label: "School:", distance: "0.7 km" },
    { label: "University:", distance: "1.3 km" },
    { label: "Grocery Center:", distance: "0.6 km" },
    { label: "Market:", distance: "1.1 km" },
  ],
  [
    { label: "Hospital:", distance: "0.4 km" },
    { label: "Metro Station:", distance: "1.8 km" },
    { label: "Gym & Wellness:", distance: "1.3 km" },
    { label: "River:", distance: "2.1 km" },
  ],
];

export default function Nearby() {
  return (
    <section className="space-y-4 p-4">
      <h5 className="text-xl font-semibold">What’s Nearby?</h5>
      <p className="text-gray-600">
        Explore nearby amenities to precisely locate your property and identify
        surrounding conveniences, providing a comprehensive overview of the
        living environment and the property's convenience.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {nearbyPlaces.map((column, colIndex) => (
          <ul key={colIndex} className="space-y-2">
            {column.map((item, index) => (
              <li key={index} className="flex">
                <span className="text-gray-700 min-w-32">{item.label}</span>
                <span className="font-semibold text-gray-900">{item.distance}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
