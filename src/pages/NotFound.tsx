import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col items-center justify-center text-center">
        <div className="mb-8">
          <img
            src="/images/logo/logo-transparent@2x.png"
            alt="Pick a Pad Logo"
            className="w-48 mx-auto mb-6"
          />
          <h1 className="text-5xl md:text-7xl font-bold text-blue-600 mb-4">
            404
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold text-slate-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-lg mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved. Let's
            help you find your perfect pad instead!
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Button asChild size="lg" className="bg-blue-500 hover:bg-blue-600">
            <Link to="/">Return Home</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-blue-500 text-blue-500 hover:bg-blue-50"
          >
            <Link to="/properties">Browse Properties</Link>
          </Button>
        </div>

        <div className="mt-16 p-6 bg-blue-50 rounded-lg max-w-2xl mx-auto">
          <h3 className="text-xl font-semibold text-blue-700 mb-4">
            Need Help Finding Your Perfect Pad?
          </h3>
          <p className="text-gray-700 mb-4">
            Our team is ready to assist you in finding the perfect living space.
          </p>
          <Button asChild variant="link" className="text-blue-600">
            <Link to="/contact-us">Contact Our Support Team</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
