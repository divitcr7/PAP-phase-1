import { Swiper, SwiperSlide } from "swiper/react";
import { properties } from "@/data/properties";
import { Pagination } from "swiper/modules";
import slugify from "slugify";
import PadCard from "../common/PadCard";

export default function Properties() {
  return (
    <section className="w-full overflow-hidden py-16 px-6 lg:px-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-blue-500 uppercase">
            Explore Properties
          </p>
          <h3 className="mt-2 text-4xl font-bold text-slate-900">
            Properties in Texas
          </h3>
        </div>

        {/* Desktop Grid View */}
        <div className="hidden sm:grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
          {properties.map((property) => {
            const slug = slugify(property.name, { lower: true });
            return (
              <PadCard key={property.id} property={property} slug={slug} />
            );
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
            {properties.map((property) => {
              const slug = slugify(property.name, { lower: true });
              return (
                <SwiperSlide key={property.id} className="pb-8">
                  <PadCard property={property} slug={slug} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
