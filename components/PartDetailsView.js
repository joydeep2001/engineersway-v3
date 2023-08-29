import Image from "next/image";
import SideMenu from "./SideMenu";
import { AiFillCloseCircle } from "react-icons/ai";

export default function PartDetailsView({ showPopup, partDetails }) {
  function handleClose() {
    showPopup({ visibility: false });
  }
  return (
    <div className="popUpwrap">
      <div className="popUpDetailswrap">
        <div className="leftBlock">
          <div className="imgLeft">
            <img src={partDetails.image} alt="" />
          </div>
          <h4>{partDetails.name}</h4>
          {/* <a className="showModel btn-second">Show 3D Model</a> */}
        </div>
        <div className="rightBlock">
          <div onClick={handleClose} className="detailsCros cursor-pointer">
            <AiFillCloseCircle size={20} />
          </div>
          <div className="machineDetailsWrap">
            <div className="eachdetailsM">
              <h5>
                <span>
                  <img src="images/cube1.png" alt="" />
                </span>
                Construction
              </h5>
              <p>{partDetails.partDescription.construction}</p>
            </div>
            <div className="eachdetailsM">
              <h5>
                <span>
                  <img src="images/cube1.png" alt="" />
                </span>
                Working Principle
              </h5>
              <p>{partDetails.partDescription.workingPrinciple}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
