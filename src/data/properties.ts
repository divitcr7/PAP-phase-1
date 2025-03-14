export interface Property {
  id: number;
  imgSrc: string;
  alt?: string;
  address: string;
  city: string;
  title: string;
  beds: number;
  rooms: number;
  baths: number;
  sqft: number;
  tags: string[];
  avatar: string;
  agent: string;
  lat: number;
  long: number;
  filterOptions: string[];
  features: string[];
  type: string[];
  price: number;
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

export const properties: Property[] = [
  {
    id: 1,
    imgSrc: "/images/home/house-1.jpg",
    alt: "img",
    address: "145 Brooklyn Ave, California, New York",
    city: "Texas",
    title: "Casa Lomas de Machalí Machas",
    beds: 1,
    rooms: 3,
    baths: 2,
    sqft: 1783,
    tags: ["Featured", "For Sale"],
    avatar: "/images/avatar/avt-png1.png",
    agent: "Arlene McCoy",
    lat: 40.7279707552121,
    long: -74.07152705896405,
    filterOptions: ["Studio", "Office"],
    features: [
      "Air Condition",
      "Cable TV",
      "Fireplace",
      "Elevator",
      "Fence",
      "Furnishing",
      "Garage",
      "Pet Friendly",
      "Intercom",
      "Parking",
      "Window Type",
      "Construction Year",
    ],
    type: ["Studio", "Office", "House"],
    price: 2541,
  },
];

export const allProperties: Property[] = [
  ...properties
];
