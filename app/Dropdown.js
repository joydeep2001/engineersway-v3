import { Link } from "react-scroll";
import NavLink from "next/link";
import react,{useState} from "react";
import { Switch } from "@headlessui/react";

const Dropdown = ({ isOpen, toggle }) => {
  //console.log("isOpen", isOpen);
  const [enabled,setenabled]=useState()
  return (
    <div>
      <div
        className={
          isOpen
            ? "p-5 bg-white-1 dark:bg-slate-900 h-full fixed z-20 mt-16    mb-4 font-medium text-purple-600 dark:text-fuchsia-500 overflow-hidden text-xl w-1/2 inset-y-0 left-0 origin-top  duration-1000 scale-y-1 grid grid-rows-4 text-center items-center bg-white"
            : "p-5 h-full z-20 absolute mt-16  border-4 mb-4 font-medium text-purple-600 dark:bg-fuchsia-500 overflow-hidden text-xl w-1/2 inset-y-0 -left-full origin-top  duration-1000 scale-y-0 grid grid-rows-4 text-center items-center bg-white"
        }
      >
        <div className="" >
        <Link to="Hero" spy={true} smooth={true} offset={-50} duration={500}>Home</Link>
        </div>
        <div className="">
        <Link to="About" spy={true} smooth={true} offset={-200} duration={500}>About us</Link>
        </div>
        <div className=" " >
        <Link to="Work" spy={true} smooth={true} offset={-100} duration={500}>Our Work</Link>
        </div>
        <div className=" " >
        <Link to="Team" spy={true} smooth={true} offset={-100} duration={500}>Our Team</Link>
        </div>
        {/* <div className='p-4'><Link  activeClass="active" to="Course" spy={true} smooth={true} offset={50} duration={500} className='cursor-pointer'> Courses   </Link></div>     */}
        {/* <div className="p-4">
          <NavLink href="/Home"> Study Materials</NavLink>
        </div> */}
        {/* <div className="p-4">
          <NavLink href="/blog/"> Blogs </NavLink>
        </div> */}
        <Switch checked={enabled} onChange={setenabled}>

        </Switch>
      </div>
    </div>
  );
};

export default Dropdown;
