import PropertyFilter from "../common/PropertyFilter";
import { Button } from "@/components/ui/button";
import { Home, Building2, Landmark, Factory } from "lucide-react";
import { Link } from "react-router";
import BGSliderImage from "/images/slider/slider-1.jpg";
import { Typewriter } from 'react-simple-typewriter';

export default function Hero() {
  return (
    <section
      className="relative min-h-[calc(100vh-88px)] flex justify-center items-center text-white bg-cover bg-center"
      style={{ backgroundImage: `url(${BGSliderImage})` }}
    >
      <div className="absolute inset-0 bg-black/10" />
      <div className="container mx-auto relative z-10 px-6 lg:px-12">
        <div className="flex justify-between items-center gap-2">
          <div className="">
            <h1 className="text-6xl lg:text-7xl font-bold leading-tight">
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
            <p className="mt-12 text-lg lg:min-w-[400px] lg:max-w-[700px]">
              Discover your perfect home with Pick-A-Pad. From spacious gardens
              to relaxing pools, every detail is crafted for your comfort and
              enjoyment.
            </p>
            <Button
              asChild
              className="mt-8 rounded-full px-16 py-8 text-lg font-semibold bg-blue-600 hover:bg-primary-dark"
            >
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
          <div className="">
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
      <div className="absolute inset-0 bg-black/40" />
    </section>
  );
}
