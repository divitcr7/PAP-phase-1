import { LucideIcon } from "lucide-react";

export interface Attachment {
  name: string;
  fileUrl: string;
  imgSrc: string;
}
export interface NearbyProps {
  nearbyDescription: string;
  nearbyPlaces: Record<string, string>;
}

export interface OverviewDetail {
  label: string;
  value: string | number;
  icon: LucideIcon;
  suffix?: string;
}

export interface OverviewProps {
  // id: number;
  type: string;
  garages: number;
  bedrooms: number;
  bathrooms: number;
  landSize: number;
  yearBuilt: number;
  size: number;
}

export interface PropertyImage {
  src: string;
  thumbnailSrc?: string;
  alt: string;
  width: number;
  height: number;
}

export interface ExploreContent {
  title: string;
  imageSrc: string;
  imageAlt: string;
}

export interface PropertyDescription {
  title: string;
  preview: string[];
  fullContent: string[];
}

export interface Floor {
  name: string;
  image: string;
  title?: string;
  bedrooms?: number;
  bathrooms?: number;
  imgSrc?: string;
}

export interface PropertyUnit {
  id: number;
  imgSrc: string;
  images: PropertyImage[];
  alt?: string;
  address: string;
  title: string;
  description: PropertyDescription;
  floors: Floor[];
  details: {
    ID: string;
    Beds: string;
    Price: string;
    "Year Built": string;
    Size: string;
    Type: string;
    Rooms: string;
    Status: string;
    Baths: string;
    Garage: string;
  };
  beds: number;
  rooms: number;
  baths: number;
  garages: number;
  sqft: number;
  yearBuilt: number;
  tags: string[];
  avatar: string;
  agent: string;
  lat: number;
  long: number;
  attachments: Attachment[];
  filterOptions: string[];
  features: string[];
  type: string[];
  price: number;
  videoURI: string;
  nearbyDescription: string;
  nearbyPlaces: Record<string, string>;
  explore: ExploreContent;
}

export interface Property {
  id: number;
  name: string;
  imgSrc: string;
  city: string;
  totalUnits: number;
  units: PropertyUnit[];
}

export const filterOptions: string[] = [
  "View All",
  "Apartment",
  "Villa",
  "Studio",
  "House",
  "Office",
];

export const featureOptions: string[] = [
  "Air Condition",
  "Cable TV",
  "Ceiling Height",
  "Fireplace",
  "Disabled Access",
  "Elevator",
  "Fence",
  "Garden",
  "Floor",
  "Furnishing",
  "Garage",
  "Pet Friendly",
  "Heating",
  "Intercom",
  "Parking",
  "WiFi",
  "Renovation",
  "Security",
  "Swimming Pool",
  "Window Type",
  "Search property",
  "Construction Year",
];
