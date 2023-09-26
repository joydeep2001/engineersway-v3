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
    slidesToScroll: 1,
    autoplay: false,
    autoplayspeed: 8000,
    variableWidth: true,
  };

  return (
    <div className="flex flex-col items-center justify-center text-black-bg absolute top-full left-0 h-32 w-full transition-all   -translate-y-[105%]">
      {panel && (
        <div className="in-out w-1/4 ">
          <Slider {...settings}>
            {partDetails.map((part, i) => (
              <div
                className="relative part-card h-20 w-12 cursor-pointer  "
                style={{ width: 96 }}
                onClick={handlePartCardClick}
                key={`part-dtls-pan-${i}`}
                data-index={i}
              >
                <div className="absolute top-10 w-12">
                  <img
                    data-index={i}
                    className="h-full w-full object-contain"
                    src={part.image}
                  />
                </div>
                <div className="opacity-0 whitespace-nowrap absolute top-12 text-top text-[10px] text-white-1 bg-black-bg p-2 transition-all">
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
