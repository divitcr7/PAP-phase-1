import { Link, useLocation } from "react-router"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { menuItems } from "@/data/menu"

export function Nav() {
  const location = useLocation()

  return (
    <div className="flex items-center justify-center">
      <NavigationMenu className="">
        <NavigationMenuList>
          {menuItems.map((item, index) => {
            const isActive =
              item.isUrl
                ? location.pathname === item.url
                : item.links?.some((link) => location.pathname === link.href)

            if (item.links && item.links.length > 0) {
              return (
                <NavigationMenuItem key={index}>
                  <NavigationMenuTrigger
                    className={cn(isActive ? "text-primary" : "")}
                  >
                    {item.title}
                  </NavigationMenuTrigger>
                  <NavigationMenuContent className="left-0 mt-1 w-max">
                    <ul className="grid w-[200px] gap-3 pb-2 md:w-[200px]">
                      {item.links.map((link, linkIndex) => (
                        <li key={linkIndex}>
                          <NavigationMenuLink asChild>
                            <Link
                              to={link.href}
                              className={cn(
                                " select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                location.pathname === link.href
                                  ? "text-primary"
                                  : "text-muted-foreground"
                              )}
                            >
                              <div className="text-sm font-medium leading-none">
                                {link.label}
                              </div>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              )
            }

            return (
              <NavigationMenuItem key={index}>
                <Link to={item.url || "#"}>
                  <NavigationMenuLink
                    // asChild
                    className={cn(
                      navigationMenuTriggerStyle(),
                      location.pathname === item.url ? "text-primary" : ""
                    )}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}