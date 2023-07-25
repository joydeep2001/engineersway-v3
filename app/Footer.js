"use client";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaPaperPlane,
  FaCopyright,
} from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
  return (
    // footer-container
    <footer className="bg-black-bg w-full h-full mx-0 py-0 overflow-x-hidden  font-Mont">
      <div className="container footer sm:px-8 lg:px-20 2xl:mx-auto  mt-5 mb-10 text-white-1">
        <div className="h-full justify-center py-8  flex flex-col md:flex-row md:justify-between items-center">
          {/* Text container */}

          <div className=" flex flex-col justify-center items-center lg:items-start ">
            <div className="text-yellow-1 mb-5 font-bold text-sm md:text-lg lg:text-2xl ">
              Leave Boring Lectures
            </div>
            <div className="text-white-1 font-bold text-xl md:text-2xl lg:text-4xl">
              Start Using Our Platform <br></br>
              <span className="before:block before:absolute mt-2 before:-inset-1 before:-skew-y-3 before:bg-yellow-1 relative inline-block">
                <span className="relative text-white">Today</span>
              </span>
            </div>
            {/*Feedback input box*/}
            <div className="flex flex-col justify-center items-center md:items-start">
              <div className="relative mt-4">
                {/* <input
              className="border-b-2  border-yellow-500 bg-transparent outline-none text-yellow-1 font-medium placeholder-gray-500 pl-6 pr-4 py-1    "
              placeholder="Give Your Feedback!"
              type="text"
            />
            <span className="absolute flex inset-y-0 items-center  ">
              <FaPaperPlane className="text-yellow-1" />
            </span> */}
              </div>
              <div>
                <Link href="https://wduk1omhss3.typeform.com/to/CUx6uCDO">
                  <button className="btn-second mt-4 py-2 rounded-2xl dark:shadow-3xl dark:hover:shadow-orange-500/10 dark:shadow-orange-500/30">
                    Click To Give Feedback!
                  </button>
                </Link>
              </div>
            </div>
          </div>
          <div className="">
            <div className=" my-4 ">
              <div className="text-yellow-1 font-medium text-sm md:text-lg lg:text-xl ">
                Follow Us on
              </div>
              <ul className="flex mt-2 uppercase gap-12 text-xs md:text-lg font-medium">
                <li className="cursor-pointer text  text-icon-hover ">
                  <Link href="https://www.facebook.com/Engineers-Way-111504914806651">
                    <FaFacebook className="text-yellow-1" />
                  </Link>
                </li>
                <li className="cursor-pointer  text-icon-hover">
                  <Link href="https://www.instagram.com/engineerswayofficial/">
                    <FaInstagram className="text-yellow-1" />
                  </Link>
                </li>
                <li className="cursor-pointer text-icon-hover">
                  <Link href="https://www.linkedin.com/company/engineerer-s-way/">
                    <FaLinkedin className="text-yellow-1" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex sm:flex-row gap-x-8 justify-center items-center ">
          <div className="text-white-1  pb-2 flex flex-row gap-x-2 overflow-visible">
            <FaCopyright />
            2022.Engineersway.com. All rights reserved
          </div>
          <div>
            <ul className="flex  justify-center text-white-1 uppercase gap-12 text-xs font-medium">
              <Link href="/Privacypolicy">
                <li className="cursor-pointer text-icon-hover">
                  Privacy policy
                </li>
              </Link>
              <Link href="/Disclaimer">
                <li className="cursor-pointer text-icon-hover">Disclaimer</li>
              </Link>
              <Link href="/Tos">
                <li className="cursor-pointer text-icon-hover">
                  Terms of Services
                </li>
              </Link>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
