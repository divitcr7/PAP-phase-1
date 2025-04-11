export interface MenuLink {
  route: string;
  label: string;
}

export interface MenuItem {
  title: string;
  route?: string;
  links?: MenuLink[];
}

export const menuItems: MenuItem[] = [
  {
    title: "Home",
    route: "/",
  },
  // {
  //   title: "Listing",
  //   route: "/sidebar-list",
  // },
  {
    title: "Properties",
    route: "/properties",
  },
  // {
  //   title: "Pages",
  //   links: [
  //     { route: "/about-us", label: "About Us" },
  //     { route: "/our-service", label: "Our Services" },
  //     { route: "/privacy-policy", label: "Privacy Policy" },
  //     { route: "/pricing", label: "Pricing" },
  //     { route: "/contact", label: "Contact Us" },
  //     { route: "/faq", label: "FAQs" },
  //   ],
  // },
  // {
  //   title: "Blog",
  //   route: "/blog",
  // },
  // {
  //   title: "Dashboard",
  //   links: [
  //     { route: "/dashboard", label: "Dashboard" },
  //     { route: "/my-property", label: "My Properties" },
  //     { route: "/my-favorites", label: "My Favorites" },
  //     { route: "/reviews", label: "Reviews" },
  //     { route: "/my-profile", label: "My Profile" },
  //   ],
  // },
];
