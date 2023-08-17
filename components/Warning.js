import NavLink from "next/link";

export default function Warning(props) {
  const { modelInfo, onBack } = props;
  const handleClick = (e) => {
    onBack();
  };
  return (
    <div className="w-screen h-screen flex justify-center items-center fixed inset-0 z-50">
      {/*Waring container*/}
      <div className="border-2 w-72 h-56 rounded-md fixed drop-shadow-xl bg-white">
        {/*image container*/}
        <div className="flex justify-center">
          <img src="../images/warning.png" className="h-10 w-10 opacity-80" />
        </div>
        {/*warning message*/}
        <h1 className="font-black text-lg text-center  mb-5 text-rose-500">
          Data Consumption Warning
        </h1>
        <div className="text-center">
          This model will consume <b>{Math.round(modelInfo.size)} MB</b> Data.
        </div>

        {/*button tray*/}
        <div className="flex justify-center  mt-8 h-20">
          <NavLink href={"/" + modelInfo.link}>
            <button
              onClick={(e) => {
                e.target.innerHTML = "Loading...";
              }}
              className="flex flex-1 items-center justify-center bg-red-500 text-white"
            >
              Proceed
            </button>
          </NavLink>
          <button
            onClick={handleClick}
            className="flex flex-1 items-center justify-center bg-slate-200"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
