export interface Location {
  name: string;
  properties: string;
  imgSrc: string;
  isActive: boolean;
}

export const locations: Location[] = [
  {
    name: "Dallas",
    properties: "263 properties",
    imgSrc: "/images/location/lo-sm-1.jpg",
    isActive: false,
  },
  {
    name: "Atlanta",
    properties: "275 properties",
    imgSrc: "/images/location/lo-sm-2.jpg",
    isActive: true,
  },
  {
    name: "Orlando",
    properties: "256 properties",
    imgSrc: "/images/location/lo-sm-3.jpg",
    isActive: false,
  },
  {
    name: "Miami",
    properties: "312 properties",
    imgSrc: "/images/location/lo-sm-4.jpg",
    isActive: false,
  },
  {
    name: "Houston",
    properties: "237 properties",
    imgSrc: "/images/location/lo-sm-5.jpg",
    isActive: false,
  },
  {
    name: "Phoenix",
    properties: "221 properties",
    imgSrc: "/images/location/lo-sm-6.jpg",
    isActive: false,
  },
  {
    name: "Seattle",
    properties: "188 properties",
    imgSrc: "/images/location/lo-sm-7.jpg",
    isActive: false,
  },
  {
    name: "Denver",
    properties: "193 properties",
    imgSrc: "/images/location/lo-sm-8.jpg",
    isActive: false,
  },
  {
    name: "Austin",
    properties: "309 properties",
    imgSrc: "/images/location/lo-sm-9.jpg",
    isActive: false,
  },
];
