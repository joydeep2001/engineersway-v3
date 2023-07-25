import { useState } from "react";

export default function SideMenu({ items, toggle, showPopup }) {
  function handleShowPopup(e) {
    const index = e.target.dataset.index;
    showPopup({ visibility: true, partDetails: items[index] });
  }
  return toggle ? (
    <div className="fixed z-10 top-16 left-0 h-full overflow-y-scroll  bg-black-bg p-5">
      {items?.map((item, index) => (
        <div
          data-index={index}
          onClick={handleShowPopup}
          className="p-1 cursor-pointer"
          key={item.id}
        >
          {item.name}
        </div>
      ))}
    </div>
  ) : null;
}
