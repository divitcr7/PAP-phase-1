import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

export default function AdvanceSearch() {
  const [price, setPrice] = useState([100, 700]);
  const [size, setSize] = useState([500, 1500]);
  const options = ["All", 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const types = ["All", "Apartment", "House", "Condo", "Studio"];

  return (
    <>
      <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg shadow-sm">
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Price:</span>
            <div>
              <span className="font-semibold">${price[0]}</span> -{" "}
              <span className="font-semibold">${price[1]}</span>
            </div>
          </div>
          <Slider
            defaultValue={price}
            min={100}
            max={1000}
            step={10}
            onValueChange={setPrice}
          />
        </div>
        <div>
          <div className="flex justify-between mb-2">
            <span className="font-semibold">Size:</span>
            <div>
              <span className="font-semibold">{size[0]}</span> -{" "}
              <span className="font-semibold">{size[1]}</span>
            </div>
          </div>
          <Slider
            defaultValue={size}
            min={20}
            max={2000}
            step={10}
            onValueChange={setSize}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4 border rounded-lg shadow-sm">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Rooms</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Select</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {options.map((option, index) => (
                  <DropdownMenuItem key={index}>{option}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <label className="font-semibold">Bathrooms</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Select</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {options.map((option, index) => (
                  <DropdownMenuItem key={index}>{option}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-semibold">Bedrooms</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Select</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {options.map((option, index) => (
                  <DropdownMenuItem key={index}>{option}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div>
            <label className="font-semibold">Type</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">Select</Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {types.map((type, index) => (
                  <DropdownMenuItem key={index}>{type}</DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="p-4 border rounded-lg shadow-sm">
        <div className="font-semibold mb-2">Amenities:</div>
        <div className="grid grid-cols-3 gap-4">
          {[
            "Air Condition",
            "Cable TV",
            "Ceiling Height",
            "Fireplace",
            "Disabled Access",
            "Elevator",
            "Fence",
            "Garden",
            "Floor",
            "Furnishing",
            "Garage",
            "Pet Friendly",
            "Heating",
            "Intercom",
            "Parking",
            "WiFi",
            "Renovation",
            "Security",
            "Swimming Pool",
            "Window Type",
            "Search property",
            "Construction Year",
          ].map((amenity, index) => (
            <div key={index} className="flex items-center gap-2">
              <input type="checkbox" id={`cb${index}`} className="w-4 h-4" />
              <label htmlFor={`cb${index}`} className="text-sm">
                {amenity}
              </label>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
