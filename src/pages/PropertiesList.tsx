import { useParams } from "react-router";
import { getPropertyByName } from "@/data/properties";
import PropertyCard from "@/components/common/PropertyCard";

const PropertyList = () => {
  const { propertyName } = useParams<{ propertyName: string }>();
  const property = getPropertyByName(propertyName || "");

  if (!property) {
    return (
      <div className="container mx-auto text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-900">
          Property not found
        </h2>
        <p className="mt-2 text-gray-600">
          The property you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50">
      <div className="container mx-auto p-8 space-y-6">
        <div className="text-center">
          <h3 className="text-4xl font-semibold text-gray-900">
            {property.name}
          </h3>
          <p className="mt-2 text-gray-600">
            Available Units: {property.totalUnits}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {property.units.map((unit) => (
            <PropertyCard
              key={unit.id}
              {...unit}
              propertyName={property.name}
              tags={unit.tags || ["For Sale"]}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyList;
