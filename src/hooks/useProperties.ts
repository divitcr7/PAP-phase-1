import { useState, useEffect } from "react";
import axiosInstance from "@/lib/axiosInstance";
import { toast } from "@/lib/toast";
import { Property } from "@/components/common/PropertiesCard";

export const useProperties = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.get("/properties");
      if (response.data.success) {
        setProperties(response.data.data);
      } else {
        setError("Failed to fetch properties");
        toast.error("Failed to fetch properties");
      }
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError("An error occurred while fetching properties");
      toast.error("An error occurred while fetching properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return { properties, loading, error, refetch: fetchProperties };
};
