import { useState, useEffect } from "react";
import { ArrowRight, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import RentalApplicationForm from "@/components/modals/RentalApplyForm/RentalApplicationForm";

const FloatingActionButton: React.FC = () => {
  const [isBottom, setIsBottom] = useState<boolean>(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = (): void => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsBottom(
          window.innerHeight + window.scrollY >=
            document.body.offsetHeight - window.innerHeight * 0.5
        );
      }, 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed bottom-2 left-0 right-0 flex justify-between items-end px-8 transition-transform duration-300 ease-in-out z-50 will-change-transform",
        isBottom ? "hidden" : ""
      )}
    >
      <Button variant="outline" className="gap-2">
        <Video className="w-4 h-4" />
        <span className="hidden sm:inline">Virtual Tour</span>
      </Button>
      <div className="flex flex-col items-end gap-4">
        {window.scrollY > 10 && (
          <Button
            size="icon"
            variant="outline"
            className="h-12 w-12 rounded-full bg-white shadow-lg border-gray-200"
          >
            <ArrowRight className="h-5 w-5 text-blue-500" />
            <span className="sr-only">Next Property</span>
          </Button>
        )}
        <RentalApplicationForm />
      </div>
    </div>
  );
};

export default FloatingActionButton;
