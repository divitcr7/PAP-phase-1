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

  const handlePrev = () => {
    if (mainSwiper) {
      if (activeIndex === 0) {
        mainSwiper.slideTo(images.length - 1);
      } else {
        mainSwiper.slidePrev();
      }
    }
  };

  const handleNext = () => {
    if (mainSwiper) {
      if (activeIndex === images.length - 1) {
        mainSwiper.slideTo(0);
      } else {
        mainSwiper.slideNext();
      }
    }
  };

  return (
    <div className="px-4">
      <div className="max-w-5xl">
        <div className="relative mb-4">
          <Swiper
            modules={[Thumbs, EffectFade, Navigation]}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            className="rounded-lg overflow-hidden"
            spaceBetween={16}
            speed={500}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
            loop={true}
            navigation={false}
            onSwiper={setMainSwiper}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="image-sw-single aspect-[16/9] bg-muted">
                  <img
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
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
              onClick={handlePrev}
              className="navigation z-10 flex items-center justify-center w-10 h-10 rounded-full bg-background/80 text-foreground shadow-md pointer-events-auto ml-4 hover:bg-background transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </button>
            <button
              type="button"
              ref={navigationNextRef}
              onClick={handleNext}
              className="navigation z-10 flex items-center justify-center w-10 h-10 rounded-full bg-background/80 text-foreground shadow-md pointer-events-auto mr-4 hover:bg-background transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </button>
          </div>
        </div>
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={10}
          slidesPerView="auto"
          direction="horizontal"
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Thumbs, Navigation, Autoplay]}
          className="thumbs-swiper-thumbnails mt-4"
          slideToClickedSlide={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          breakpoints={{
            375: {
              slidesPerView: 3,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 4,
              spaceBetween: 12,
            },
            768: {
              slidesPerView: 5,
              spaceBetween: 14,
            },
            1024: {
              slidesPerView: 6,
              spaceBetween: 14,
            },
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide
              key={index}
              className="cursor-pointer w-auto max-w-[149px]"
              onClick={() => mainSwiper?.slideTo(index)}
            >
              <div
                className={`h-[80px] rounded-md overflow-hidden border-2 transition-all ${
                  activeIndex === index
                    ? "border-blue-500"
                    : "border-black/55 hover:border-primary"
                }`}
              >
                <img
                  src={image.thumbnailSrc || image.src}
                  alt={`${image.alt} thumbnail`}
                  width={149}
                  height={80}
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
