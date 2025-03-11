import { Link, useLocation } from "react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { menuItems } from "@/data/menu";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const location = useLocation();

  return (
    <nav className="flex flex-col gap-4 p-4">
      {menuItems.map((item, index) => {
        // If it has dropdown links
        if (item.links && item.links.length > 0) {
          return (
            <Accordion key={index} type="single" collapsible className="w-full">
              <AccordionItem value={`item-${index}`}>
                <AccordionTrigger className={cn("text-base font-normal")}>
                  {item.title}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2 pl-4">
                    {item.links.map((link, linkIndex) => (
                      <Link
                        key={linkIndex}
                        to={link.route}
                        className={`text-sm py-2 ${
                          location.pathname === link.route
                            ? "text-primary font-medium"
                            : "text-muted-foreground"
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          );
        }

        // If it's a direct link
        return (
          <Link
            key={index}
            to={item.route || "#"}
            className={`text-base py-2 ${
              location.pathname === item.route ? "text-primary font-medium" : ""
            }`}
          >
            {item.title}
          </Link>
        );
      })}
    </nav>
  );
}
