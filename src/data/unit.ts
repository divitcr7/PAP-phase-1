import { PropertyUnit } from "@/types/properties";
import {
  Home,
  Settings,
  Warehouse,
  Bed,
  Bath,
  Ruler,
  Hammer,
} from "lucide-react";
import { OverviewProps, OverviewDetail } from "@/types/properties";

export const createOverviewDetails = (
  props: OverviewProps
): OverviewDetail[] => [
  { label: "ID", value: props.id, icon: Home },
  { label: "Type", value: props.type, icon: Settings },
  { label: "Garages", value: props.garages, icon: Warehouse },
  { label: "Bedrooms", value: props.bedrooms, icon: Bed, suffix: "Rooms" },
  { label: "Bathrooms", value: props.bathrooms, icon: Bath, suffix: "Rooms" },
  {
    label: "Land Size",
    value: props.landSize.toLocaleString(),
    icon: Ruler,
    suffix: "SqFt",
  },
  { label: "Year Built", value: props.yearBuilt, icon: Hammer },
  {
    label: "Size",
    value: props.size.toLocaleString(),
    icon: Ruler,
    suffix: "SqFt",
  },
];

export const createStaticUnits = (count: number): PropertyUnit[] => {
  return Array(count)
    .fill(null)
    .map((_, index) => ({
      id: index + 1,
      imgSrc: "/images/home/house-1.jpg",
      images: [
        {
          src: "/images/home/house-1.jpg",
          thumbnailSrc: "/images/home/house-1-thumb.jpg",
          alt: "Living Room View",
          width: 1290,
          height: 680,
        },
        {
          src: "/images/home/house-2.jpg",
          thumbnailSrc: "/images/home/house-2-thumb.jpg",
          alt: "Modern Kitchen",
          width: 1290,
          height: 680,
        },
        {
          src: "/images/home/house-3.jpg",
          thumbnailSrc: "/images/home/house-3-thumb.jpg",
          alt: "Master Bedroom",
          width: 1290,
          height: 680,
        },
        {
          src: "/images/home/house-4.jpg",
          thumbnailSrc: "/images/home/house-4-thumb.jpg",
          alt: "Luxury Bathroom",
          width: 1290,
          height: 680,
        },
        {
          src: "/images/home/house-5.jpg",
          thumbnailSrc: "/images/home/house-5-thumb.jpg",
          alt: "Dining Area",
          width: 1290,
          height: 680,
        },
        {
          src: "/images/home/house-6.jpg",
          thumbnailSrc: "/images/home/house-6-thumb.jpg",
          alt: "Home Office",
          width: 1290,
          height: 680,
        },
        {
          src: "/images/home/house-7.jpg",
          thumbnailSrc: "/images/home/house-7-thumb.jpg",
          alt: "Outdoor Patio",
          width: 1290,
          height: 680,
        },
        {
          src: "/images/home/house-8.jpg",
          thumbnailSrc: "/images/home/house-8-thumb.jpg",
          alt: "Swimming Pool",
          width: 1290,
          height: 680,
        },
        {
          src: "/images/home/house-9.jpg",
          thumbnailSrc: "/images/home/house-9-thumb.jpg",
          alt: "Garden View",
          width: 1290,
          height: 680,
        },
        {
          src: "/images/home/house-10.jpg",
          thumbnailSrc: "/images/home/house-10-thumb.jpg",
          alt: "Front View",
          width: 1290,
          height: 680,
        },
      ],
      alt: "Property Image",
      address: "145 Brooklyn Ave, Texas, Texas",
      title: `Casa Lomas de Machalí Machas ${index + 1}`,
      description: {
        title: "Description",
        preview: [
          "Located around an hour away from {city}, between the Perche and the Iton valley, in a beautiful park by a charming stream, this country property immediately seduces with its bucolic and soothing environment.",
        ],
        fullContent: [
          "Located around an hour away from {city}, between the Perche and the Iton valley, in a beautiful park by a charming stream, this country property immediately seduces with its bucolic and soothing environment.",
          "An ideal choice for sports and leisure enthusiasts who will be able to take advantage of its swimming pool (11m x 5m), tennis court, gym, and sauna.",
          "The property features high-end finishes throughout, including hardwood floors, custom cabinetry, and premium appliances.",
          "The spacious layout provides plenty of natural light and seamless indoor-outdoor living spaces.",
        ],
      },
      floors: [
        {
          title: "First Floor",
          bedrooms: 2,
          bathrooms: 2,
          imgSrc: "/images/banner/floor.png",
        },
        {
          title: "Second Floor",
          bedrooms: 2,
          bathrooms: 2,
          imgSrc: "/images/banner/floor.png",
        },
      ],
      details: {
        ID: `#${index + 1}`,
        Beds: `${1}`,
        Price: `$${2541}`,
        "Year Built": "2024",
        Size: `${1783} sqft`,
        Type: "Studio",
        Rooms: "3",
        Status: "For Sale",
        Baths: "2",
        Garage: "1",
      },
      attachments: [
        {
          name: "Villa-Document.pdf",
          fileUrl: "/documents/villa-document.pdf",
          imgSrc: "/images/home/file-1.png",
        },
        {
          name: "Villa-Blueprint.pdf",
          fileUrl: "/documents/villa-blueprint.pdf",
          imgSrc: "/images/home/file-2.png",
        },
      ],
      beds: 1,
      rooms: 3,
      baths: 2,
      garages: 1,
      sqft: 1783,
      yearBuilt: 2024,
      tags: ["Featured", "For Sale"],
      avatar: "/images/avatar/avt-png1.png",
      agent: "Arlene McCoy",
      lat: 32.7767,
      long: -96.797,
      filterOptions: ["Studio", "Office"],
      features: [
        "Air Conditioning",
        "Cable TV",
        "Fireplace",
        "Elevator",
        "Security System",
        "Furnished",
        "Garage",
        "Pet Friendly",
        "Parking",
        "Swimming Pool",
        "Smart Home",
        "High-Speed Internet",
        "Modern Kitchen",
        "Laundry Room",
        "Garden",
        "Balcony",
      ],
      type: ["Studio", "Office", "House"],
      price: 2541,
      videoURI: "MLpWrANjFbI",
      nearbyDescription:
        "Explore nearby amenities to precisely locate your property and identify surrounding conveniences, providing a comprehensive overview of the living environment and the property's convenience.",
      nearbyPlaces: {
        School: "0.7 km",
        University: "1.3 km",
        "Grocery Center": "0.6 km",
        Market: "1.1 km",
        Hospital: "0.4 km",
        "Metro Station": "1.8 km",
        "Gym & Wellness": "1.3 km",
        River: "2.1 km",
      },
      explore: {
        title: "Explore Property",
        imageSrc: "/images/banner/img-explore.jpg",
        imageAlt: "Explore property",
      },
    }));
};
