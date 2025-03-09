import { useEffect, useRef } from "react";
import AdvanceSearch from "./AdvanceSearch";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, LocateFixed, Search, SlidersVertical } from "lucide-react";

export default function PropertyFilter() {
  const ddContainer = useRef<HTMLDivElement | null>(null);
  const advanceBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ddContainer.current &&
        !ddContainer.current.contains(event.target as Node) &&
        advanceBtnRef.current &&
        !advanceBtnRef.current.contains(event.target as Node)
      ) {
        ddContainer.current.classList.remove("block");
        ddContainer.current.classList.add("hidden");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full rounded-lg shadow-lg">
      <div className="flex space-x-4">
        <div className="text-lg font-medium py-3 px-8 bg-blue-600 underline decoration-white-600 underline-offset-4 rounded-t-lg">
          Find a Rental
        </div>
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="space-y-4 bg-white p-6 rounded-b-lg rounded-tr-lg shadow-lg"
      >
        <div className="flex flex-col gap-4">
          <input
            type="text"
            className="w-full px-6 py-4 border border-gray-400 rounded-full placeholder-gray-500"
            placeholder="Search Keyword"
            required
          />

          <div className="relative">
            <input
              type="text"
              className="w-full px-6 py-4 border border-gray-400 rounded-full placeholder-gray-500"
              placeholder="Search Location"
              required
            />
            <LocateFixed className="text-gray-500 absolute right-4 top-4" />
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="w-full border border-gray-400 rounded-full placeholder-gray-500 bg-white !px-6 !py-7 !text-gray-500 hover:bg-gray-50"
              >
                <span className="mr-auto text-gray-500">Property type</span>
                <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50 text-gray-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="center"
              className="w-[var(--radix-dropdown-trigger-width)]"
            >
              {["Villa", "Studio", "Office"].map((type) => (
                <DropdownMenuItem key={type} className="text-gray-600">
                  {type}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center text-black justify-between !mb-0">
          <Button
            variant="outline"
            className="flex items-center border-blue-600 !px-10 py-7 !rounded-full text-lg justify-center"
            onClick={() => {
              if (ddContainer.current) {
                ddContainer.current.classList.toggle("hidden");
                ddContainer.current.classList.toggle("block");
              }
            }}
            ref={advanceBtnRef}
          >
            Advanced <SlidersVertical />
          </Button>
          <Button
            type="submit"
            className="flex items-center bg-blue-600 text-white !px-14 py-7 !rounded-full text-lg justify-center"
          >
            Search <Search className="size-5" />
          </Button>
        </div>

        <div ref={ddContainer} className="hidden mt-4">
          <AdvanceSearch />
        </div>
      </form>
    </div>
  );
}
