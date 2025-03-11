import { MapPin, Phone, Mail } from "lucide-react";
import { Link } from "react-router";
import YoutubeIcon from "@/assets/logos/youtube.svg?react";
import InstagramIcon from "@/assets/logos/instagram.svg?react";
import XIcon from "@/assets/logos/x.svg?react";
import FacebookIcon from "@/assets/logos/facebook.svg?react";
import LinkedinIcon from "@/assets/logos/linkedin.svg?react";

export default function Footer() {
  const SocialMedia = [
    { icon: FacebookIcon, link: "#" },
    { icon: LinkedinIcon, link: "#" },
    { icon: XIcon, link: "#" },
    { icon: InstagramIcon, link: "#" },
    { icon: YoutubeIcon, link: "#" },
  ];

  const FooterMenuItems = [
    {
      title: "Categories",
      items: [
        { label: "Pricing Plans", link: "/pricing" },
        { label: "Our Services", link: "/services" },
        { label: "About Us", link: "/about-us" },
        { label: "Contact Us", link: "/contact" },
      ],
    },
    {
      title: "Our Company",
      items: [
        { label: "Property For Rent", link: "/rent" },
        { label: "Our Agents", link: "/agents" },
      ],
    },
  ];

  const FooterBottom = [
    { label: "Terms Of Services", link: "/terms" },
    { label: "Privacy Policy", link: "/privacy" },
    { label: "Cookie Policy", link: "/cookies" },
  ];

  return (
    <footer className="bg-[#141c2f] text-white pt-10 pb-4 md:py-14 px-6 md:px-30">
      {/* Top Section */}
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-12 border-b pb-6 md:pb-12 border-gray-700 animate-fade-in">
        <div className="flex justify-start mb-6 md:mb-0">
          <Link to="/" className="flex items-start md:items-center">
            <img
              alt="logo"
              width={166}
              height={48}
              src="/images/logo/logo-transparent@2x.png"
              className="transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
          </Link>
        </div>

        <div className="">
          <div className="flex space-x-3">
            {SocialMedia.map((item, index) => (
              <Link
                key={index}
                to={item.link}
                className="bg-[#1e2738] p-3 rounded-full hover:bg-blue-600 transition-colors transform hover:scale-110"
              >
                <item.icon className="text-white" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto border-b border-gray-700 pb-6 md:pb-12 animate-fade-in">
        <div className="flex flex-col md:flex-row gap-6 md:gap-28 text-center md:text-left">
          {/* Company Info */}
          <div className="text-left md:w-lg md:mr-10">
            <p className="text-gray-400 mb-4">
              Specializes in providing high-class pads (Rental Properties) for
              those in need.
              <br />
              <Link to="/contact" className="text-blue-500 hover:underline">
                Contact Us
              </Link>
            </p>
            <ul className="space-y-3 flex flex-col md:block items-start">
              <li className="flex items-center justify-center md:justify-start">
                <MapPin className="text-gray-400 mr-3 md:mr-4 size-5 md:size-6" />
                <span>2507 South Blvd, Houston, TX 77004</span>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Phone className="text-gray-400 mr-3 md:mr-4 size-5 md:size-6" />
                <Link to="tel:+1-713-894-1937" className="hover:text-blue-500">
                  +1-713-894-1937
                </Link>
              </li>
              <li className="flex items-center justify-center md:justify-start">
                <Mail className="text-gray-400 mr-3 md:mr-4 size-5 md:size-6" />
                <Link
                  to="mailto:admin@pick-a-pad.com"
                  className="hover:text-blue-500"
                >
                  admin@pick-a-pad.com
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories and Our Company */}
          <div className="flex justify-between md:justify-content mt-4 md:mt-0 px-4 md:px-0 flex-row gap-6 md:gap-56 text-left">
            {FooterMenuItems.map((item, idx) => (
              <div key={idx}>
                <h3 className="text-xl font-semibold mb-4 hover:text-blue-500 transition-colors">
                  {item.title}
                </h3>
                <ul className="space-y-2">
                  {item.items.map((subItem, subIdx) => (
                    <li key={subIdx}>
                      <Link
                        to={subItem.link}
                        className="text-gray-400 hover:text-blue-500 transition-colors block"
                      >
                        {subItem.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="container mx-auto flex flex-col md:flex-row justify-center md:justify-between items-center pt-6 text-gray-400 text-sm">
        <p className="text-center md:text-left mb-4 md:mb-0">
          &copy; 2025 Pick A Pad. All Rights Reserved.
        </p>
        <div className="flex-row space-x-6 text-center">
          {FooterBottom.map((item, idx) => (
            <Link key={idx} to={item.link} className="hover:text-blue-500">
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
