"use client";
import { useState, useEffect, useRef } from "react";

export default function CustomAos({
  imgsrc,
  height,
  width,
  options,
  bulb,
  ethics,
  changeLocalLightTheme,
}) {
  const movingGear = useRef();
  const { start, stop, rotate, speedTune } = options;
  useEffect(() => {
    const linearSpeed =
      ((stop().x - start.x) / (stop().y - start.y)) * speedTune;

    //console.log(linearSpeed);
    const gearRad = movingGear.current.offsetHeight;
    const angularSpeed = (360 / (Math.PI * gearRad)) * speedTune;
    let lastScrollY = 640;
    if (typeof window !== "undefined") {
      window.onscroll = () => {
        if (window.scrollY >= start.y && window.scrollY <= stop().y) {
          const dy = window.scrollY - lastScrollY;

          //console.log(dy);
          lastScrollY = window.scrollY;
          setPositionX((prevPos) => {
            if (prevPos <= stop().x - start.x || dy < 0) {
              //console.log(prevPos, linearSpeed, dy);
              return prevPos + linearSpeed * dy;
            }
            return prevPos;
          });
          setAngularPos(
            (prevAngularPos) => prevAngularPos + angularSpeed * linearSpeed * dy
          );
        }
      };
    }
    return () => {
      window.onscroll = () => {};
    };
  }, []);
  const [positionX, setPositionX] = useState(start.x);
  const [angularPos, setAngularPos] = useState(0);
  if (typeof window !== "undefined") {
    //const bulbPos = bulb.current.getBoundingClientRect();
    const bulbPos = { left: 1502 };
    if (positionX > bulbPos.left) {
      changeLocalLightTheme(true);
      bulb.current.style.transformOrigin = "center";
      bulb.current.style.transition = ".5s";
      bulb.current.style.transform = "rotate(-150deg)";
      ethics.current.classList.remove("bg-yellow-1");
      ethics.current.style.transition = ".5s";
      ethics.current.classList.add("bg-gradient-to-r");
      ethics.current.classList.add("from-yellow-1");
      ethics.current.classList.add("to-white-1");
    } else {
      if (bulb.current) {
        changeLocalLightTheme(false);
        bulb.current.style.transformOrigin = "center";
        bulb.current.style.transform = "rotate(0deg)";
        ethics.current.classList.add("bg-yellow-1");
        ethics.current.classList.remove("bg-gradient-to-r");
        ethics.current.classList.remove("from-yellow-1");
        ethics.current.classList.remove("to-white-1");
      }
    }
  }

  let transformValue = `translateX(${positionX}px)`;
  transformValue += rotate ? ` rotate(${angularPos}deg)` : "";
  return (
    <div
      style={{
        transition: ".1s",
        transform: transformValue,
        left: start.x + "px",
      }}
      className="absolute abs2"
      ref={movingGear}
    >
      <img height={height} width={width} src={imgsrc} alt="custom-aos" />
    </div>
  );
}
