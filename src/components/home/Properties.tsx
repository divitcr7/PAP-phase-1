import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// import slugify from "slugify";
import PadCard from "../common/PadCard";
import { useProperties } from "@/hooks/useProperties";
import { Skeleton } from "@/components/ui/skeleton";

export default function Properties() {
  const { properties, loading, error } = useProperties();

  if (loading) {
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
            {[1, 2, 3].map((i) => (
              <div key={i} className="rounded-lg overflow-hidden shadow-md">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Swiper */}
          <div className="sm:hidden">
            <div className="mt-8 space-y-4">
              <div className="rounded-lg overflow-hidden shadow-md">
                <Skeleton className="h-48 w-full" />
                <div className="p-4">
                  <Skeleton className="h-6 w-3/4 mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full overflow-hidden py-16 px-6 lg:px-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-red-500">
            Failed to load properties. Please try again later.
          </p>
        </div>
      </section>
    );
  }

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
          {properties.slice(0, 6).map((property) => (
            <PadCard key={property.propertyId} property={property} />
          ))}
        </div>

        {/* Mobile Swiper */}
        <div className="sm:hidden">
          <Swiper
            slidesPerView={1}
            spaceBetween={20}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mt-8"
          >
            {properties.slice(0, 6).map((property) => (
              <SwiperSlide key={property.propertyId}>
                <PadCard property={property} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {properties.length > 6 && (
          <div className="text-center mt-10">
            <a
              href="/properties"
              className="inline-block px-6 py-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
              View All Properties
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
