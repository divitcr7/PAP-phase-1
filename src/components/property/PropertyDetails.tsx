import { useEffect, useRef, useState } from "react";
import { PropertyUnit } from "@/types/properties";
import Description from "./property-details/Description";
import Overview from "./property-details/Overview/Overview";
// import Video from "./property-details/Video";
import Details from "./property-details/Details";
import Features from "./property-details/Features";
import FloorPlan from "./property-details/FloorPlan";
import Attachments from "./property-details/Attachments";
import Explore from "./property-details/Explore";
import Nearby from "./property-details/Nearby";
import { Separator } from "@/components/ui/separator";
import FloatingActionButton from "./property-details/FloatingActionButton";
import BottomActionBar from "./property-details/ActionButton";
import { Unit } from "@/hooks/useUnits";

interface PropertyDetailsProps {
  unit: Unit | PropertyUnit;
}

export default function PropertyDetails({ unit }: PropertyDetailsProps) {
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const bottomActionBarRef = useRef(null);

  // Create a normalized unit object that works with our components
  const normalizedUnit = {
    id: "unitId" in unit ? unit.unitId : unit.id,
    title: "unitNumber" in unit ? `Unit ${unit.unitNumber}` : unit.title,
    address:
      "streetAddress" in unit
        ? `${unit.streetAddress}, ${unit.city}, ${unit.state} ${unit.zip}`
        : unit.address,
    beds:
      "unitType" in unit
        ? parseInt(unit.unitType.split("-")[0]) || 1
        : unit.beds,
    baths:
      "unitType" in unit
        ? parseInt(unit.unitType.split("-")[1]) || 1
        : unit.baths,
    sqft: "squareFeet" in unit ? unit.squareFeet : unit.sqft,
    price: "marketRent" in unit ? unit.marketRent : unit.price,
    type: "unitType" in unit ? [unit.unitType] : unit.type,
    garages: 1, // Default value
    yearBuilt: 2020, // Default value
    // Static data for sections we don't have from API
    description: {
      title: "unitNumber" in unit ? `Unit ${unit.unitNumber}` : unit.title,
      preview: [
        "This beautiful unit offers modern living with all the amenities you need for comfortable living.",
        "Located in a prime location with easy access to shopping, dining, and entertainment.",
      ],
      fullContent: [
        "This beautiful unit offers modern living with all the amenities you need for comfortable living.",
        "Located in a prime location with easy access to shopping, dining, and entertainment.",
        "The property features high-quality finishes, spacious rooms, and an efficient layout designed for today's lifestyle.",
        "Enjoy the convenience of nearby parks, schools, and public transportation.",
      ],
    },
    details: {
      "Property Type": "unitType" in unit ? unit.unitType : "Apartment",
      Building: "building" in unit ? unit.building : "Main Building",
      Floor: "floor" in unit ? unit.floor : "1st Floor",
      "Year Built": "2020",
      Heating: "Central",
      Cooling: "Central Air",
      Parking: "Garage",
      "Lot Size": "N/A",
      Status:
        "availableForOnlineMarketing" in unit
          ? unit.availableForOnlineMarketing
            ? "Available"
            : "Not Available"
          : "Available",
    },
    features:
      "amenities" in unit
        ? unit.amenities.map((amenity) => amenity.name)
        : [
            "Air Conditioning",
            "Dishwasher",
            "Washer/Dryer",
            "Hardwood Floors",
            "Stainless Steel Appliances",
            "Walk-in Closets",
            "Balcony",
            "Fitness Center",
            "Swimming Pool",
            "Pet Friendly",
          ],
    floors: [
      {
        name: "Floor Plan",
        image: "/images/floor-plans/floor-1.jpg",
      },
    ],
    attachments: [
      {
        name: "Property Brochure.pdf",
        fileUrl: "#",
        imgSrc: "/images/icons/pdf.png",
      },
      {
        name: "Floor Plan Details.pdf",
        fileUrl: "#",
        imgSrc: "/images/icons/pdf.png",
      },
    ],
    explore: {
      title: "Explore the Property",
      imageSrc: "/images/property/property-1.jpg",
      imageAlt: "Property Image",
    },
    nearbyDescription:
      "Discover everything this neighborhood has to offer with convenient access to these nearby locations.",
    nearbyPlaces: {
      Schools: "0.5 miles",
      Shopping: "0.8 miles",
      Restaurants: "0.3 miles",
      Parks: "0.7 miles",
      "Public Transit": "0.2 miles",
      Hospital: "1.5 miles",
    },
    agent: {
      name: "John Doe",
      phone: "555-123-4567",
      email: "john@example.com",
    },
    avatar: "/images/agents/agent-1.jpg",
  };

  useEffect(() => {
    const currentRef = bottomActionBarRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBottomBarVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.1,
      }
    );

    const handleScroll = () => {
      setIsScrolledDown(window.scrollY > 80);
    };

    if (currentRef) {
      observer.observe(currentRef);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="pt-10">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Description description={normalizedUnit.description} />
          <Separator className="my-4" />
          <Overview
            // id={normalizedUnit.id}
            type={normalizedUnit.type[0]}
            garages={normalizedUnit.garages}
            bedrooms={normalizedUnit.beds}
            bathrooms={normalizedUnit.baths}
            landSize={normalizedUnit.sqft}
            yearBuilt={normalizedUnit.yearBuilt}
            size={normalizedUnit.sqft}
          />
          <Separator className="my-4" />
          <Details details={normalizedUnit.details} />
          <Separator className="my-4" />
          <Features features={normalizedUnit.features} />
          <Separator className="my-4" />
          <FloorPlan floors={normalizedUnit.floors} />
          <Separator className="my-4" />
          <Attachments attachments={normalizedUnit.attachments} />
          <Separator className="my-4" />
          <Explore explore={normalizedUnit.explore} />
          <Separator className="my-4" />
          <Nearby
            nearbyDescription={normalizedUnit.nearbyDescription}
            nearbyPlaces={normalizedUnit.nearbyPlaces}
          />
          <Separator className="my-4" />
        </div>
      </div>
      {isScrolledDown && !isBottomBarVisible && (
        <FloatingActionButton
          propertyId={normalizedUnit.id}
          price={normalizedUnit.price}
          agent={normalizedUnit.agent}
          avatar={normalizedUnit.avatar}
        />
      )}
      <div ref={bottomActionBarRef}>
        <BottomActionBar
          propertyId={normalizedUnit.id}
          price={normalizedUnit.price}
          agent={normalizedUnit.agent}
          avatar={normalizedUnit.avatar}
        />
      </div>
    </section>
  );
}
