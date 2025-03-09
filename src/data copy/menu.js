export const menuItems = [
  {
    title: "Home",
    isCurrent: true,
    isUrl: true,
    url: "/",
  },
  {
    title: "Listing",
    isUrl: true,
    url: "/sidebar-list",
  },
  {
    title: "Properties",
    isUrl: true,
    url: "/property-details",
  },
  {
    title: "Pages",
    links: [
      { href: "/about-us", label: "About Us" },
      { href: "/our-service", label: "Our Services" },
      { href: "/pricing", label: "Pricing" },
      { href: "/contact", label: "Contact Us" },
      { href: "/faq", label: "FAQs" },
      { href: "/privacy-policy", label: "Privacy Policy" },
    ],
  },
  {
    title: "Blog",
    isUrl: true,
    url: "/blog",
  },
  {
    title: "Dashboard",
    links: [
      { href: "/dashboard", label: "Dashboard" },
      { href: "/my-property", label: "My Properties" },
      { href: "/my-favorites", label: "My Favorites" },
      { href: "/reviews", label: "Reviews" },
      { href: "/my-profile", label: "My Profile" },
    ],
  },
];
