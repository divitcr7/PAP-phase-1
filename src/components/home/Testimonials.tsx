import { testimonialData } from "@/data/testimonials";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  const companyLogos = [
    { id: 1, src: "/placeholder.svg?height=40&width=80", alt: "Company 1" },
    { id: 2, src: "/placeholder.svg?height=40&width=80", alt: "Company 2" },
    { id: 3, src: "/placeholder.svg?height=40&width=80", alt: "Company 3" },
    { id: 4, src: "/placeholder.svg?height=40&width=80", alt: "Company 4" },
    { id: 5, src: "/placeholder.svg?height=40&width=80", alt: "Company 5" },
  ];

  return (
    <section className="flex flex-col md:flex-row">
      {/* Left side */}
      <div className="bg-slate-200 p-8 md:p-12 lg:p-16 md:w-1/2">
        <div className="max-w-md mx-auto md:mx-0 md:ml-auto md:mr-0 md:pr-8">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800">
            Our Testimonials
          </h2>
          <p className="mt-4 text-slate-600">
            Our seasoned team excels in real estate with years of successful
            market navigation, offering informed decisions and optimal results.
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="bg-white p-8 md:p-12 lg:p-16 md:w-1/2">
        <Swiper
          className="w-full h-[70%]"
          slidesPerView={1}
          loop={true}
          spaceBetween={30}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            bulletClass:
              "inline-block w-2.5 h-2.5 rounded-full mx-1 cursor-pointer border-2 border-slate-300 bg-transparent",
            bulletActiveClass: "!bg-blue-500 !border-blue-500",
          }}
        >
          {testimonialData.map(({ id, quote, name, position, stars }) => (
            <SwiperSlide key={id} className="h-[60%]">
              <div className="max-w-lg h-[60%] flex flex-col">
                {/* Stars */}
                <div className="flex mb-4">
                  {[...Array(stars)].map((_, index) => (
                    <svg
                      key={index}
                      className="w-5 h-5 text-yellow-500 fill-yellow-500"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>

                {/* Quote */}
                <p className="text-lg md:text-xl font-medium text-slate-800 mb-6">
                  "{quote}"
                </p>

                {/* Author info */}
                <div className="mt-4 text-sm text-slate-600">
                  <span className="font-medium">{name}</span>
                  {position && <span>, {position}</span>}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Trusted by companies */}
        <div className="mt-auto pt-8 mb-20">
          <p className="text-sm text-slate-600 mb-4">
            Trusted by over 150+ major companies
          </p>
          <div className="flex flex-wrap gap-6 items-center">
            {companyLogos.map((logo) => (
              <img
                key={logo.id}
                src={logo.src || "/placeholder.svg"}
                alt={logo.alt}
                width={80}
                height={40}
                className="opacity-70 grayscale"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
