import { ExploreContent } from "@/types/properties";

interface ExploreProps {
  explore: ExploreContent;
}

export default function Explore({ explore }: ExploreProps) {
  return (
    <div className="space-y-6 p-4">
      <h5 className="text-xl font-semibold">{explore.title}</h5>
      <div className="relative w-full max-w-3xl">
        <img
          alt={explore.imageAlt}
          src={explore.imageSrc}
          className="w-full h-auto rounded-lg shadow-md"
        />
        <div className="absolute bottom-4 right-4 bg-white p-2 rounded-full shadow-lg">
          <span className="icon icon-360 text-2xl text-gray-700" />
        </div>
      </div>
    </div>
  );
}
