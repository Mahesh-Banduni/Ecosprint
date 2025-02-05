import React from 'react';
import { Link, NavLink } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react'; // Import Swiper styles
import { Navigation, Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import wedding from "../../assets/images/wedding.jpg";
import party from "../../assets/images/party.jpeg";
import work from "../../assets/images/work.webp";
import sport from "../../assets/images/sport.jpg";
import casual from "../../assets/images/casual.webp";
import beach from "../../assets/images/beach.jpg";

const OcassionSection = () => {
  // Data for the category items
  const categories = [
    { id: 1, name: "Wedding", image: wedding },
    { id: 2, name: "Party", image: party },
    { id: 3, name: "Work", image: work },
    { id: 4, name: "Sport", image: sport },
    { id: 3, name: "Casual", image: casual },
    { id: 4, name: "Beach", image: beach }
  ];

  return (
    <div className="w-11/12 mx-auto my-10 flex flex-col gap-5 max-sm:gap-2 ">
      <div className="flex flex-col gap-3 max-sm:gap-1 max-sm:items-center lg:mt-4">
      <div className=" font-sans text-primary-color text-center w-full">
      <div className="relative flex justify-center items-center w-full">
  
          <hr className="absolute w-full border-t-2 border-gray-300 z-0" />

          <h2 className="relative bg-white px-4 text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-3xl font-sans text-primary-color text-center font-semibold">
            Shop By Occasion
          </h2>
      </div>
      <h5 className='mt-2 text-gray-500 sm:text-sm'>Shoes for Every Step, Style for Every Occasion!</h5>
    </div>

      </div>

      <div className="my-5">
        <Swiper
          modules={[Navigation, Pagination]}
          //spaceBetween={30}
          loop={true}
          pagination={false}
          breakpoints={{
            1280: {
              slidesPerView: 4,
            },
            1150: {
              slidesPerView: 3.2,
            },
            1000: {
              slidesPerView: 3,
            },
            820: {
              slidesPerView: 2.5,
            },
            600: {
              slidesPerView: 2.1,
            },
            470: {
              slidesPerView: 1.7,
            },
            370: {
              slidesPerView: 1.3,
            },
            280: {
              slidesPerView: 1,
            },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <Link to="/products">
                <div className="mt-2 mb-3 m-2  flex flex-col items-center shadow-md hover:shadow-xl transform hover:-translate-y-2 transition duration-300">
                <img
                className="w-full h-[100%] object-cover"
                src={category.image}
                alt={category.name}
                />
                <div className="mt-2 mb-3 text-lg sm:text-xl md:text-xl lg:text-1xl xl:text-1xl text-center">{category.name}</div>
              </div>
              </Link>
            </SwiperSlide>
            
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default OcassionSection;
