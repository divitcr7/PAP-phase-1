import { Button } from "@/components/ui/button";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { testimonialData } from "@/data/testimonials";
import "swiper/css";
import "swiper/css/pagination";
import Brands from "@/components/home/Brands";
import { useNavigate } from "react-router";
import BannerSection from "@/components/common/BannerSection";

export default function AboutPage() {
  const navigate = useNavigate();
  const benefits = [
    {
      title: "Self Touring Options",
      description:
        "Experience the freedom to explore properties at your own pace with our convenient self-touring feature.",
      icon: (
        <svg
          className="h-12 w-12 text-blue-600"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Instant Leasing Process",
      description:
        "Enjoy a seamless and quick leasing experience with our streamlined digital process.",
      icon: (
        <svg
          className="h-12 w-12 text-blue-600"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Reduced Rent Opportunities",
      description:
        "Access exclusive reduced rent opportunities and special offers as a Pad Person.",
      icon: (
        <svg
          className="h-12 w-12 text-blue-600"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-blue-500 to-blue-300 py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center text-white mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About Pick A Pad
            </h1>
            <p className="text-xl max-w-3xl mx-auto">
              Where we turn houses into homes and dreams into reality
            </p>
          </div>
        </div>
      </section>
      {/* About Us Section */}
      <section className="container mx-auto py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">
            Welcome to Pick A Pad
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            At Pick A Pad, we understand that a home is more than just a
            physical space—it's a place where memories are created, families
            grow, and life unfolds. Our mission is to help you find the perfect
            living space that meets your needs and exceeds your expectations.
          </p>

          <div className="flex justify-center mb-12">
            <div className="relative">
              <img
                src="/images/banner/sign.png"
                alt="CEO Signature"
                className="h-24 mx-auto"
              />
              <div className="text-center mt-4">
                <h6 className="font-semibold text-slate-900">Kevin</h6>
                <p className="text-gray-500">CEO & Founder</p>
              </div>
            </div>
          </div>

          <Button
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => navigate("/contact")}
          >
            Contact Us
          </Button>
        </div>
      </section>
      {/* Image Gallery Section */}
      <Brands />
      {/* Benefits Section */}
      <section className="container mx-auto py-16 px-6">
        <div className="text-center mb-12">
          <p className="text-lg font-semibold text-blue-600 uppercase">
            Our Benefits
          </p>
          <h2 className="text-3xl font-bold text-slate-900 mt-2">
            Discover what sets our Real Estate expertise apart
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto mt-4">
            Our seasoned professionals, armed with extensive market knowledge,
            walk alongside you through every phase of your property endeavor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
            >
              <div className="mb-4">{benefit.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">
                {benefit.title}
              </h3>
              <p className="text-gray-600">{benefit.description}</p>
              <div className="mt-4 text-blue-600 font-medium flex items-center">
                <span>Explore Now</span>
                <svg
                  className="ml-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16 space-y-8">
            <p className="text-lg font-semibold text-blue-600 uppercase">
              Our Testimonials
            </p>
            <h2 className="text-3xl font-bold text-slate-900">
              What People Say
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto -m1-2">
              Our seasoned team excels in real estate with years of successful
              market navigation, offering informed decisions and optimal
              results.
            </p>
          </div>

          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="pb-12"
          >
            {testimonialData.map(
              ({ id, quote, avatarSrc, name, position, stars }) => (
                <SwiperSlide key={id}>
                  <div className="bg-white p-10 rounded-lg shadow-sm h-full space-y-12 py-20">
                    <div className="flex justify-center">
                      {[...Array(stars)].map((_, index) => (
                        <svg
                          key={index}
                          className="h-5 w-5 text-yellow-500"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>

                    <p className="text-gray-600 italic">"{quote}"</p>

                    <div className="flex items-center">
                      <img
                        src={avatarSrc}
                        alt={name}
                        className="h-12 w-12 rounded-full object-cover mr-4"
                      />
                      <div>
                        <h4 className="font-semibold text-slate-900">{name}</h4>
                        <p className="text-gray-500 text-sm">{position}</p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              )
            )}
          </Swiper>
        </div>
      </section>
      {/* Banner Section */}
      <BannerSection />
    </div>
  );
}
