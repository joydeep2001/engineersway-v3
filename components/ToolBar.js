import { BsGearWideConnected } from "react-icons/bs";
import Slider from "react-slick";
import { useState } from "react";

export default function PartViewPopup({ onPartCardClick, partDetails }) {
  function handlePartCardClick(e) {
    if (e.target.classList.value.includes("part-card"))
      onPartCardClick(e.target.dataset.index);
  }
  function togglePanel() {
    showPanel((prev) => !prev);
  }
  const [panel, showPanel] = useState(false);
  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplayspeed: 8000,
    variableWidth: true,
  };
  console.log(onPartCardClick, partDetails);
  return (
    <div className="flex flex-col items-center justify-center text-black-bg absolute top-full left-0 h-32 w-full transition-all   -translate-y-full">
      {panel && (
        <div onClick={handlePartCardClick} className="in-out w-1/4 ">
          <Slider {...settings}>
            {partDetails.map((part, i) => (
              <div
                key={`part-dtls-pan-${i}`}
                style={{ width: 96 }}
                className="part-card  h-12 w-12 bg-blue-200 cursor-pointer"
                data-index={i}
              >
                {part.name}
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
