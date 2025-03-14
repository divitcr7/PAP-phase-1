import { allProperties } from "@/data/properties";
import PropertyCard from "@/components/common/PropertyCard";

const PropertyList = () => {

  return (
    <section className="flat-section flat-recommended mt-8">
      <div className="container mx-auto">
        <div className="box-title-listing">
          <div className="box-left">
            <h3 className="fw-8 text-2xl">Property Listing</h3>
            <p className="text">
              There are currently {allProperties.length} properties.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {allProperties.map((property, i) => (
            <PropertyCard key={i} {...property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyList;
