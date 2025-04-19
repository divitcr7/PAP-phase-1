import { testimonialData } from "@/data/testimonials";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {

  return (
    <section className="flex flex-col md:flex-row">
      {/* Left side */}
      <div className="bg-slate-200 p-8 md:p-12 lg:p-16 md:w-1/2 flex items-end">
        <div className="max-w-xl mx-auto md:mx-0 md:ml-auto py-10 lg:py-10 md:mr-0 md:pr-6">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-800">
            Our Testimonials
          </h2>
          <p className="mt-4 text-base lg:text-lg text-slate-600">
            Our seasoned team excels in real estate with years of successful
            market navigation, offering informed decisions and optimal results.
          </p>
        </div>
      </div>

      {/* Right side */}
      <div className="bg-white p-8 py-28 lg:py-0 md:p-12 lg:p-16 lg:py-24 md:w-1/2 flex flex-col justify-between">
        <Swiper
          className="w-full"
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
            el: ".testimonial-pagination",
            bulletClass:
              "inline-block w-2.5 h-2.5 rounded-full mx-1 cursor-pointer border-2 border-slate-300 bg-transparent",
            bulletActiveClass: "!bg-blue-500 !border-blue-500",
          }}
        >
          {testimonialData.map(({ id, quote, name, position, stars }) => (
            <SwiperSlide key={id}>
              <div className="max-w-lg space-y-12 lg:space-y-16">
                {/* Stars */}
                <div className="flex">
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
                <p className="text-lg md:text-xl lg:text-2xl font-semibold text-slate-800">
                  "{quote}"
                </p>

                {/* Author info */}
                <div className="text-sm text-slate-600">
                  <span className="font-medium">{name}</span>
                  {position && <span>, {position}</span>}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination dots */}
        <div className="testimonial-pagination flex justify-start mt-6 mb-10"></div>
      </div>
    </section>
  );
}
