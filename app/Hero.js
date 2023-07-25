"use client";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <>
      <div
        id="Hero"
        className="w-full md:px-5 pt-10 relative hero h-full m-0  font-Mont overflow-hidden dark:bg-black-bg1 bg-slate-50"
      >
        <img src="images/circles2.png" alt="" className="absolute c1" />
        <img src="images/circles.png" alt="" className="absolute c2" />
        <div className="heroWrap lg:flex container md:px-5 mx-auto my-5 justify-between">
          <div className="heroContent  relative my-auto">
            <h2 className="text-5xl xl:text-6xl 2xl:text-large  font-bold mb-5 leading-relaxed dark:text-slate-50">
              Let&apos;s Explore
              <br />
              <span className="text-purple-600 dark:text-purple-600">
                Machines
              </span>
              <br></br>like never before
            </h2>
            <p className="font-medium  mb-8 w-full font-Mont text-xl leading-normal dark:text-slate-50">
              It is a replacement from your old boring lectures and 2D black and
              white<br></br> diagrams to 3D models which will help and analyze
              machines better
            </p>
            <div>
              <Link href="/model_list">
                <div className="cursor-pointer btn-second px-8 py-4 shadow-md dark:shadow-3xl dark:hover:shadow-orange-500/10 dark:shadow-orange-500/30 rounded-2xl">
                  Explore 3D Models
                </div>
              </Link>
            </div>
          </div>
          <div className="heroImage relative my-auto mx-0 md:mx-0">
            <figure>
              <img
                src="images/transformerHero.png"
                alt=""
                className="drop-shadow-2xl"
              />
            </figure>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
