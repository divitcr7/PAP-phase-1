import { useRef, useState } from "react";
import { Autoplay, EffectFade, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { SwiperClass } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
// import "swiper/css/thumbs";

const propertyImages = [
  {
    alt: "Property image 1",
    width: 1291,
    height: 680,
    src: "/placeholder.svg",
  },
  {
    alt: "Property image 2",
    width: 1290,
    height: 680,
    src: "/placeholder.svg",
  },
  {
    alt: "Property image 3",
    width: 1290,
    height: 680,
    src: "/placeholder.svg",
  },
  {
    alt: "Property image 4",
    width: 1291,
    height: 680,
    src: "/placeholder.svg",
  },
  {
    alt: "Property image 5",
    width: 1290,
    height: 680,
    src: "/placeholder.svg",
  },
  {
    alt: "Property image 6",
    width: 1290,
    height: 680,
    src: "/placeholder.svg",
  },
  {
    alt: "Property image 7",
    width: 1290,
    height: 680,
    src: "/placeholder.svg",
  },
  {
    alt: "Property image 8",
    width: 1291,
    height: 680,
    src: "/placeholder.svg",
  },
];

const thumbnails = [
  {
    src: "/public/images/banner/thumb-sw1.jpg",
    alt: "Thumbnail 1",
    width: 148,
    height: 111,
  },
  {
    src: "/public/images/banner/thumb-sw2.jpg",
    alt: "Thumbnail 2",
    width: 149,
    height: 111,
  },
  {
    src: "/public/images/banner/thumb-sw3.jpg",
    alt: "Thumbnail 3",
    width: 149,
    height: 111,
  },
  {
    src: "/public/images/banner/thumb-sw4.jpg",
    alt: "Thumbnail 4",
    width: 149,
    height: 111,
  },
  {
    src: "/public/images/banner/thumb-sw5.jpg",
    alt: "Thumbnail 5",
    width: 149,
    height: 111,
  },
  {
    src: "/public/images/banner/thumb-sw6.jpg",
    alt: "Thumbnail 6",
    width: 149,
    height: 111,
  },
  {
    src: "/public/images/banner/thumb-sw7.jpg",
    alt: "Thumbnail 7",
    width: 149,
    height: 111,
  },
  {
    src: "/public/images/banner/thumb-sw8.jpg",
    alt: "Thumbnail 8",
    width: 148,
    height: 111,
  },
];

export default function PropertySlider() {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass | null>(null);
  const [mainSwiper, setMainSwiper] = useState<SwiperClass | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef<HTMLButtonElement>(null);

  // Custom navigation handlers
  const handlePrev = () => {
    if (mainSwiper) {
      if (activeIndex === 0) {
        mainSwiper.slideTo(propertyImages.length - 1);
      } else {
        mainSwiper.slidePrev();
      }
    }
  };

  const handleNext = () => {
    if (mainSwiper) {
      if (activeIndex === propertyImages.length - 1) {
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
            modules={[Thumbs, Autoplay, EffectFade, Navigation]}
            thumbs={{
              swiper:
                thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
            }}
            className="rounded-lg overflow-hidden"
            spaceBetween={16}
            autoplay={{
              delay: 3000,
              disableOnInteraction: true,
            }}
            speed={500}
            effect="fade"
            fadeEffect={{
              crossFade: true,
            }}
            loop={false}
            navigation={false}
            onSwiper={(swiper) => {
              setMainSwiper(swiper);
            }}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
            }}
          >
            {propertyImages.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="image-sw-single aspect-[16/9] bg-muted">
                  <img
                    alt={image.alt}
                    src={image.src || "/placeholder.svg"}
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
          onSwiper={(swiper) => {
            setThumbsSwiper(swiper);
          }}
          spaceBetween={10}
          slidesPerView="auto"
          freeMode={true}
          watchSlidesProgress={true}
          modules={[Thumbs, Navigation]}
          className="thumbs-swiper-thumbnails mt-4"
          slideToClickedSlide={true}
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
              slidesPerView: 8,
              spaceBetween: 14,
            },
          }}
        >
          {thumbnails.map((thumb, index) => (
            <SwiperSlide
              key={index}
              className="cursor-pointer w-auto max-w-[149px]"
              onClick={() => {
                if (mainSwiper) {
                  mainSwiper.slideTo(index);
                }
              }}
            >
              <div
                className={`img-thumb-thumbnail h-[80px] rounded-md overflow-hidden border-2 transition-all ${
                  activeIndex === index
                    ? "border-blue-500"
                    : "border-transparent hover:border-primary"
                }`}
              >
                <img
                  alt={thumb.alt}
                  src={thumb.src || "/placeholder.svg"}
                  width={thumb.width}
                  height={thumb.height}
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
