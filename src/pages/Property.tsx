import { useParams } from "react-router";
import { FC, useEffect, useState } from "react";
import DetailsTitle from "../components/property/DetailsTitle";
import Slider from "../components/property/Slider";
import { allProperties } from "@/data/properties";
import MetaComponent from "../components/seo/MetaComponent";
import PropertyDetails from "../components/property/PropertyDetails";
import slugify from "slugify";
import LoadingComponent from "../components/common/LoadingComponent";

// Define the type for a property
interface Property {
  title: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
}

const metadata = {
  title: "Property Details || Pick-A-Pad - Real Estate",
  description: "Pick-A-Pad - Real Estate",
};

const PropertyDetailsPage: FC = () => {
  const { title } = useParams<{ title: string }>();

  const [propertyItem, setPropertyItem] = useState<Property | null>(null);
  const [titleLoaded, setTitleLoaded] = useState(false);
  const [sliderLoaded, setSliderLoaded] = useState(false);
  const [detailsLoaded, setDetailsLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      const foundProperty =
        allProperties.find(
          (elm) => slugify(elm.title, { lower: true }) === title
        ) || allProperties[0];

      setPropertyItem(foundProperty);
      setTitleLoaded(true);
      setTimeout(() => setSliderLoaded(true), 1500);
      setTimeout(() => setDetailsLoaded(true), 2500);
    }, 1000);
  }, [title]);

  if (!propertyItem && titleLoaded) return <p className="text-center">Property not found.</p>;

  return (
    <>
      <MetaComponent meta={metadata} />
      <div className="container mx-auto px-4 py-6">
        {titleLoaded ? (
          propertyItem ? (
            <DetailsTitle
              title={propertyItem.title}
              address={propertyItem.address}
              bedrooms={propertyItem.beds}
              bathrooms={propertyItem.baths}
              area={propertyItem.sqft}
            />
          ) : (
            <p className="text-center">Property not found.</p>
          )
        ) : (
          <LoadingComponent />
        )}

        {/* Slider Component (loads after title) */}
        {sliderLoaded ? <Slider /> : <LoadingComponent />}

        {/* Property Details (loads last) */}
        {detailsLoaded ? <PropertyDetails /> : <LoadingComponent />}
      </div>
    </>
  );
};

export default PropertyDetailsPage;
