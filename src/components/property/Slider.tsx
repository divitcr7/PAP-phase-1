import { useRef, useState } from "react";
import { Autoplay, EffectFade, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperClass } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PropertyImage } from "@/types/properties";

interface SliderProps {
  images: PropertyImage[];
}

export default function Slider({ images }: SliderProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="px-4">
      <div className="max-w-5xl">
        <div className="relative mb-4">
          <Swiper
            modules={[Navigation, EffectFade, Thumbs, Autoplay]}
            thumbs={{ swiper: thumbsSwiper }}
            effect="fade"
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            onSwiper={setMainSwiper}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
            className="main-swiper rounded-lg overflow-hidden"
            style={{ height: "500px" }}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index} className="!h-full">
                <div className="w-full h-full relative">
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="box-navigation absolute inset-0 flex items-center justify-between pointer-events-none">
            <button
              type="button"
              ref={navigationPrevRef}
              onClick={() => mainSwiper?.slidePrev()}
              className="navigation z-10 flex items-center justify-center w-10 h-10 rounded-full bg-background/80 text-foreground shadow-md pointer-events-auto ml-4 hover:bg-background transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </button>
            <button
              type="button"
              ref={navigationNextRef}
              onClick={() => mainSwiper?.slideNext()}
              className="navigation z-10 flex items-center justify-center w-10 h-10 rounded-full bg-background/80 text-foreground shadow-md pointer-events-auto mr-4 hover:bg-background transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>

        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={8}
          slidesPerView={6}
          watchSlidesProgress={true}
          modules={[Navigation, Thumbs]}
          className="thumbs-swiper mt-4"
          loop={true}
          breakpoints={{
            375: { slidesPerView: 3 },
            640: { slidesPerView: 4 },
            768: { slidesPerView: 5 },
            1024: { slidesPerView: 6 },
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="!h-20 cursor-pointer">
              <div
                className={`w-full h-full rounded-md overflow-hidden border-2 transition-all ${
                  activeIndex === index
                    ? "border-blue-500"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={image.thumbnailSrc || image.src}
                  alt={`${image.alt} thumbnail`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
