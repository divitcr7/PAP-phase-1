import PropertyFilter from "../common/PropertyFilter";
import { Button } from "@/components/ui/button";
import { Home, Building2, Landmark, Factory, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import BGSliderImage from "/images/slider/slider-1.jpg";
import { Typewriter } from "react-simple-typewriter";
import { cn } from "@/lib/utils";

export default function Hero() {
  return (
    <section
      className="relative min-h-[calc(100vh-88px)] flex justify-center items-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${BGSliderImage})` }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="container mx-auto relative z-10 px-5 lg:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-14 md:gap-6 text-left">
          <div className="max-w-xl mx-auto lg:mx-0">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold leading-tight">
              Indulge in Your <br />
              <Typewriter
                words={["Sanctuary", "Safe House", "Dream Home"]}
                loop={0}
                cursor
                cursorColor="#2563eb"
                cursorStyle="|"
                cursorBlinking={true}
              />
            </h1>
            <p className="mt-6 text-base sm:text-lg lg:text-xl">
              Discover your perfect home with Pick-A-Pad. From spacious gardens
              to relaxing pools, every detail is crafted for your comfort and
              enjoyment.
            </p>
            <Button
              asChild
              className={cn(
                "mt-6 rounded-full text-base sm:text-lg font-semibold bg-blue-600 hover:bg-blue-700 !p-6",
              )}
            >
              <Link to="/contact" className="">
                Contact Us
                <ArrowRight className="ml-2" />
              </Link>
            </Button>
          </div>
          <div className="w-full lg:w-auto">
            <PropertyFilter />
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <Link
                to="#"
                className="flex items-center gap-1 md:gap-2 text-white"
              >
                <div className="bg-white/20 hover:bg-white/30 rounded-full p-1">
                  <Home className="text-white size-4 md:size-6" />
                </div>
                Houses
              </Link>

              <Link
                to="#"
                className="flex items-center gap-1 md:gap-2 text-white"
              >
                <div className="bg-white/20 hover:bg-white/30 rounded-full p-1 md:p-2 text-sm md:text-base">
                  <Building2 className="text-white size-4 md:size-6" />
                </div>
                Villa
              </Link>

              <Link
                to="#"
                className="flex items-center gap-1 md:gap-2 text-white"
              >
                <div className="bg-white/20 hover:bg-white/30 rounded-full p-1 md:p-2 text-sm md:text-base">
                  <Landmark className="text-white size-4 md:size-6" />
                </div>
                Office
              </Link>
              <Link
                to="#"
                className="flex items-center gap-1 md:gap-2 text-white"
              >
                <div className="bg-white/20 hover:bg-white/30 rounded-full p-1 md:p-2 text-sm md:text-base">
                  <Factory className="text-white size-4 md:size-6" />
                </div>
                Apartments
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-black/40" />
    </section>
  );
}
