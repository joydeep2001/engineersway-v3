import { BsGearWideConnected } from "react-icons/bs";
import Slider from "react-slick";
import { useState } from "react";

export default function PartViewPopup({ onPartCardClick, partDetails }) {
  function handlePartCardClick(e) {
    // console.log(e.currentTarget.dataset.index);
    if (e.currentTarget.classList.value.includes("part-card"))
      onPartCardClick(e.currentTarget.dataset.index);
  }
  function togglePanel() {
    showPanel((prev) => !prev);
  }
  const [panel, showPanel] = useState(false);
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplayspeed: 8000,
    variableWidth: true,
  };

  function showText(e) {
    const index = e.currentTarget.dataset.index;
    /**Warning: This is bad code. Must come up with some other stratigies. */
    document.querySelectorAll(`div[data-index="${index}"]`).forEach((card) => {
      card.querySelectorAll(".layover-text").forEach((layoverTxt) => {
        layoverTxt.classList.remove("hidden");
        layoverTxt.classList.add("flex");
      });
    });
  }
  function hideText(e) {
    const index = e.currentTarget.dataset.index;
    /**Warning: This is bad code. Must come up with some other stratigies. */
    document.querySelectorAll(`div[data-index="${index}"]`).forEach((card) => {
      card.querySelectorAll(".layover-text").forEach((layoverTxt) => {
        layoverTxt.classList.add("hidden");
        layoverTxt.classList.remove("flex");
      });
    });
  }

  return (
    <div className="flex flex-col items-center justify-center text-black-bg absolute top-full left-0 h-32 w-full transition-all   -translate-y-full">
      {panel && (
        <div className="in-out w-1/4 ">
          <Slider {...settings}>
            {partDetails.map((part, i) => (
              <div
                onClick={handlePartCardClick}
                key={`part-dtls-pan-${i}`}
                style={{ width: 96 }}
                className="relative part-card  h-12 w-12 cursor-pointer "
                data-index={i}
                onMouseEnter={showText}
                onMouseLeave={hideText}
              >
                <img
                  data-index={i}
                  className="part-card h-full w-full object-contain"
                  src={part.image}
                />
                <div className="layover-text transition hidden absolute top-0 text-xs  justify-center items-center bg-[#000A] h-full w-full  text-white-1">
                  {part.name}
                </div>
              </div>
            ))}
          </Slider>
        </div>
      )}
      <div
        onClick={togglePanel}
        className="transition cursor-pointer"
        title="Parts"
      >
        <BsGearWideConnected size="40" color="brown" />
      </div>
    </div>
  );
}
