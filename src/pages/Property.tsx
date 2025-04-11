import { useParams } from "react-router";
import { FC, useEffect, useState } from "react";
import DetailsTitle from "../components/property/DetailsTitle";
// import Slider from "../components/property/Slider";
import MetaComponent from "../components/seo/MetaComponent";
import PropertyDetails from "../components/property/PropertyDetails";
import LoadingComponent from "../components/common/LoadingComponent";
import { useUnits } from "@/hooks/useUnits";
import { useProperties } from "@/hooks/useProperties";

// const metadata = {
//   title: "Unit Details || Pick-A-Pad - Real Estate",
//   description: "Pick-A-Pad - Real Estate",
// };

const PropertyDetailsPage: FC = () => {
  const { propertyId, unitId } = useParams<{
    propertyId: string;
    unitId: string;
  }>();

  const { properties } = useProperties();
  const { units, loading: unitsLoading } = useUnits(propertyId);
  const [loading, setLoading] = useState(true);

  // Find the current property and unit
  const currentProperty = properties.find((p) => p.propertyId === propertyId);
  const currentUnit = units.find((u) => u.unitId === unitId);

  useEffect(() => {
    // Set loading to false when we have both property and units data
    if (!unitsLoading && currentProperty) {
      setLoading(false);
    }
  }, [unitsLoading, currentProperty]);

  if (loading) return <LoadingComponent />;

  if (!currentUnit || !currentProperty) {
    return (
      <div className="container mx-auto text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-900">Unit not found</h2>
        <p className="mt-2 text-gray-600">
          The unit you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  // Extract bed and bath count from unitType (e.g., "2-1" for 2 bed, 1 bath)
  const bedCount = parseInt(currentUnit.unitType.split("-")[0]) || 1;
  const bathCount = parseInt(currentUnit.unitType.split("-")[1]) || 1;

  return (
    <>
      <MetaComponent
        meta={{
          title: `Unit ${currentUnit.unitNumber} | ${currentProperty.name}`,
          description: `${bedCount} bed, ${bathCount} bath unit in ${currentProperty.name}`,
        }}
      />
      <div className="container mx-auto px-4 py-6">
        <DetailsTitle
          title={`Unit ${currentUnit.unitNumber}`}
          address={`${currentUnit.streetAddress}, ${currentUnit.city}, ${currentUnit.state} ${currentUnit.zip}`}
          bedrooms={bedCount}
          bathrooms={bathCount}
          area={currentUnit.squareFeet}
          price={currentUnit.marketRent}
        />

        {/* Use placeholder images for now
        <Slider
          images={[
            "/images/property/property-1.jpg",
            "/images/property/property-2.jpg",
            "/images/property/property-3.jpg",
            "/images/property/property-4.jpg",
          ]}
        /> */}

        <PropertyDetails unit={currentUnit} />
      </div>
    </>
  );
};

export default PropertyDetailsPage;
