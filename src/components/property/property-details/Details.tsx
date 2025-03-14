interface DetailItem {
  label: string;
  content: string;
}

const details: DetailItem[] = [
  { label: "ID", content: "#1234" },
  { label: "Beds", content: "7.328" },
  { label: "Price", content: "$7,500" },
  { label: "Year Built", content: "2024" },
  { label: "Size", content: "150 sqft" },
  { label: "Type", content: "Villa" },
  { label: "Rooms", content: "9" },
  { label: "Status", content: "For sale" },
  { label: "Baths", content: "3" },
  { label: "Garage", content: "1" },
];

export default function Details() {
  return (
    <div className="space-y-6 p-4">
      <h5 className="text-xl font-semibold">Property Details</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {details.map((item, index) => (
          <div key={index} className="flex gap-2 bg-white">
            <span className="text-gray-600 font-medium min-w-30">{item.label}:</span>
            <div className="text-gray-900">
              {item.content}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
