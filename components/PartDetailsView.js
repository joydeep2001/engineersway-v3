import Image from "next/image";
import SideMenu from "./SideMenu";
import { AiFillCloseCircle } from "react-icons/ai";

export default function PartDetailsView({ showPopup, partDetails }) {
  function handleClose() {
    showPopup({ visibility: false });
  }
  function parseData(data) {
    if (typeof data === "string") return data;
    if (typeof data !== "object")
      return "Invalid format. It must be object or string";

    let output = "<ul class=outer_list>";
    for (const key in data) {
      if (key === "__intro__" || key === "__extro__") {
        continue;
      }
      output += `<li>${key}`;
      output += `<ul class=inner_list>`;
      data[key].forEach((item) => {
        output += `<li>${item}</li>`;
      });
      output += `</ul></li>`;
    }
    output += `</ul>`;
    console.log(output);
    return output;
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
                  <img src="/images/cube.png" alt="" />
                </span>
                Construction
              </h5>
              <p
                dangerouslySetInnerHTML={{
                  __html: parseData(
                    partDetails.partDescription.workingPrinciple
                  ),
                }}
              ></p>
            </div>
            <div className="eachdetailsM">
              <h5>
                <span>
                  <img src="/images/cube.png" alt="" />
                </span>
                Working Principle
              </h5>
              <p
                dangerouslySetInnerHTML={{
                  __html: parseData(
                    partDetails.partDescription.workingPrinciple
                  ),
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
