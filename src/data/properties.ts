import { Property, PropertyUnit } from "@/types/properties";
import slugify from "slugify";
import { createStaticUnits } from "./unit";


export const properties: Property[] = [
  {
    id: 1,
    name: "The Verge",
    imgSrc: "/images/location/lo-sm-1.jpg",
    city: "Texas",
    totalUnits: 6,
    units: createStaticUnits(6),
  },
  {
    id: 2,
    name: "Chilton Village",
    imgSrc: "/images/location/lo-sm-2.jpg",
    city: "Texas",
    totalUnits: 5,
    units: createStaticUnits(5),
  },
  {
    id: 3,
    name: "Plaza Square",
    imgSrc: "/images/location/lo-sm-3.jpg",
    city: "Texas",
    totalUnits: 6,
    units: createStaticUnits(6),
  },
  {
    id: 4,
    name: "City View",
    imgSrc: "/images/location/lo-sm-4.jpg",
    city: "Texas",
    totalUnits: 5,
    units: createStaticUnits(5),
  },
  {
    id: 5,
    name: "Yorkshire",
    imgSrc: "/images/location/lo-sm-5.jpg",
    city: "Texas",
    totalUnits: 6,
    units: createStaticUnits(6),
  },
  {
    id: 6,
    name: "Brixton",
    imgSrc: "/images/location/lo-sm-6.jpg",
    city: "Texas",
    totalUnits: 5,
    units: createStaticUnits(5),
  },
  {
    id: 7,
    name: "Sunset Heights",
    imgSrc: "/images/location/lo-sm-7.jpg",
    city: "Texas",
    totalUnits: 6,
    units: createStaticUnits(6),
  },
  {
    id: 8,
    name: "Sedona Ranch",
    imgSrc: "/images/location/lo-sm-8.jpg",
    city: "Texas",
    totalUnits: 5,
    units: createStaticUnits(5),
  },
  {
    id: 9,
    name: "Springfield",
    imgSrc: "/images/location/lo-sm-9.jpg",
    city: "Texas",
    totalUnits: 6,
    units: createStaticUnits(6),
  },
];
export const getAllUnits = (): PropertyUnit[] => {
  return properties.flatMap((property) => property.units);
};

export const getPropertyByName = (slugName: string): Property | undefined => {
  return properties.find(
    (property) => slugify(property.name, { lower: true }) === slugName
  );
};

export const getUnitsByProperty = (propertyName: string): PropertyUnit[] => {
  const property = getPropertyByName(propertyName);
  return property ? property.units : [];
};

export const allProperties = properties;
