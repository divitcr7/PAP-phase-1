import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
// import slugify from "slugify";
import PropertiesCard from "../common/PropertiesCard";
import { useProperties } from "@/hooks/useProperties";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowRight } from "lucide-react";
import { Fragment } from "react";
import PropertiesCardSkeleton from "../common/PropertiesCardSkeleton";

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
              <Fragment key={i}>
                <PropertiesCardSkeleton />
              </Fragment>
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
            <PropertiesCard key={property.propertyId} property={property} />
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
                <PropertiesCard property={property} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {properties.length > 6 && (
          <div className="text-center mt-12">
            <a
              href="/properties"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 overflow-hidden font-medium text-white bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 ease-out hover:shadow-blue-400/30 hover:shadow-xl"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative flex items-center">
                View All Properties
                <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
