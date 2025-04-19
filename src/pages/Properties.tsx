import { Fragment, useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper/modules";
import PropertiesCard from "@/components/common/PropertiesCard";
import {
  // Search,
  Filter,
  Building2,
  ArrowRight,
} from "lucide-react";
// import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useProperties } from "@/hooks/useProperties";
import PropertiesCardSkeleton from "@/components/common/PropertiesCardSkeleton";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

const Properties = () => {
  const { properties, loading, error } = useProperties();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState<string>("");

  // Get unique property types for filter
  // const propertyTypes = [
  //   ...new Set(properties.map((property) => property.type)),
  // ];

  // Filter properties based on search term and type
  // const filteredProperties = properties.filter((property) => {
  //   const matchesSearch =
  //     searchTerm === "" ||
  //     property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     property.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     property.abbreviation.toLowerCase().includes(searchTerm.toLowerCase());

  //   const matchesType = filterType === "" || property.type === filterType;

  //   return matchesSearch && matchesType;
  // });

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <section className="relative w-full bg-gradient-to-r from-blue-400 to-blue-600 py-20 px-6 overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
          <div className="container mx-auto relative z-10">
            <div className="text-center text-white mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-8 backdrop-blur-sm mb-4">
                <img
                  alt="logo"
                  width={166}
                  height={48}
                  src="/images/logo/logo-transparent@2x.png"
                  className="transition-transform duration-300 ease-in-out transform hover:scale-105 "
                />
                <span className="text-4xl font-bold">Pick A Pad</span>
              </div>
              <h1 className="text-md md:text-2xl font-semibold mb-4">
                Loading Available Properties...
              </h1>
            </div>
          </div>
        </section>

        <section className="container mx-auto py-16 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Fragment key={i}>
                <PropertiesCardSkeleton />
              </Fragment>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <section className="w-full bg-gradient-to-r from-blue-600 to-blue-800 py-20 px-6">
          <div className="container mx-auto">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Oops! Something went wrong
              </h1>
              <p className="text-xl text-blue-100">
                We're having trouble loading the properties. Please try again
                later.
              </p>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <section className="relative w-full bg-gradient-to-r from-blue-600 to-blue-800 py-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="container mx-auto relative z-10">
          <div className="text-center text-white mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Perfect Pad
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Browse our selection of premium properties across Texas and find your next home
            </p>
          </div>

          {/* <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                {/* <div className="relative flex-grow">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    placeholder="Search by name, city, state, or abbreviation..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-white/60"
                  />
                </div>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-full md:w-[200px] bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Types</SelectItem>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div> */}
        </div>
      </section>

      <section className="container mx-auto py-16 px-6">
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-6 h-6 text-blue-600" />
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                {properties.length} Properties Available
              </h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Discover your next home with our AI-powered recommendations
            </p>
          </div>
          {searchTerm || filterType ? (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("");
                setFilterType("");
              }}
              className="flex items-center gap-2"
            >
              <Filter className="w-4 h-4" />
              Clear Filters
            </Button>
          ) : null}
        </div>

        {properties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((property) => (
              <PropertiesCard key={property.propertyId} property={property} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900 mb-4">
              <Building2 className="w-8 h-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No properties found
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Try adjusting your search criteria
            </p>
            <Button
              onClick={() => {
                setSearchTerm("");
                setFilterType("");
              }}
              className="flex items-center gap-2"
            >
              Reset Filters
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        )}
      </section>
    </div>
  );
};

export default Properties;
