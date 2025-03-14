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

export default function PropertyDetails() {
  return (
    <section className="py-10">
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
          {/* 
          <Card className="p-4">
            <GuestReview />
          </Card>
        </div>
        <div className="space-y-6">
          <Card className="p-4">
            <ContactSeller />
          </Card>
          <Card className="p-4">
            <WidgetBox />
          </Card>
          <Card className="p-4">
            <WhyChoose />
          </Card>
          <Card className="p-4">
            <LatestProperties />
          </Card> */}
        </div>
      </div>
    </section>
  );
}
