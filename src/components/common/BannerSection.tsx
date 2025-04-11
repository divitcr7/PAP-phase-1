import { useNavigate } from "react-router";
import { Button } from "../ui/button";

export default function BannerSection() {
  const navigate = useNavigate();

  return (
    <section className="py-16 px-6">
      <div className="container mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="p-8 md:p-12 md:w-1/2 flex flex-col justify-center">
              <h2 className="text-3xl font-bold text-white mb-4">
                Find Your Perfect Pad Today
              </h2>
              <p className="text-blue-100 mb-6">
                Browse our selection of premium properties and find your dream
                home with our expert guidance.
              </p>
              <Button
                className="bg-white text-blue-700 hover:bg-blue-50 self-start"
                onClick={() => navigate("/properties")}
              >
                Browse Properties
              </Button>
            </div>
            <div className="md:w-1/2">
              <img
                src="/images/banner/banner.png"
                alt="Properties Banner"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
