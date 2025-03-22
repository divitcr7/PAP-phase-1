interface DetailsProps {
  details: Record<string, string>;
}

export default function Details({ details }: DetailsProps) {
  return (
    <div className="space-y-6 p-4">
      <h5 className="text-xl font-semibold">Property Details</h5>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {Object.entries(details).map(([label, content], index) => (
          <div key={index} className="flex gap-2 bg-white">
            <span className="text-gray-600 font-medium min-w-30">{label}:</span>
            <div className="text-gray-900">{content}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
