import * as React from "react";
import { Link, useLocation } from "react-router";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { menuItems } from "@/data/menu";

export function Nav() {
  const location = useLocation();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.route;

          return item.links ? (
            // Dropdown Menu
            <NavigationMenuItem key={item.title}>
              <NavigationMenuTrigger
                className={cn(
                  isActive && "text-blue-500",
                  "hover:text-blue-500 data-[active]:text-primary data-[state=open]:text-primary after:absolute after:bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
                )}
              >
                {item.title}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="mt-2 pb-2 bg-white md:w-[180px] lg:w-[220px] shadow-lg rounded-lg">
                  {item.links.map((link) => {
                    const isSubActive = location.pathname === link.route;
                    return (
                      <ListItem
                        key={link.route}
                        href={link.route}
                        title={link.label}
                        className={cn(isSubActive && "text-primary")}
                      />
                    );
                  })}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            // Single Link Item
            <NavigationMenuItem key={item.title}>
              <NavigationMenuLink asChild>
                <Link
                  to={item.route!}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    isActive && "text-primary",
                    "hover:text-blue-500 data-[active]:text-primary data-[state=open]:text-primary after:absolute after:bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full"
                  )}
                >
                  {item.title}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, href, ...props }, ref) => {
  return (
    <li className="px-6">
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={href ?? "/"}
          className={cn(
            "relative inline-flex h-10 w-max items-center justify-center rounded-none bg-transparent px-0 py-2 text-sm font-medium transition-colors hover:text-blue-500 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:text-primary data-[state=open]:text-primary after:absolute after:bottom-2 after:left-0 after:h-0.5 after:w-0 after:bg-blue-500 after:transition-all after:duration-300 hover:after:w-full",
            className
          )}
          {...props}
        >
          {title}
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
