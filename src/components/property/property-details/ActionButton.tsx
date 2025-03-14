import { useState, useEffect } from "react";
import { ArrowRight, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function BottomActionBar() {
  const [scrollY, setScrollY] = useState(0);
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setIsBottom(
        window.innerHeight + window.scrollY >=
          document.body.offsetHeight - window.innerHeight * 10
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col gap-3 transition-transform duration-300 ease-in-out py-3 px-4 md:py-4 will-change-transform",
        isBottom ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          {scrollY > 600 && (
            <Button variant="outline" className="gap-2">
              <Video className="w-4 h-4" />
              <span className="hidden sm:inline">Virtual Tour</span>
            </Button>
          )}
          {isBottom && (
            <Button variant="outline" className="gap-2">
              <ArrowRight className="w-4 h-4" />
              <span className="hidden sm:inline">Next Property</span>
            </Button>
          )}
        </div>
        <Button className="bg-blue-500 hover:bg-blue-600">Apply Now</Button>
      </div>
    </div>
  );
}
