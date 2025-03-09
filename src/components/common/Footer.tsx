import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Button } from "../ui/button";
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
    <footer className="bg-[#141c2f] text-white py-14">

      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center mb-12 border-b pb-12 border-gray-700 px-30 animate-fade-in">
        <div className="flex items-center mb-6 md:mb-0">
          <Link to="/" className="flex items-center">
            <img
              alt="logo"
              width={166}
              height={48}
              src="/images/logo/logo-transparent@2x.png"
              className="transition-transform duration-300 ease-in-out transform hover:scale-105"
            />
          </Link>
        </div>

        <div className="flex items-center">
          <span className="mr-4 text-gray-300">Follow Us:</span>
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
      <div className="px-30">
        <div className="container mx-auto border-b border-gray-700 pb-12 animate-fade-in">
          <div className="flex gap-32 justify-between">
            {/* Company Info */}
            <div>
              <p className="text-gray-400 mb-6">
                Specializes in providing high-class pads (Rental Properties) for
                those in need.
                <Link
                  to="/contact"
                  className="text-blue-500 hover:underline ml-1"
                >
                  Contact Us
                </Link>
              </p>
              <ul className="space-y-3">
                <li className="flex items-center hover:translate-x-2 transition-transform">
                  <MapPin className="text-gray-400 mr-3 size-6" />
                  <span>2507 South Blvd, Houston, TX 77004</span>
                </li>
                <li className="flex items-center hover:translate-x-2 transition-transform">
                  <Phone className="text-gray-400 mr-3 size-6" />
                  <Link
                    to="tel:+1-713-894-1937"
                    className="hover:text-blue-500"
                  >
                    +1-713-894-1937
                  </Link>
                </li>
                <li className="flex items-center hover:translate-x-2 transition-transform">
                  <Mail className="text-gray-400 mr-3 size-6" />
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
            {FooterMenuItems.map((item, idx) => (
              <div key={idx} className="animate-slide-up">
                <h3 className="text-xl font-semibold mb-4 whitespace-nowrap hover:text-blue-500 transition-colors">
                  {item.title}
                </h3>
                <ul className="space-y-2">
                  {item.items.map((subItem, subIdx) => (
                    <li key={subIdx}>
                      <Link
                        to={subItem.link}
                        className="text-gray-400 hover:text-blue-500 transition-colors block relative group"
                      >
                        {subItem.label}
                        <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Newsletter */}
            <div className="w-xl animate-slide-up">
              <h3 className="text-xl font-semibold mb-4">Newsletter</h3>
              <p className="text-gray-400 mb-6">
                Your Weekly/Monthly Dose of Knowledge and Inspiration
              </p>
              <div className="relative">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full bg-[#1e2738] rounded-full py-3 px-4 pr-12 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Button className="absolute right-1.5 top-1.5 bg-blue-500 p-2 rounded-full hover:bg-blue-600 transition-transform hover:scale-110">
                  <ArrowRight className="h-4 w-4 text-white" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="container mx-auto flex justify-between items-center pt-6 text-gray-400 text-sm">
          <p>&copy; 2025 Pick A Pad. All Rights Reserved.</p>
          <div className="flex space-x-6">
            {FooterBottom.map((item, idx) => (
              <Link key={idx} to={item.link} className="hover:text-blue-500">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
