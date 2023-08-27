"use client";
import Head from "next/head";
import Link from "next/dist/client/link";
import Hero from "./Hero";
import course from "./Course";
import Navbar from "./Navbar";
import Dropdown from "./Dropdown";
import { Element } from "react-scroll";
import Aboutus from "./AboutUs";
import Explore from "./Explore";
import Team from "./Team";
import React, { useState, useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import Footer from "./Footer";
import ScrollToTop from "react-scroll-to-top";
import { isMaintenanceMode } from "../context/AppContext";
import { ThemeProvider } from "next-themes";
import Background from "./background";

const Index = () => {
  const [isOpen, setIsOpen] = useState(false);

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
  if (isMaintenanceMode) {
    return (
      <>
        <Head>
          <title>Engineer&apos;s Way </title>
          <meta charSet="UTF-8" />
          <meta
            name="description"
            content="A platform for Engineering students where they can see internal construction of each and every machine how they are made (i.e induction motor, transformer, Bluetooth headphone) and CS students can code and see the animation of the code working live."
          />
          <meta name="keywords" content="Engineering,3D,Programming,C,Motor" />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9414302164408629"
            crossOrigin="anonymous"
          ></script>
        </Head>
        <img src="images/logo.png" height="60px" width="60px" className="m-5" />
        <div className="h-screen w-screen flex flex-col items-center  m-5 p-5">
          <img src="images/maintenance.webp" height="400px" width="400px" />
          <strong>
            We are currently under{" "}
            <span className="text-red-800">maintenance</span>, sorry for the
            inconvenience.{" "}
            <span className="text-green-800">We will be back soon!</span>
          </strong>
        </div>
      </>
    );
  }
  return (
    <>
      <Head>
        <title>Engineer&apos;s Way | Home </title>
        <meta charSet="UTF-8" />
        <meta
          name="description"
          content="A platform for Engineering students where they can see internal construction of each and every machine how they are made (i.e induction motor, transformer, Bluetooth headphone) and CS students can code and see the animation of the code working live."
        />
        <meta name="keywords" content="Engineering,3D,Programming,C,Motor" />
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9414302164408629"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <div className="w-full h-full m-0 p-0 overflow-x-hidden">
        <div className="overflow-hidden">
          <Navbar toggle={toggle} classname="fixed" />
          <Dropdown isOpen={isOpen} toggle={toggle} />
          <Hero />
          {/* <Element name="Body">
          <Body className="sticky" />
        </Element> */}
          {/* <div data-aos="fade-up">
          <Element name="Course">
            <Aboutus />
          </Element>
        </div> */}
          <Aboutus />
          <Explore />
          <Team />
          <div className="">
            <ScrollToTop smooth color="#ff7b01" width="38" />
          </div>
          <Background />
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Index;
