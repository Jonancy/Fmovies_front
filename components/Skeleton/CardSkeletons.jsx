import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function CardSkeletons() {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <div className="w-[14rem] h-[17rem] rounded-[15px] m-2 ">
          <Skeleton className="w-full h-full " />
        </div>
        <div className="w-[14rem] h-[17rem] rounded-[15px] m-2">
          <Skeleton className="w-full h-full"/>
        </div>
        <div className="w-[14rem] h-[17rem] rounded-[15px] m-2">
          <Skeleton className="w-full h-full"/>
        </div>
        <div className="w-[14rem] h-[17rem] rounded-[15px] m-2">
          <Skeleton className="w-full h-full"/>
        </div>
        <div className="w-[14rem] h-[17rem] rounded-[15px] m-2">
          <Skeleton className="w-full h-full"/>
        </div>
        <div className="w-[14rem] h-[17rem] rounded-[15px] m-2">
          <Skeleton className="w-full h-full"/>
        </div>
        <div className="w-[14rem] h-[17rem] rounded-[15px] m-2">
          <Skeleton className="w-full h-full"/>
        </div>
        <div className="w-[14rem] h-[17rem] rounded-[15px] m-2">
          <Skeleton className="w-full h-full"/>
        </div>
      </div>
    </>
  );
}
