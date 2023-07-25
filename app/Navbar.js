import { Link } from "react-scroll";
import NavLink from "next/link";
import { FaSignOutAlt } from "react-icons/fa";
import { AppContext } from "../context/AppContext";
import { useContext, useState, useRef, useEffect } from "react";
import Router from "next/router";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";
import { useTheme } from "next-themes";

function logout(setLoggedIn) {
  localStorage.removeItem("authStatus");
  document.cookie = "authToken=; max-age=-1";
  setLoggedIn(false);
  Router.push("/");
}

const Navbar = ({ toggle }) => {
  const navRef = useRef();
  const { systemTheme, theme, setTheme } = useTheme();
  const renderThemeChanger = () => {
    const currentTheme = theme === "system" ? systemTheme : theme;
    if (currentTheme === "dark") {
      return (
        <SunIcon
          className="w-7 h-7"
          role="button"
          onClick={() => setTheme("light")}
        />
      );
    }
    return (
      <MoonIcon
        className="w-7 h-7"
        role="button"
        onClick={() => setTheme("dark")}
      />
    );
  };

  useState(() => {
    if (typeof window === "undefined") return;
    //function
    window.addEventListener("scroll", () => {
      //console.log("fire");

      if (navRef.current) {
        if (window.scrollY > 0) {
          navRef.current.classList.add("shadow-lg");
          navRef.current.classList.add("dark:bg-gray-900");
          navRef.current.classList.remove("bg-transparent");
          navRef.current.classList.remove("dark:bg-transparent");
        } else if (window.scrollY == 0) {
          navRef.current.classList.remove("shadow-lg");
          navRef.current.classList.remove("dark:bg-gray-900");
          navRef.current.classList.add("dark:bg-transparent");
          navRef.current.classList.add("bg-transparent");
        }
      }
    });
    return () => window.removeEventListener("scroll");
  }, []);
  let { loggedIn, setLoggedIn, loading } = useContext(AppContext);

  return (
    <nav
      ref={navRef}
      className="flex justify-between items-center h-16  bg-white-1 dark:bg-transparent dark:shadow-fuchsia-600/10   font-Montserrat
          w-full fixed z-10 px-5 transition delay-150 ease-in-out"
    >
      <div className="cursor-pointer flex ">
        <div onClick={toggle}>
          <svg
            className="w-6 h-6 lg:hidden justify-center items-center dark:text-slate-50 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M4 6h16M4 12h16M4 18h7"></path>
          </svg>
        </div>
        <div className="w-1/3  h-1/3">
          <img src="/images/logo.png"></img>
        </div>

        {/* <div className='hidden   md:block   w-1/3 h-1/3'>
            <img src='/images/logo_text.png' ></img>
            </div> */}
      </div>

      <div className="pr-8 flex">
        <div className=" hidden lg:flex font-semibold  rounded-lg font-Mont text-black-bg dark:text-slate-50 ">
          <div className="p-4 cursor-pointer nav-hover hover:text-pink-600 dark:hover:text-fuchsia-600 transition transform">
            <Link to="Hero" spy={true} smooth={true} offset={50} duration={500}>
              Home
            </Link>
          </div>
          <div className="p-4 cursor-pointer nav-hover hover:text-pink-600 dark:hover:text-fuchsia-600 transition transform">
            <Link
              
              to="About"
              spy={true}
              smooth={true}
              offset={-100}
              duration={500}
            >
              About us
            </Link>
          </div>
          <div className="p-4 cursor-pointer nav-hover hover:text-pink-600 dark:hover:text-fuchsia-600 transition transform">
            <Link
              to="Work"
              spy={true}
              smooth={true}
              offset={-50}
              duration={1000}
            >
              Our Work
            </Link>
          </div>
          <div className="p-4 cursor-pointer nav-hover hover:text-pink-600 dark:hover:text-fuchsia-600 transition transform">
            <Link
              to="Team"
              spy={true}
              smooth={true}
              offset={-50}
              duration={500}
            >
              Our Team
            </Link>
          </div>

          {/* <div className="p-4 nav-hover">
            <NavLink href="/"> Study Materials</NavLink>
          </div>
          <div className="p-4 nav-hover">
            <NavLink href="/blog/"> Blogs </NavLink>
          </div> */}
        </div>
      </div>
      <div className="navButtons flex gap-4 justify-between items-center font-Mont font-semibold">
        {/* {!loading && renderThemeChanger()} */}
        {!loggedIn ? (
          <div className="">
            <NavLink href="/Login">
              <div
                className="hover:cursor-pointer px-4 py-2 sm:px-8 sm:py-2  border-2 border-purple-600 transition transform  text-black-bg bg-white rounded-3xl hover:bg-purple-600 hover:text-white-1
          dark:text-slate-50 dark:bg-transparent dark:border-2 dark:border-
              dark:hover:bg-fuchsia-600/20 dark:hover:shadow-fuchsia-600/10 dark:shadow-fuchsia-600/40"
              >
                Login
              </div>
            </NavLink>
          </div>
        ) : (
          ""
        )}

        {loggedIn ? (
          <div
            className="hover:cursor-pointer  px-4 py-2 sm:px-8 sm:py-2  border-2 border-purple-600 transition transform  text-black-bg bg-white rounded-3xl hover:bg-purple-600 hover:text-white-1
          dark:text-slate-50 dark:bg-transparent dark:border-2 dark:border-
              dark:hover:bg-fuchsia-600/20 dark:hover:shadow-fuchsia-600/10 dark:shadow-fuchsia-600/40"
            onClick={() => logout(setLoggedIn)}
          >
            Logout
            {/* <FaSignOutAlt /> */}
          </div>
        ) : (
          ""
        )}
      </div>
    </nav>
  );
};

export default Navbar;
