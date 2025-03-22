import { useEffect, useRef, useState } from "react";
import { PropertyUnit } from "@/types/properties";
import Description from "./property-details/Description";
import Overview from "./property-details/Overview/Overview";
import Video from "./property-details/Video";
import Details from "./property-details/Details";
import Features from "./property-details/Features";
import FloorPlan from "./property-details/FloorPlan";
import Attachments from "./property-details/Attachments";
import Explore from "./property-details/Explore";
import Nearby from "./property-details/Nearby";
import { Separator } from "@/components/ui/separator";
import FloatingActionButton from "./property-details/FloatingActionButton";
import BottomActionBar from "./property-details/ActionButton";

interface PropertyDetailsProps {
  unit: PropertyUnit;
}

export default function PropertyDetails({ unit }: PropertyDetailsProps) {
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const bottomActionBarRef = useRef(null);

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
          <Description description={unit.description} />
          <Separator className="my-4" />
          <Overview
            id={unit.id}
            type={unit.type[0]}
            garages={unit.garages}
            bedrooms={unit.beds}
            bathrooms={unit.baths}
            landSize={unit.sqft}
            yearBuilt={unit.yearBuilt}
            size={unit.sqft}
          />
          <Separator className="my-4" />
          <Video videoURI={unit.videoURI} />
          <Separator className="my-4" />
          <Details details={unit.details} />
          <Separator className="my-4" />
          <Features features={unit.features} />
          <Separator className="my-4" />
          <FloorPlan floors={unit.floors} />
          <Separator className="my-4" />
          <Attachments attachments={unit.attachments} />
          <Separator className="my-4" />
          <Explore explore={unit.explore} />
          <Separator className="my-4" />
          <Nearby
            nearbyDescription={unit.nearbyDescription}
            nearbyPlaces={unit.nearbyPlaces}
          />
          <Separator className="my-4" />
        </div>
      </div>
      {isScrolledDown && !isBottomBarVisible && (
        <FloatingActionButton
          propertyId={unit.id}
          price={unit.price}
          agent={unit.agent}
          avatar={unit.avatar}
        />
      )}
      <div ref={bottomActionBarRef}>
        <BottomActionBar
          propertyId={unit.id}
          price={unit.price}
          agent={unit.agent}
          avatar={unit.avatar}
        />
      </div>
    </section>
  );
}
