import { Html, useProgress } from "@react-three/drei";
import {
  useEffect,
  useContext,
  useRef,
  useState,
  useLayoutEffect,
} from "react";

const countDown = 20 * 1000 * 100; // 20s

export default function ProgressLoader({
  setLoginCountDownComplete,
  loggedIn,
}) {
  useEffect(() => {
    return () => {
      if (loggedIn) return;
      console.log("not logged in");
      setTimeout(() => {
        setLoginCountDownComplete(true);
      }, countDown);
    };
  }, []);
  const { progress } = useProgress();
  // console.log(progress);
  // const [progress, setProgress] = useState(0);
  // const [id, setId] = useState();
  // useEffect(() => {
  //   console.log("Interval effect");
  //   const t = setInterval(() => {
  //     setProgress((prev) => prev + 1);
  //     console.log(progress);
  //   }, 100);
  //   setId(t);
  //   console.log(id);
  // }, []);
  const progressRef = useRef();
  useEffect(() => {
    if (!progressRef.current) return;
    const width = (12 / 100) * progress;
    progressRef.current.style.width = width + "rem";
    // if (progress >= 100) {
    //   clearInterval(id);
    //   console.log(id);
    //   console.log("Interval cleared");
    // }
  }, [progress]);
  return (
    <Html center className="h-screen w-screen">
      <div className="w-screen h-screen flex flex-col justify-center items-center bg-[#000] absolute top-0 left-0">
        <div className="w-32 h-32 scale-110 mb-5">
          <img className="w-full h-full" src="/images/preloader.gif" />
        </div>

        <div className="w-48 h-1 border-white border-[1px] border-solid rounded-xl">
          <div
            className="h-full w-0 bg-[#fff] rounded-xl  transition-all ease-linear"
            ref={progressRef}
          ></div>
        </div>
      </div>
    </Html>
    // <Html center>
    //   <div className="bg-black-bg text-white">
    //     {Math.round(progress)} % loaded
    //   </div>
    // </Html>
  );
}
