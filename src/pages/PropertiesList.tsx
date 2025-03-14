import { allProperties } from "@/data/properties";
import PropertyCard from "@/components/common/PropertyCard";

const PropertyList = () => {
  return (
    <section className="">
      <div className="mx-auto p-8 space-y-4">
        <div className="">
          <div className="space-y-2">
            <h3 className="text-4xl font-semibold">Property Listing</h3>
            <p className="">
              There are currently {allProperties.length} properties.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allProperties.map((property, i) => (
            <PropertyCard key={i} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyList;