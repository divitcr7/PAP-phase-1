import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

export default function Brands() {
  const partners = [
    {
      src: "/images/brands/First-Choice.png",
      alt: "First Choice Management Group",
    },
    {
      src: "/images/brands/Juniper.png",
      alt: "Juniper Investment Group",
    },
    { src: "/images/brands/Resman.png", alt: "RESMAN" },
  ];

  return (
    <section className="w-full py-24 bg-gray-500">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900">
            Trusted by <span className="italic">leading</span> brands
          </h3>
        </div>

        {/* Desktop View */}
        <div className="hidden md:flex justify-center items-center gap-16 lg:gap-40">
          {partners.map((partner, index) => (
            <div
              key={index}
              className="opacity-80 hover:opacity-100 transition-opacity duration-300"
            >
              <img
                src={partner.src}
                alt={partner.alt}
                className="max-h-16 lg:max-h-32 w-auto object-contain"
              />
            </div>
          ))}
        </div>

        {/* Mobile Swiper */}
        <div className="md:hidden">
          <Swiper
            spaceBetween={30}
            slidesPerView={1.5}
            centeredSlides={true}
            loop={true}
            modules={[Autoplay]}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            className="mt-8"
          >
            {partners.map((partner, index) => (
              <SwiperSlide key={index} className="flex justify-center">
                <div className="opacity-80 hover:opacity-100 transition-opacity duration-300">
                  <img
                    src={partner.src}
                    alt={partner.alt}
                    className="max-h-14 w-auto object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
