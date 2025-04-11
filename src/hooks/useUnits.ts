import { useState, useEffect, useCallback } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "sonner"; // "sonner" is a valid package name, can be ignored in spell check

// Define the Amenity interface
export interface Amenity {
  amenityId: string;
  name: string;
  charge: number;
  impactsMarketRent: boolean;
  availableForOnlineMarketing: boolean;
}

// Define the Unit interface
export interface Unit {
  unitId: string;
  propertyId: string;
  unitNumber: string;
  unitTypeId: string;
  unitType: string;
  buildingId: string;
  building: string;
  floor: string;
  squareFeet: number;
  streetAddress: string;
  city: string;
  state: string;
  zip: string;
  excludedFromOccupancy: boolean;
  availableForOnlineMarketing: boolean;
  marketRent: number;
  amenities: Amenity[];
}

export const useUnits = (propertyId: string | undefined) => {
  const [units, setUnits] = useState<Unit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUnits = useCallback(async () => {
    if (!propertyId) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      console.log(`Fetching units for property ID: ${propertyId}`);

      // Make sure to use the correct API endpoint
      const response = await axiosInstance.get("/units", {
        params: { propertyId },
      });

      console.log("Units API response:", response);

      if (response.data.success) {
        setUnits(response.data.data);
        if (response.data.data.length === 0) {
          toast.info("No units available for this property");
        }
      } else {
        setError("Failed to fetch units");
        toast.error("Failed to fetch units");
      }
    } catch (err) {
      console.error("Error fetching units:", err);
      setError("An error occurred while fetching units");
      toast.error("An error occurred while fetching units");
    } finally {
      setLoading(false);
    }
  }, [propertyId]);

  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]); // Now fetchUnits is included in the dependency array

  return { units, loading, error, refetch: fetchUnits };
};
