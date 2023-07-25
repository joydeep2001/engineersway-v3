import Dropdown from "./Dropdown";
import Navbar from "./Navbar";
import { useState, useEffect, useRef, useCallback } from "react";
import Footer from "./Footer";
import Link from "next/dist/client/link";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
} from "react-icons/fa";
import Head from "next/head";
// import { gsap } from "gsap";
import CustomAos from "@/components/CustomAos";
import Video from "@/components/Video";
import AOS from "aos";
import "aos/dist/aos.css";
import { useTheme } from "next-themes";

const AboutUs = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  const { systemTheme, theme, setTheme } = useTheme();
  console.log("theme: ", theme);
  const aboutSection = useRef();
  const bulb = useRef();
  const ethics = useRef();
  const [isOpen, setIsOpen] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  // const [open,rotate] = useState(false)
  const toggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const hideMenu = () => {
      if (window.innerWidth > 1024 && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", hideMenu);
    return () => {
      window.removeEventListener("resize", hideMenu);
    };
  });
  const [localLightTheme, setLocalLightTheme] = useState(false);
  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   if (theme === "dark")
  //     aboutSection.current.classList.add("black-to-orange-grad");
  //   else aboutSection.current.classList.remove("black-to-orange-grad");
  // }, [theme]);
  return (
    <>
      <div
        id="About"
        ref={aboutSection}
        className="w-full md:px-5 relative about h-full m-0  font-Mont overflow-hidden bg-slate-50
        dark:bg-black-bg1 about"
      >
        <img
          ref={bulb}
          src="images/BULB.png"
          alt=""
          className="absolute  abs1 drop-shadow-2xl"
        />
        <CustomAos
          ethics={ethics}
          bulb={bulb}
          changeLocalLightTheme={setLocalLightTheme}
          imgsrc="images/gear-icon-2.png"
          height={""}
          width={""}
          options={{
            start: { x: -50, y: 640 },
            stop: () => {
              if (typeof window === "undefined")
                return {
                  x: 0,
                  y: 0,
                };
              return {
                x: aboutSection.current.offsetWidth + 50,
                y: aboutSection.current.offsetHeight + 640,
              };
            },
            rotate: true,
            speedTune: 1.5,
          }}
        />

        <div className="aboutWrap lg:flex container md:px-5 mx-auto my-5">
          <div className="imageSec flex justify-center items-center flex-col lg:flex-row">
            {showVideo && (
              <Video
                src=""
                hideVideo={() => {
                  setShowVideo(false);
                }}
              />
            )}
            <div
              // onClick={() => setShowVideo(false)}
              className="image1 shadow-yellow1 dark:shadow-4xl video mt-7 lg:my-auto cursor-pointer overflow-hidden rounded-lg relative"
            >
              <figure>
                <img src="images/Shunt.png" alt="" className="h-full w-full" />
              </figure>
              {/* <a id="play-video" className="video-play-button z-0">
                <span></span>
              </a> */}

              <div id="video-overlay" className="video-overlay">
                <a className="video-overlay-close">&times;</a>
              </div>
            </div>
          </div>
          <div
            className="aboutContent  sm:pt-10 sm:pb-32  lg:mt-0 lg:ml-7 xl:ml-6 2xl:ml-56 md:text-left lg:text-right
          dark:text-slate-50"
          >
            <h3 className="text-5xl mb-5  font-bold" data-aos="fade-left">
              What We Do
            </h3>
            <p className="text-lg font-semibold font-Mont" data-aos="fade-left">
              Engineers Way is a project to make machine more understandable.
              Anyone can experience the details of any kind of machines to
              analyze how they are made and how they work.
            </p>
            <p
              className="text-lg font-semibold font-Mont mt-4"
              data-aos="fade-left"
            >
              It contains as simple as a kitkat fuse to as detailed as a
              transformer. It contains as simple working principle of wire in
              between magnets to as complex as DC Shunt Motor
            </p>
            <p
              className="text-lg phide 2xl:block font-semibold font-Mont mt-7"
              data-aos="fade-left"
            >
              In this paragraph there contains nothing fancy.It just to fill the
              white space to look the website good.It is just a dummy
              text,nothing else.Check out 3D models to know what we are doing.
            </p>
          </div>
        </div>
      </div>
      <div
        ref={ethics}
        className="ethics  md:px-5  w-full h-full  m-0 p-0 font-Mont overflow-hidden  bg-yellow-1
        dark:bg-black-bg1 text-black-bg"
      >
        <div className="eWrap transition container md:px-5 mx-auto my-5 lg:flex md:justify-between">
          <div
            className={`contentEach  relative overflow-hidden  bg-white-1 lg:w-80  ml-0 my-4   rounded-2xl shadow-md
          ${localLightTheme ? "" : "dark:bg-slate-800 dark:shadow-4xl"}`}
            data-aos="fade-up"
            data-aos-duration="500"
          >
            <div className="content flex flex-col justify-center items-center py-8 px-4">
              <figure className="mb-3">
                <img src="images/light-bulb.png" alt="" />
              </figure>
              <h4
                className={`text-purple-600 font-bold text-2xl mb-2 ${
                  localLightTheme ? "" : "dark:text-fuchsia-600"
                }`}
              >
                Vision
              </h4>
              <p
                className={`text-lg font-semibold ${
                  localLightTheme ? "" : "dark:text-slate-50"
                }  text-center`}
              >
                To become largest Ed-Tech Platform for Engineering Stuents by
                providing them Best{" "}
                <span
                  className={`text-purple-600 ${
                    localLightTheme ? "" : "dark:text-fuchsia-600"
                  }`}
                >
                  Interactive Videos
                </span>
                ,{" "}
                <span
                  className={`text-purple-600 ${
                    localLightTheme ? "" : "dark:text-fuchsia-600"
                  }`}
                >
                  Labs
                </span>
                ,
                <span
                  className={`text-purple-600 ${
                    localLightTheme ? "" : "dark:text-fuchsia-600"
                  }`}
                >
                  Practicals
                </span>{" "}
                and{" "}
                <span
                  className={`text-purple-600 ${
                    localLightTheme ? "" : "dark:text-fuchsia-600"
                  }`}
                >
                  Interactive 3D models
                </span>
              </p>
            </div>
          </div>
          <div
            className={`contentEach  relative overflow-hidden  bg-white-1 lg:w-80  ml-0 my-4   rounded-2xl shadow-md
            ${localLightTheme ? "" : "dark:bg-slate-800 dark:shadow-4xl"}`}
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            <div className="content flex flex-col justify-center items-center py-8 px-4">
              <figure className="mb-3">
                <img src="images/target.png" alt="" />
              </figure>
              <h4
                className={`text-purple-600 font-bold text-2xl mb-2 ${
                  localLightTheme ? "" : "dark:text-fuchsia-600"
                }`}
              >
                Mission
              </h4>
              <p
                className={`text-lg font-semibold ${
                  localLightTheme ? "" : "dark:text-slate-50"
                } text-center`}
              >
                To Make Engineering Students More{" "}
                <span
                  className={`text-purple-600 ${
                    localLightTheme ? "" : "dark:text-fuchsia-600"
                  }`}
                >
                  Proeffiecient
                </span>
                , More{" "}
                <span
                  className={`text-purple-600 ${
                    localLightTheme ? "" : "dark:text-fuchsia-600"
                  }`}
                >
                  Curious
                </span>
                ,More{" "}
                <span
                  className={`text-purple-600 ${
                    localLightTheme ? "" : "dark:text-fuchsia-600"
                  }`}
                >
                  Analytical
                </span>
              </p>
            </div>
          </div>
          <div
            className={`contentEach  relative overflow-hidden  bg-white-1 lg:w-80  ml-0 my-4   rounded-2xl shadow-md
            ${localLightTheme ? "" : "dark:bg-slate-800 dark:shadow-4xl"}`}
            data-aos="fade-up"
            data-aos-duration="1500"
          >
            <div className="content flex flex-col justify-center items-center py-8 px-4">
              <figure className="mb-3">
                <img src="images/quality.png" alt="" />
              </figure>
              <h4
                className={`text-purple-600 ${
                  localLightTheme ? "" : "dark:text-fuchsia-500"
                } font-bold text-2xl mb-2`}
              >
                Values
              </h4>
              <p className="text-lg font-semibold text-center">
                <span
                  className={`${localLightTheme ? "" : "dark:text-slate-50"}`}
                >
                  {" "}
                  Innovation |
                </span>
                <span
                  className={`${localLightTheme ? "" : "dark:text-slate-50"}`}
                >
                  {" "}
                  Interactive |
                </span>
                <span
                  className={`${localLightTheme ? "" : "dark:text-slate-50"}`}
                >
                  {" "}
                  Engaging |
                </span>
                <span
                  className={`${localLightTheme ? "" : "dark:text-slate-50"}`}
                >
                  {" "}
                  Quality
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutUs;
