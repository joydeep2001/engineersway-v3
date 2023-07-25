//import { useSnapshot } from "valtio";
import { AiOutlineMenu } from "react-icons/ai";

export default function Pick({ state, handleToggleMenu }) {
  //const snap = useSnapshot(state);
  return (
    <div className=" sticky top-0 left-0 w-screen h-16 bg-black-bg text-yellow-400 lg:text-xl p-5 z-10">
      <div
        onClick={handleToggleMenu}
        className=" hidden items-cente cursor-pointer"
      >
        <AiOutlineMenu />
        <p className="ml-2">Parts</p>
      </div>
    </div>
  );
}
