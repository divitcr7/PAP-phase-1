import { useEffect, useRef, useState } from "react";
import Description from "./property-details/Description";
import Overview from "./property-details/Overview";
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

export default function PropertyDetails() {
  const [isBottomBarVisible, setIsBottomBarVisible] = useState(false);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const bottomActionBarRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsBottomBarVisible(entry.isIntersecting);
      },
      {root: null,
        threshold: 0.1,
      }
    );

    const handleScroll = () => {
      setIsScrolledDown(window.scrollY > 80);
    };

    if (bottomActionBarRef.current) {
      observer.observe(bottomActionBarRef.current);
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      if (bottomActionBarRef.current) {
        observer.unobserve(bottomActionBarRef.current);
      }
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="pt-10">
      <div className="container mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Description city="Texas" />
          <Separator className="my-4" />
          <Overview
            id={2297}
            type="House"
            garages={1}
            bedrooms={2}
            bathrooms={2}
            landSize={2000}
            yearBuilt={2024}
            size={900}
          />
          <Separator className="my-4" />
          <Video videoId="MLpWrANjFbI" />
          <Separator className="my-4" />
          <Details />
          <Separator className="my-4" />
          <Features />
          <Separator className="my-4" />
          <FloorPlan />
          <Separator className="my-4" />
          <Attachments />
          <Separator className="my-4" />
          <Explore />
          <Separator className="my-4" />
          <Nearby />
          <Separator className="my-4" />
        </div>
      </div>
      {isScrolledDown && !isBottomBarVisible && <FloatingActionButton />}
      <div ref={bottomActionBarRef}>
        <BottomActionBar />
      </div>
    </section>
  );
}
