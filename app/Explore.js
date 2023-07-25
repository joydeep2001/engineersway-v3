"use client";
import React, { useEffect, useContext } from "react";
import Slider from "react-slick";
import useFetch from "@/hooks/useFetch";
import Router from "next/router";
import { AppContext } from "../context/AppContext";
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
    autoplay: false,
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
        <div className="exWrap xl:container sm:px-8 lg:px-5 sm:mx-auto  mt-16">
          <div className="sm:flex items-center justify-between">
            <div className="lg:mb-0">
              <h3
                className="text-5xl  font-bold dark:text-slate-50"
                data-aos="fade-right"
              >
                Explore 3D Models
                <span className="relative text-white  z-0"> </span>
              </h3>
            </div>
            <a href={"/model_list"}>
              <div
                className="vBtn justify-center inline-block  items-center dark:bg-transparent dark:border-2 border-purple-600
              dark:hover:bg-fuchsia-600/20 transition transform"
              >
                <h5 className=" text-purple-600  font-bold dark:text-slate-50 dark:hover:shadow-fuchsia-600/10 dark:shadow-fuchsia-600/40">
                  View All
                </h5>
              </div>
            </a>
          </div>
          {/* <Slider {...settings}>
            <div className="modelSlide">
              <div className="modelWrapE  justify-between grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="leftmodelW">
                  <h4>Dismantle Machines</h4>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Dolore, sequi nesciunt illo, ipsum voluptatem temporibus
                    perspiciatis optio dolores placeat, laborum nam! Harum
                    reprehenderit distinctio excepturi eligendi enim commodi,
                    voluptatem ratione.
                  </p>
                </div>
                <div className="centerModelW">
                  <div className="modelImgC mb-14">
                    <img
                      src="images/transformerHero.png"
                      alt=""
                      className="drop-shadow-2xl"
                    />
                  </div>
                  <Link href="/model_pages/Transformer">
                    <div className="modelExpbtn flex justify-center cursor-pointer btn-second px-8 py-4 shadow-md dark:shadow-3xl dark:hover:shadow-orange-500/10 dark:shadow-orange-500/30 rounded-2xl">
                      View Model
                    </div>
                  </Link>
                </div>
                <div className="rightModelW">
                  <h5>Transformer</h5>
                  <p className="mb-8">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Asperiores magni deleniti natus vero nostrum saepe, autem
                    aut nesciunt minima impedit unde sunt esse ducimus iste
                    suscipit repudiandae quasi temporibus corrupti!
                  </p>
                  <div className="mFeature flex justify-between">
                    <div className="eachf">
                      <img src="images/featureIcon.png" alt="" />
                      <p>lorem nehvfeguhbg hcebvvewfv</p>
                    </div>
                    <div className="eachf">
                      <img src="images/featureIcon.png" alt="" />
                      <p>lorem nehvfeguhbg hcebvvewfv</p>
                    </div>
                    <div className="eachf">
                      <img src="images/featureIcon.png" alt="" />
                      <p>lorem nehvfeguhbg hcebvvewfv</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modelSlide">
              <div className="modelWrapE  justify-between grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="leftmodelW">
                  <h4>Dismantle Machines</h4>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Dolore, sequi nesciunt illo, ipsum voluptatem temporibus
                    perspiciatis optio dolores placeat, laborum nam! Harum
                    reprehenderit distinctio excepturi eligendi enim commodi,
                    voluptatem ratione.
                  </p>
                </div>
                <div className="centerModelW">
                  <div className="modelImgC mb-14">
                    <img
                      src="images/alternator1.png"
                      alt=""
                      className="drop-shadow-2xl"
                    />
                  </div>
                  <Link href="/model_pages/Alternator">
                    <div className="modelExpbtn flex justify-center cursor-pointer btn-second px-8 py-4 shadow-md dark:shadow-3xl dark:hover:shadow-orange-500/10 dark:shadow-orange-500/30 rounded-2xl">
                      View Model
                    </div>
                  </Link>
                </div>
                <div className="rightModelW">
                  <h5>Alternator</h5>
                  <p className="mb-8">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Asperiores magni deleniti natus vero nostrum saepe, autem
                    aut nesciunt minima impedit unde sunt esse ducimus iste
                    suscipit repudiandae quasi temporibus corrupti!
                  </p>
                  <div className="mFeature flex justify-between">
                    <div className="eachf">
                      <img src="images/featureIcon.png" alt="" />
                      <p>lorem nehvfeguhbg hcebvvewfv</p>
                    </div>
                    <div className="eachf">
                      <img src="images/featureIcon.png" alt="" />
                      <p>lorem nehvfeguhbg hcebvvewfv</p>
                    </div>
                    <div className="eachf">
                      <img src="images/featureIcon.png" alt="" />
                      <p>lorem nehvfeguhbg hcebvvewfv</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modelSlide">
              <div className="modelWrapE  justify-between grid grid-cols-1 xl:grid-cols-3 gap-4">
                <div className="leftmodelW">
                  <h4>Dismantle Machines</h4>
                  <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Dolore, sequi nesciunt illo, ipsum voluptatem temporibus
                    perspiciatis optio dolores placeat, laborum nam! Harum
                    reprehenderit distinctio excepturi eligendi enim commodi,
                    voluptatem ratione.
                  </p>
                </div>
                <div className="centerModelW">
                  <div className="modelImgC mb-14">
                    <img
                      src="images/variac1.png"
                      alt=""
                      className="drop-shadow-2xl"
                    />
                  </div>
                  <Link href="model_pages/Variac">
                    <div className="modelExpbtn flex justify-center cursor-pointer btn-second px-8 py-4 shadow-md dark:shadow-3xl dark:hover:shadow-orange-500/10 dark:shadow-orange-500/30 rounded-2xl">
                      View Model
                    </div>
                  </Link>
                </div>
                <div className="rightModelW">
                  <h5>Variac</h5>
                  <p className="mb-8">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Asperiores magni deleniti natus vero nostrum saepe, autem
                    aut nesciunt minima impedit unde sunt esse ducimus iste
                    suscipit repudiandae quasi temporibus corrupti!
                  </p>
                  <div className="mFeature flex justify-between">
                    <div className="eachf">
                      <img src="images/featureIcon.png" alt="" />
                      <p>lorem nehvfeguhbg hcebvvewfv</p>
                    </div>
                    <div className="eachf">
                      <img src="images/featureIcon.png" alt="" />
                      <p>lorem nehvfeguhbg hcebvvewfv</p>
                    </div>
                    <div className="eachf">
                      <img src="images/featureIcon.png" alt="" />
                      <p>lorem nehvfeguhbg hcebvvewfv</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Slider> */}

          <div>
            <Slider {...settings} className="flex">
              {!loading
                ? data.map(
                    ({ _id, coursename, image, link, paragraphs, points }) => {
                      if (paragraphs && points)
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
                                  className="modelExpbtn flex justify-center cursor-pointer btn-second px-8 py-4 shadow-md dark:shadow-3xl dark:hover:shadow-orange-500/10 dark:shadow-orange-500/30 rounded-2xl"
                                  href={link}
                                >
                                  <div>View Model</div>
                                </a>
                              </div>
                              <div className="rightModelW">
                                <h5>{coursename}</h5>
                                <p className="mb-8">{paragraphs[0]}</p>
                                <div className="mFeature flex flex-col">
                                  <div className="eachf">
                                    <img src="images/featureIcon.png" alt="" />
                                    <p>
                                      <span className="pointHead">
                                        {points[0].title}
                                      </span>
                                      {points[0].description}
                                    </p>
                                  </div>
                                  <div className="eachf">
                                    <img src="images/featureIcon.png" alt="" />
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
    </>
  );
};
export default Explore;
