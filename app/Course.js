import Link from "next/dist/client/link";
//import SwiperCore, { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// SwiperCore.use([Autoplay]);
import "swiper/css";

const data = [
  {
    id: 1,
    coursename: "Electrical Engineering",
    image: "/images/graphics 1 transparent.png",
    link: "/PmdcmotorFINAL",
  },
  {
    id: 2,
    coursename: "Mechanical Engineering",
    image: "/images/graphics 1 transparent.png",
    link: "",
  },
  {
    id: 3,
    coursename: "Civil Engineering",
    image: "/images/graphics 1 transparent.png",
    link: "",
  },
  {
    id: 4,
    coursename: "Electronics Engineering",
    image: "/images/graphics 1 transparent.png",
    link: "",
  },
  {
    id: 5,
    coursename: "Computer Science Engineering",
    image: "/images/graphics 1 transparent.png",
    link: "",
  },
];
const Course = () => {
  return (
    <>
      <div className="ml-2 md:ml-8 lg:ml-10">
        <div className="font-bold rounded-sm md:text-lg lg:text-3xl mb-4">
          Catagories
        </div>
        <Swiper
          spaceBetween={50}
          onSwiper={(swiper) => console.log(swiper)}
          breakpoints={{
            250: {
              width: 250,
              slidesPerView: 1.5,
            },
            // when window width is >= 640px
            640: {
              width: 640,
              slidesPerView: 2,
            },
            // when window width is >= 768px
            768: {
              width: 768,
              slidesPerView: 2.5,
            },
            1024: {
              width: 1024,
              slidesPerView: 3,
            },
            1280: {
              width: 1280,
              slidesPerView: 3.5,
            },
            1536: {
              width: 1536,
              slidesPerView: 4,
            },
          }}
          loop={true}
          autoplay={{
            delay: 4000,
            transition: 4000,
            disableOnInteraction: false,
          }}
        >
          {data.map((user) => (
            <SwiperSlide key={user.id}>
              <div className="   md:shadow-2xl  rounded-md flex flex-col justify-center items-center bg-blue-300">
                <img src="/images/graphics 1 transparent.png"></img>
                <div className="font-bold text-md md:text-lg lg:text-xl my-3">
                  {user.coursename}
                </div>
                <div
                  className=" mt-3 mb-3 w-36 h-24   flex flex-col justify-center items-center gap-y-2 text-center md:flex md:w-80  
          md:flex-row gap-x-3 md:ml-5 lg:w-110"
                >
                  <div className="btn-first font-medium ">
                    {" "}
                    <Link href="">Watch Videos</Link>
                  </div>
                  <div
                    className="py-2 px-1 text-white bg-gradient-to-r from-orange-500 
              to-yellow-500 hover:-translate-y-0.5 hover:shadow-xl transform transition active:scale-75 rounded-2xl
              border-none shadow-lg font-medium "
                  >
                    <Link href="/ThreeD">Watch 3D Models</Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};
export default Course;
