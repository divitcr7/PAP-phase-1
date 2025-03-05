import { Link, useLocation } from "react-router"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Menu } from "lucide-react"
import { menuItems } from "@/data/menu"
import { useState } from "react"

export function MobileNav() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <nav className="flex flex-col gap-4 mt-8">
          {menuItems.map((item, index) => {
            // If it has dropdown links
            if (item.links && item.links.length > 0) {
              return (
                <Accordion key={index} type="single" collapsible className="w-full">
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-base">{item.title}</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex flex-col space-y-2 pl-4">
                        {item.links.map((link, linkIndex) => (
                          <Link
                            key={linkIndex}
                            to={link.href}
                            className={`text-sm py-2 ${
                              location.pathname === link.href ? "text-primary font-medium" : "text-muted-foreground"
                            }`}
                            onClick={() => setOpen(false)}
                          >
                            {link.label}
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              )
            }

            // If it's a direct link
            return (
              <Link
                key={index}
                to={item.url || "#"}
                className={`text-base py-2 ${location.pathname === item.url ? "text-primary font-medium" : ""}`}
                onClick={() => setOpen(false)}
              >
                {item.title}
              </Link>
            )
          })}

          <div className="mt-6 space-y-4">
            <Button variant="outline" className="w-full" onClick={() => console.log("open login modal")}>
              Sign In
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

