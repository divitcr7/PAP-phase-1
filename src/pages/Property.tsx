import { useParams } from "react-router";
import { FC, useEffect, useState } from "react";
import DetailsTitle from "../components/property/DetailsTitle";
import Slider from "../components/property/Slider";
import { getPropertyByName } from "@/data/properties";
import MetaComponent from "../components/seo/MetaComponent";
import PropertyDetails from "../components/property/PropertyDetails";
import slugify from "slugify";
import LoadingComponent from "../components/common/LoadingComponent";
import { PropertyUnit } from "@/types/properties";

const metadata = {
  title: "Unit Details || Pick-A-Pad - Real Estate",
  description: "Pick-A-Pad - Real Estate",
};

const PropertyDetailsPage: FC = () => {
  const { propertyName, unitTitle } = useParams<{
    propertyName: string;
    unitTitle: string;
  }>();
  const [unit, setUnit] = useState<PropertyUnit | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      const property = getPropertyByName(propertyName || "");
      if (property) {
        const foundUnit = property.units.find(
          (u) => slugify(u.title, { lower: true }) === unitTitle
        );
        setUnit(foundUnit || null);
      }
      setLoading(false);
    }, 1000);
  }, [propertyName, unitTitle]);

  if (loading) return <LoadingComponent />;
  if (!unit) {
    return (
      <div className="container mx-auto text-center py-16">
        <h2 className="text-2xl font-semibold text-gray-900">Unit not found</h2>
        <p className="mt-2 text-gray-600">
          The unit you're looking for doesn't exist.
        </p>
      </div>
    );
  }

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="container mx-auto px-4 py-6">
        <DetailsTitle
          title={unit.title}
          address={unit.address}
          bedrooms={unit.beds}
          bathrooms={unit.baths}
          area={unit.sqft}
          price={unit.price}
        />

        <Slider images={unit.images} />

        <PropertyDetails unit={unit} />
      </div>
    </>
  );
};

export default PropertyDetailsPage;
