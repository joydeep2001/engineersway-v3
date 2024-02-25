import Link from "next/link";
import Image from "next/image";
// import { gsap } from "gsap";
import { TweenMax, gsap, Power2, Power4, TimelineLite, TweenLite } from "gsap";
// import { TweenLite } from "gsap/gsap-core";
import { useRef, useEffect } from "react";
const Hero = () => {
  const bannerHead = useRef();
  useEffect(() => {
    console.log(bannerHead);
    gsap.timeline({ ease: Power4 });
    // gsap.to(bannerHead.current, {'clip-path':'polygon(0% 100%,100% 100%,100% 0%, 0% 0%', duration:1.2,opacity:1,y:0})
  }, []);

  return (
    <>
      <div
        id="Hero"
        className="w-full md:px-5 pt-10 relative hero h-full m-0  font-Mont overflow-hidden dark:bg-black-bg1 bg-slate-50"
      >
        <img src="images/circles2.png" alt="" className="absolute c1" />
        <img src="images/circles.png" alt="" className="absolute c2" />
        <div className="heroWrap lg:flex container md:px-5 mx-auto py-5 justify-between">
          <div className="heroContent  relative my-auto">
            <h2
              ref={bannerHead}
              className="text-5xl xl:text-6xl 2xl:text-large  font-bold mb-5 leading-relaxed dark:text-slate-50"
            >
              Experience
              <span className=""> Machinery </span>
              <br></br> in a Whole <span className="">New Dimension</span>
            </h2>
            <p className="font-medium  mb-8 w-full font-Mont text-xl leading-normal dark:text-slate-50">
              Experience the thrill of deconstructing machinery virtually,
              fostering a deeper connection with industrial technology.<br></br>{" "}
              Ignite your curiosity and master the mechanics behind innovation.
            </p>
            <div>
              <Link href="/model_list">
                <div class="vBtn justify-center inline-block items-center dark:bg-transparent dark:border-2 border-purple-600 dark:hover:bg-fuchsia-600/20 transition transform">
                  <h5 class=" text-purple-600 font-bold dark:text-slate-50 dark:hover:shadow-fuchsia-600/10 dark:shadow-fuchsia-600/40">
                    Explore 3D Models
                  </h5>
                  <div className="bArrow">
                    <img src="images/angle-right.png" alt="" />
                  </div>
                </div>
              </Link>
            </div>
          </div>
          <div className="heroImage relative my-auto mx-0 md:mx-0">
            <figure>
              {/* <img
                src="images/transformerHero.png"
                alt=""
                className="drop-shadow-2xl"
              /> */}
              <div
                style={{
                  height: "600px",
                  width: "1200px",
                  background: "#000000",
                }}
              >
                <iframe
                  src="https://my.spline.design/untitled-81704e862c50d809b961c15ecce1faea/"
                  frameborder="0"
                  width="100%"
                  height="100%"
                ></iframe>
              </div>
            </figure>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
