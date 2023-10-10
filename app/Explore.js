import React, { useEffect, useContext } from "react";
import Slider from "react-slick";
import useFetch from "@/hooks/useFetch";
import Router from "next/router";
import { AppContext } from "@/context/AppContext";
import Link from "next/link";
import SkeletonCardLoader from "@/components/SkeletonCardLoader";
import AOS from "aos";
import "aos/dist/aos.css";

const Explore = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  let { serverURL } = useContext(AppContext);
  const options = {
    method: "GET",
    credentials: "include",
    header: {
      "Content-Type": "application/json",
    },
  };
  const {
    loading,
    error,
    data = [],
  } = useFetch(`${serverURL}/3dmodels.json`, options, []);

  var settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    autoplaySpeed: 4000,
    responsive: [
      {
        breakpoint: 1536,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1440,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
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
        },
      },
      {
        breakpoint: 420,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };
  useEffect(() => {
    console.log(data);
  });
  const handleClick = (e) => {
    console.log(e.target.id);
    const id = e.target.id;
    const clickedModel = data.filter((model) => model._id === id)[0];
    Router.push(`/${clickedModel.link}`);
    return;
  };

  return (
    <>
      <div
        id="Work"
        className="w-full md:px-5  h-full  m-0 p-0 overflow-hidden font-Mont bg-white-1
        dark:bg-black-bg1"
      >
        <div className="exWrap ">
          <div className="container  md:px-5 mx-auto">
            <div>
              <Slider {...settings} className="flex">
                {!loading
                  ? data.map(
                      ({
                        _id,
                        coursename,
                        image,
                        link,
                        paragraphs,
                        points,
                        published,
                      }) => {
                        if (published && paragraphs && points)
                          return (
                            <div key={_id} className="modelSlide">
                              <div className="modelWrapE  justify-between grid grid-cols-1 xl:grid-cols-3 gap-4">
                                <div className="leftmodelW">
                                  <h4>Dismantle Machines</h4>
                                  <p>
                                    Have a better view of this machine. Watch
                                    internal construction and other details.
                                  </p>
                                </div>
                                <div className="centerModelW">
                                  <div className="modelImgC mb-14">
                                    <img
                                      src={image}
                                      alt=""
                                      className="drop-shadow-2xl"
                                    />
                                  </div>
                                  <a
                                    className="vBtn justify-center  items-center dark:bg-transparent dark:border-2 border-purple-600 dark:hover:bg-fuchsia-600/20 transition transform mx-auto my-0 flex"
                                    href={link}
                                  >
                                    <h5 class=" text-purple-600 font-bold dark:text-slate-50 dark:hover:shadow-fuchsia-600/10 dark:shadow-fuchsia-600/40">
                                      View Model
                                    </h5>
                                    <div className="bArrow">
                                      <img
                                        src="images/angle-right.png"
                                        alt=""
                                      />
                                    </div>
                                  </a>
                                </div>
                                <div className="rightModelW">
                                  <h5>{coursename}</h5>
                                  <p className="mb-8">{paragraphs[0]}</p>
                                  <div className="mFeature flex flex-col">
                                    <div className="eachf">
                                      <img
                                        src="images/featureIcon.png"
                                        alt=""
                                      />
                                      <p>
                                        <span className="pointHead">
                                          {points[0].title}
                                        </span>
                                        {points[0].description}
                                      </p>
                                    </div>
                                    <div className="eachf">
                                      <img
                                        src="images/featureIcon.png"
                                        alt=""
                                      />
                                      <p>
                                        <span className="pointHead">
                                          {points[1].title}
                                        </span>
                                        {points[1].description}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                      }
                    )
                  : [1, 2, 3, 4, 5, 6].map((el) => (
                      <SkeletonCardLoader key={el} />
                    ))}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Explore;
