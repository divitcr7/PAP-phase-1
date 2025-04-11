import { useParams } from "react-router";
import PropertyCard from "@/components/common/PropertyCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useProperties } from "@/hooks/useProperties";
import { useUnits } from "@/hooks/useUnits";

const PropertyList = () => {
  const { propertyId } = useParams<{ propertyId: string }>();
  const { properties } = useProperties();
  const { units, loading, error } = useUnits(propertyId);

  // Find the current property from the properties list
  const currentProperty = properties.find((p) => p.propertyId === propertyId);

  if (loading) {
    return (
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto p-8 space-y-6">
          <div className="text-center">
            <Skeleton className="h-10 w-1/3 mx-auto mb-2" />
            <Skeleton className="h-6 w-1/4 mx-auto" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="rounded-lg overflow-hidden shadow-md bg-white"
              >
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !currentProperty) {
    return (
      <div className="container mx-auto text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-900">
          {error || "Property not found"}
        </h2>
        <p className="mt-2 text-gray-600">
          {error
            ? "Please try again later."
            : "The property you're looking for doesn't exist."}
        </p>
      </div>
    );
  }

  return (
    <section className="bg-gray-50 py-12">
      <div className="container mx-auto p-8 space-y-6">
        <div className="text-center">
          <h3 className="text-4xl font-semibold text-gray-900">
            {currentProperty.name}
          </h3>
          <p className="mt-2 text-gray-600">
            {currentProperty.streetAddress}, {currentProperty.city},{" "}
            {currentProperty.state} {currentProperty.zip}
          </p>
          <p className="mt-2 text-blue-600">Available Units: {units.length}</p>
        </div>

        {units.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {units.map((unit) => (
              <PropertyCard
                key={unit.unitId}
                unit={unit}
                propertyId={propertyId || ""}
                propertyName={currentProperty.name}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No units available for this property.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertyList;
