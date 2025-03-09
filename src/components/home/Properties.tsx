import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { locations } from "@/data/locations";
import { Pagination } from "swiper/modules";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function Properties() {
  return (
    <section className="w-full overflow-hidden py-16 px-6 lg:px-12">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-blue-500 uppercase">
            Explore Cities
          </p>
          <h3 className="mt-2 text-4xl font-bold text-slate-900">
            Properties By Cities
          </h3>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden sm:grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {locations.map((location, index) => (
            <Card
              key={index}
              className="overflow-hidden rounded-2xl h-fit shadow-sm border border-gray-100 flex flex-row !py-0"
            >
              <div className="w-1/2">
                <img
                  alt={location.name}
                  src={location.imgSrc || "/placeholder.svg"}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="w-1/2 flex flex-col justify-center pl-0">
                <h6 className="text-lg font-semibold text-slate-900">
                  {location.name}
                </h6>
                <p className="text-gray-600 text-sm">{location.properties}</p>
                <Link
                  to="/topmap-list"
                  className="mt-6 text-md text-blue-500 font-medium flex items-center hover:text-blue-700 transition-colors"
                >
                  Explore Now <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile Swiper */}
        <div className="sm:hidden">
          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            className="mt-8"
            modules={[Pagination]}
            pagination={{ clickable: true }}
          >
            {locations.map((location, index) => (
              <SwiperSlide key={index} className="pb-8">
                <Card className="overflow-hidden rounded-xl shadow-sm border border-gray-100 flex flex-row">
                  <div className="w-1/2">
                    <img
                      alt={location.name}
                      src={location.imgSrc || "/placeholder.svg"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 w-1/2 flex flex-col justify-center">
                    <h6 className="text-lg font-semibold text-slate-900">
                      {location.name}
                    </h6>
                    <p className="mt-1 text-sm text-gray-600">
                      {location.properties} properties
                    </p>
                    <Link
                      to="/topmap-list"
                      className="mt-2 text-blue-500 font-medium flex items-center text-sm hover:text-blue-700 transition-colors"
                    >
                      Explore Now <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </CardContent>
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
