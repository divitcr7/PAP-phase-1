import PropertyFilter from "../common/PropertyFilter";
import TypewriterComponent from "../animations/TypewriterComponent";
import { Button } from "@/components/ui/button";
import { Home, Building2, Landmark, Factory } from "lucide-react";
import { Link } from "react-router";
import BGSliderImage from "/images/slider/slider-1.jpg";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex justify-center items-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${BGSliderImage})` }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-50" />
      <div className="container mx-auto relative z-10 px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-2">
            <h1 className="text-6xl lg:text-7xl font-extrabold leading-tight">
              Indulge in Your <br />
              <TypewriterComponent
                strings={["Sanctuary", "Safe House", "Dream Home"]}
              />
            </h1>
            <p className="mt-6 text-lg lg:pr-48">
              Discover your perfect home with Pick-A-Pad. From spacious gardens
              to relaxing pools, every detail is crafted for your comfort and
              enjoyment.
            </p>
            <Button
              asChild
              className="mt-8 rounded-full px-8 py-4 text-lg font-semibold bg-primary hover:bg-primary-dark"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
          <div className="lg:col-span-1">
            <PropertyFilter />
            <div className="mt-8 flex gap-6">
              <Link to="#" className="flex items-center gap-1 text-white">
                <div className="bg-white/20 hover:bg-white/30 rounded-full p-2">
                  <Home size={20} className="text-white" />
                </div>
                Houses
              </Link>

              <Link to="#" className="flex items-center gap-1 text-white">
                <div className="bg-white/20 hover:bg-white/30 rounded-full p-2">
                  <Building2 size={20} className="text-white" />
                </div>
                Villa
              </Link>

              <Link to="#" className="flex items-center gap-1 text-white">
                <div className="bg-white/20 hover:bg-white/30 rounded-full p-2">
                  <Landmark size={20} />
                </div>
                Office
              </Link>
              <Link to="#" className="flex items-center gap-1 text-white">
                <div className="bg-white/20 hover:bg-white/30 rounded-full p-2">
                  <Factory size={20} />
                </div>
                Apartments
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-50" />
    </section>
  );
}
