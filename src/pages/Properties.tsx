import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import { properties } from "@/data/properties";
import slugify from "slugify";
import PadCard from "@/components/common/PadCard";
// import { Search, Filter } from "lucide-react";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const PropertiesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter properties based on search term
  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      searchTerm === "" ||
      property.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-300 to-blue-400 py-16 px-6">
        <div className="container mx-auto">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Pad
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Browse our selection of premium properties across Texas and find
              your next home
            </p>
          </div>

          {/* Search Bar */}
          {/* <div className="bg-white rounded-lg shadow-lg p-4 md:p-6 max-w-5xl mx-auto">
            <div className="flex gap-4">
              <div className="relative">
                <Input
                  placeholder="Search properties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>

              <Button className="bg-blue-600 hover:bg-blue-700 px-10">
                <Filter className="mr-2 h-5 w-5" /> Filter Results
              </Button>
            </div>
          </div> */}
        </div>
      </section>

      {/* Properties Grid Section */}
      <section className="container mx-auto py-16 px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {filteredProperties.length} Properties Available
          </h2>
          <div className="h-1 w-20 bg-blue-600 mb-6"></div>
          <p className="text-lg text-gray-600">
            Browse our selection of premium properties and find your perfect pad
            today
          </p>
        </div>

        {filteredProperties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => {
              const slug = slugify(property.name, { lower: true });
              return (
                <PadCard key={property.id} property={property} slug={slug} />
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-2xl font-semibold text-gray-700 mb-4">
              No properties found
            </h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
            <Button
              className="mt-6 bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                setSearchTerm("");
              }}
            >
              Reset Filters
            </Button>
          </div>
        )}
      </section>

      {/* Featured Properties Slider (Mobile Only) */}
      <section className="bg-gray-50 py-12 md:hidden">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">
            Featured Properties
          </h2>

          <Swiper
            spaceBetween={20}
            slidesPerView={1}
            pagination={{ clickable: true }}
            navigation={true}
            modules={[Pagination, Navigation]}
            className="pb-12"
          >
            {properties.slice(0, 5).map((property) => {
              const slug = slugify(property.name, { lower: true });
              return (
                <SwiperSlide key={property.id}>
                  <PadCard property={property} slug={slug} />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-blue-400 text-white py-28">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Find Your Perfect Pad?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Join thousands of satisfied renters who found their dream home with
            us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              variant="secondary"
              className="bg-white text-blue-500 hover:bg-gray-100"
            >
              Contact Us
            </Button>
            <Button
              variant="outline"
              className="border-white text-black/80 hover:bg-white/20"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PropertiesPage;
