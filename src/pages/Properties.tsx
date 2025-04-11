// import { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Pagination, Navigation } from "swiper/modules";
// import slugify from "slugify";
import PadCard from "@/components/common/PadCard";
// import { Search, Filter, MapPin } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
import { useProperties } from "@/hooks/useProperties";
import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

const PropertiesPage = () => {
  const { properties, loading, error } = useProperties();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [filterType, setFilterType] = useState<string>("");

  // Get unique property types for filter
//   const propertyTypes = [
//     ...new Set(properties.map((property) => property.type)),
//   ];

//   // Filter properties based on search term and type
//   const filteredProperties = properties.filter((property) => {
//     const matchesSearch =
//       searchTerm === "" ||
//       property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       property.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
//       property.state.toLowerCase().includes(searchTerm.toLowerCase());

//     const matchesType = filterType === "" || property.type === filterType;

//     return matchesSearch && matchesType;
//   });

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
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
          </div>
        </section>

        <section className="container mx-auto py-16 px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
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
        </section>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white">
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
          </div>
        </section>

        <section className="container mx-auto py-16 px-6 text-center">
          <p className="text-red-500 text-lg">
            Failed to load properties. Please try again later.
          </p>
        </section>
      </div>
    );
  }

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
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Input
                  placeholder="Search properties by name, city or state..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              </div>

              <div className="w-full md:w-1/3">
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by type" />
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

      {/* Properties Grid Section */}
      <section className="container mx-auto py-16 px-6">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {properties.length} Properties Available
          </h2>
          <div className="h-1 w-20 bg-blue-600 mb-6"></div>
          <p className="text-lg text-gray-600">
            Browse our selection of premium properties and find your perfect pad
            today
          </p>
        </div>

        {/* {properties.length > 0 ? ( */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PadCard key={property.propertyId} property={property} />
            ))}
          </div>
        {/* ) : (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No properties match your search criteria.
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearchTerm("");
                setFilterType("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        )} */}
      </section>
    </div>
  );
};

export default PropertiesPage;
