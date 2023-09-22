import Image from "next/image";
import Link from "next/link";

const Error = () => {
  return (
    <>
      <div className="h-screen flex justify-center items-center md:flex bg-black-bg1 error ">
        {/* card */}
        <div className="mx-2 overflow-visible flex flex-col sm:flex-row md:flex-row items-center max-w-screen-lg  rounded-lg  w-full md:flex ">
          <div className="w-3/4 h-1/2 my-5 md:ml-12 lg:ml-16 scale-125 ">
            <img src="/images/404.png"></img>
          </div>

          <div>
            <div className="text-4xl md:text-6xl lg:text-8xl font-bold capitalize text-slate-50">
              OOps!
            </div>
            <div className="text-2xl md:text-3xl lg:6xl mt-5 font-bold capitalize text-slate-50">
              Page not found
            </div>
            <div className="md:flex mt-5">
              <Link href="/">
                <button className="vBtn cursor-pointer mr-2 btn-second px-8 py-4 shadow-md dark:shadow-3xl dark:hover:shadow-orange-500/10 dark:shadow-orange-500/30 rounded-2xl">
                  Back to Home Page
                </button>
              </Link>
              <div className="vBtn btn-second cursor-pointer px-8 py-4 shadow-md dark:shadow-3xl dark:hover:shadow-orange-500/10 dark:shadow-orange-500/30 rounded-2xl">
                Back to Previous Page
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Error;
