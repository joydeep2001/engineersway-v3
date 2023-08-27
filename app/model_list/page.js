"use client";

// import Image from 'next/image'
import Footer from "../Footer";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import useFetch from "@/hooks/useFetch";
import Router from "next/navigation";
import { AppContext } from "@/context/AppContext";
import SkeletonCardLoader from "../SkeletonCardLoader";
import Warning from "@/components/Warning";
import Background from "../background";

const ModelList = () => {
  let { serverURL } = useContext(AppContext);

  const [isOpen, setIsOpen] = useState(false);
  const [showWarning, setShowWarning] = useState(false);

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
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    console.log("data", data);
    console.log("error", error);

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

  const handleClick = (e) => {
    console.log(e.target.id);
    const id = e.target.id;
    const clickedModel = data.filter((model) => model._id === id)[0];
    Router.push(`/${clickedModel.link}`);
    return;
    /*warning for big file size disabled*/
    if (clickedModel.size > 100) {
      setShowWarning(clickedModel);
    } else {
      Router.push(`/${clickedModel.link}`);
    }
  };

  const handleBack = () => {
    setShowWarning(false);
  };

  return (
    <>
      <div className="w-full h-full m-0 p-0 overflow-x-hidden font-Mont dark:bg-black-bg1">
        {showWarning && <Warning onBack={handleBack} modelInfo={showWarning} />}
        {/* <Navbar toggle={toggle} classname="fixed" />
        <Dropdown isOpen={isOpen} toggle={toggle} /> */}
        {/* content */}
        <div>
          <div>
            <div className="heroWrap container lg:flex md:px-5 mx-auto my-5 justify-between ">
              <div className="heroContent relative my-auto">
                <h2 className="text-5xl xl:text-6xl 2xl:text-large  font-bold mb-5 leading-relaxed dark:text-slate-50">
                  Unveiling the World of <span className="">Machinery</span>{" "}
                  <br></br>
                </h2>
                <p className="font-medium mb-8 w-full font-Mont text-xl leading-normal dark:text-slate-50">
                  Unlocking the hidden mechanisms of industry through
                  captivating 3D insights.
                  <br></br>
                </p>
                <div>
                  <Link href="/">
                    <div className="vBtn justify-center inline-block items-center dark:bg-transparent dark:border-2 border-purple-600 dark:hover:bg-fuchsia-600/20 transition transform">
                      Back to Home
                    </div>
                  </Link>
                </div>
              </div>
              <div className="heroImage heroImagewrap2 relative my-auto mx-0 md:mx-0">
                <figure>
                  <img
                    src="/images/model_hero.png"
                    alt=""
                    className="drop-shadow-2xl"
                  />
                </figure>
              </div>
            </div>
          </div>

          {/* <div className="w-full md:px-5  relative hero h-full m-0  font-Mont overflow-hidden dark:bg-black-bg1 bg-slate-50">
            <img src="" className="mx-auto"></img>
          </div> */}
          {error && "Error!"}
          <div className="container prWrapI">
            <div className="bg-slate-100 py-3 dark:bg-black-bg1">
              <div className="sm:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {loading &&
                  [1, 2, 3, 4, 5, 6].map((el) => (
                    <SkeletonCardLoader key={el} />
                  ))}
                {data.map?.(({ _id, coursename, image, link, published }) => {
                  if (!published) return <></>;
                  return (
                    <div key={_id} className="eaChCardP dark:bg-slate-800">
                      <div className="pdImg">
                        <img src={image} alt="" />
                      </div>
                      <div className="cardDetailsPr">
                        <h4 className="text-center">{coursename}</h4>
                        <Link href={link}>
                          <div className="vBtn justify-center inline-block items-center dark:bg-transparent dark:border-2 border-purple-600 dark:hover:bg-fuchsia-600/20 transition transform">
                            Watch Now
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          <Background />
        </div>
        <Footer />
      </div>
    </>
  );
};
export default ModelList;
