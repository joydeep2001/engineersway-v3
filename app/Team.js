import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaCopyright,
} from "react-icons/fa";
import Link from "next/link";
import Slider from "react-slick";
import TeamCard from "../components/TeamCard";
import { useState, useEffect, useRef, useCallback } from "react";
import { teamInfo } from "../public/hardData/TeamInfo";
import AOS from 'aos';
import 'aos/dist/aos.css';


const Team = () => {
  useEffect(() => {
    AOS.init();
  }, [])
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplayspeed: 8000,
    responsive: [
      {
        
        breakpoint: 360,
        settings: {
          autoplay: false,
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          dots: false,
          autoplay: true,
          autoplayspeed:3000,
        },
      },
    ]
  };
  return (
    <>
      <div
        id="Team"
        className="w-full h-full m-0 p-0 overflow-hidden font-Mont bg-white-2 dark:bg-black-bg1"
      >
        <div className="teamWrap lg:container  sm:px-8 lg:px-8 sm:mx-auto  mt-5 mb-10">
          <h3 className="mb-5 lg:mb-0 text-5xl font-bold  text-black-bg dark:text-slate-50" data-aos="fade-right">
            Our Team
          </h3>

          <Slider {...settings}>
            {teamInfo.map(({ name, role, body, img, hyperlinks }, k) => (
              <TeamCard
                key={k}
                header={name}
                subHeader={role}
                body={body}
                img={img}
                hyperlinks={hyperlinks}
              />
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};
export default Team;
