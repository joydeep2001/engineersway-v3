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
            <img src="images/transformer1.png" alt="" />
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
                About
              </h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti saepe magnam quos reprehenderit ipsa harum nihil
                possimus veritatis deserunt dolorum eligendi adipisci incidunt,
                doloribus asperiores nemo impedit quas culpa similique.
              </p>
            </div>
            <div className="eachdetailsM">
              <h5>
                <span>
                  <img src="images/cube1.png" alt="" />
                </span>
                About
              </h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti saepe magnam quos reprehenderit ipsa harum nihil
                possimus veritatis deserunt dolorum eligendi adipisci incidunt,
                doloribus asperiores nemo impedit quas culpa similique.
              </p>
            </div>
            <div className="eachdetailsM">
              <h5>
                <span>
                  <img src="images/cube1.png" alt="" />
                </span>
                About
              </h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti saepe magnam quos reprehenderit ipsa harum nihil
                possimus veritatis deserunt dolorum eligendi adipisci incidunt,
                doloribus asperiores nemo impedit quas culpa similique.
              </p>
            </div>
            <div className="eachdetailsM">
              <h5>
                <span>
                  <img src="images/cube1.png" alt="" />
                </span>
                About
              </h5>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Corrupti saepe magnam quos reprehenderit ipsa harum nihil
                possimus veritatis deserunt dolorum eligendi adipisci incidunt,
                doloribus asperiores nemo impedit quas culpa similique.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
