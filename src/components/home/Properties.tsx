import { Swiper, SwiperSlide } from "swiper/react";
import { locations } from "@/data/locations";
import { allProperties } from "@/data/properties";
import { Pagination } from "swiper/modules";
import slugify from "slugify";
import PadCard from "../common/PadCard";

export default function Properties() {
  return (
    <section className="w-full overflow-hidden py-16 px-6 lg:px-12">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-blue-500 uppercase">
            Explore Pads
          </p>
          <h3 className="mt-2 text-4xl font-bold text-slate-900">
            Properties By Cities
          </h3>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden sm:grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {locations.map((location) => {
            // Find the first property that matches the city
            const property = allProperties.find(
              (p) => p.city === location.name
            );
            const defaultProperty = allProperties[0]; // Get the first property
            const slug = property
              ? slugify(property.title, { lower: true })
              : slugify(defaultProperty.title, { lower: true });

            return <PadCard key={slug} slug={slug} property={location} />;
          })}
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
            {locations.map((location) => {

              const property = allProperties.find(
                (p) => p.city === location.name
              );
              const slug = property
                ? slugify(property.title, { lower: true })
                : "default-property";

              return (
                <SwiperSlide key={slug} className="pb-8">
                  <PadCard slug={slug} property={location} />;
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
