import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay} from "swiper";


// import LoadingSpinner from "../../../LoadingSpinner/LoadingSpinner";

const Banners = () => {
  const [banners, setBanners] = useState([]);
  //   const [isLoading, setIsLoading] = useState(true);
  const swiperRef = useRef(null);

  useEffect(() => {
    // setIsLoading(true);
    fetch("banners.json")
      .then((result) => result.json())
      .then((banners) => {
        setBanners(banners);
        // setIsLoading(false);
      });
  }, []);

  //   if (isLoading) {
  //     return <LoadingSpinner />;
  //   }

  const handleSwiperHover = () => {
    if (swiperRef.current && swiperRef.current.swiper.autoplay.running) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleSwiperLeave = () => {
    if (swiperRef.current && !swiperRef.current.swiper.autoplay.running) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  return (
    <div
      className="mb-20"
      onMouseEnter={handleSwiperHover}
      onMouseLeave={handleSwiperLeave}
    >
      <Swiper
        ref={swiperRef}
        spaceBetween={30}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        
        modules={[Autoplay]}
        className="mySwiper"
      >
        {banners.map((banner) => (
          <SwiperSlide key={banner._id}>
            <div
              className="relative bg-center bg-cover lg:h-screen h-96"
              style={{ backgroundImage: `url(${banner.img})`,  }}
            >
              <div className="absolute inset-0 bg-black opacity-30 duration-700"></div>
              {/* banner description */}
              <div className="absolute lg:left-14 lg:top-1/2 lg:max-w-3xl w-full pr-16 left-8 bottom-12  transform lg:-translate-y-1/2">
              <h2 className="lg:text-[52px] lg:mb-6 mb-1 text-3xl font-bold text-white ">Summer camps</h2>
              <p className="lg:text-2xl text-base text-white">50 destinations in 20 countries</p>
              <div className="mt-4 flex flex-col lg:flex-row lg:gap-4 gap-2">
              <button className="lg:px-6 px-2 py-1 lg:text-base text-xs  hover:shadow-2xl lg:py-3 bg-white hover:bg-slate-100 text-black rounded-full">Explore Destinations</button>
              <button className="lg:px-6 lg:py-3 px-2 py-1 lg:text-base text-xs hover:shadow-2xl bg-sky-400 text-white hover:bg-sky-500 rounded-full">Order Free Brochure</button>
              </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Banners;
