import Link from "next/link";

const Video = ({ src, hideVideo }) => {
  const handleClick = (e) => {
    hideVideo();
  };
  return (
    <div
      onClick={handleClick}
      className="fixed top-0 left-0 z-10 h-screen w-screen bg-[#101010]/[.8] flex justify-center items-center md:flex"
    >
      <div className="mx-2 md:mx-4 flex  flex-col-reverse md:flex-row items-center md:max-w-screen-sm lg:max-w-screen-md xl:max-w-screen-lg 2xl:max-w-screen-xl overflow-hidden rounded-3xl shadow-lg bg-white w-full md:flex">
        {/* Text */}
        <div className="flex flex-col md:ml-3 xl:ml-5 justify-center items-center">
          {/* Heading */}
          <div className="text-2xl md:text-3xl mb-3 lg:6xl mt-2  font-bold capitalize">
            <iframe
              className="w-[360px] h-[211px] sm:w-[1200px] sm:h-[700px]"
              src={src}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="btn-first font-bold px-5 lg:px-1 xl:px-3 my-4 items-center justify-center">
            <Link href="/ThreeD">Explore 3D Models</Link>
          </div>
        </div>
        {/* Image */}
        {/* <div className="w-screen h-full xl:ml-96">
          <img src="/images/video.png"></img>
        </div> */}
      </div>
    </div>
  );
};

export default Video;
