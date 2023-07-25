export default function SkeletonCardLoader() {
  return (
    <div className="mt-4 w-72 h-72 bg-stone-100 flex flex-col items-center dark:bg-black-bg1 ">
      <div className="w-72 animate-pulse h-52 bg-stone-200 dark:bg-slate-800 rounded-md flex flex-col justify-center items-center "></div>
      <div className="flex flex-col h-20 items-center justify-center space-y-3">
        <div className="w-36 animate-pulse bg-gray-300 h-6  rounded-md dark:bg-black-bg1"></div>
      </div>
    </div>
  );
}

// <div class="w-60 h-24 border-2 rounded-md mx-auto mt-20">
//       <div class="flex animate-pulse flex-row items-center h-full justify-center space-x-5">
//         <div class="w-12 bg-gray-300 h-12 rounded-full "></div>
//         <div class="flex flex-col space-y-3">
//           <div class="w-36 bg-gray-300 h-6 rounded-md "></div>
//           <div class="w-24 bg-gray-300 h-6 rounded-md "></div>
//         </div>
//       </div>
//     </div>
