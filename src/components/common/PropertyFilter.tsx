import React, { useEffect, useRef } from "react";
import AdvanceSearch from "./AdvanceSearch";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, SlidersVertical } from "lucide-react";

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
        <div className="text-lg font-medium p-4 bg-blue-600 underline decoration-white-600 underline-offset-4 rounded-t-lg">
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
            className="w-full p-2 border rounded-lg"
            placeholder="Search Keyword"
            required
          />

          <div className="relative">
            <input
              type="text"
              className="w-full p-2 border rounded-lg"
              placeholder="Search Location"
              required
            />
            <span className="absolute right-3 top-2.5 text-gray-500">📍</span>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Property Type</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {["Villa", "Studio", "Office"].map((type) => (
                <DropdownMenuItem key={type}>{type}</DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex items-center text-black justify-between">
          <Button
            variant="outline"
            className="flex items-center border-blue-600 px-20 py-6"
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
          <Button type="submit" className="flex items-center bg-blue-600 text-white px-20 py-6">
            Search <Search />
          </Button>
        </div>

        <div ref={ddContainer} className="hidden mt-4">
          <AdvanceSearch />
        </div>
      </form>
    </div>
  );
}
