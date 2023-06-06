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
              <div className="absolute left-14 top-1/2 lg:max-w-3xl md:max-w-xl  transform -translate-y-1/2">
              <h2 className="text-[52px] font-bold mb-2 text-white ">Summer camps</h2>
              <p className="text-2xl text-white">50 destinations in 20 countries</p>
              <div className="mt-5 flex gap-4">
              <button className="px-6 hover:shadow-2xl py-3 bg-white text-black rounded-full">Explore Destinations</button>
              <button className="px-6 py-3 hover:shadow-2xl bg-sky-400 text-white rounded-full">Order Free Brochure</button>
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
