import React from "react";
import { BsPlay, BsPlusCircle, BsStarFill } from "react-icons/bs";

export default function HoverDetails(props) {
  return (
    <>
      <div className="bg-neutral-800 rounded-[10px]">
        <div className="p-6 flex flex-col w-[20rem]">
          <div className="flex justify-between items-center font-bold text-2xl pb-4">
            <p>{props.title}</p>
            <BsPlusCircle />
          </div>
          <div className="flex border-b-2 text-sm border-b-gray-500 pb-4 justify-between items-center  text-cyan-500">
            <div className="rounded-[15px] bg-cyan-500">
              <p className="pl-2 pr-2 text-neutral-800">HD</p>
            </div>
            <div className="rounded-[15px] border-cyan-500 border-2 ">
              <p className="pl-2 pr-2">PG-13</p>
            </div>
            <p>2023</p>
            <BsStarFill />
            <p>{props.vote}</p>
            <p>111 min</p>
          </div>
          <div className="flex">
            <p>Country:</p>
            <p>HEHE</p>
          </div>
          <div className="flex">
            <p>Genre:</p>
            <p>HEHE</p>
          </div>
          <div className="flex">
            <p>Scores:</p>
            <p>HEHE</p>
          </div>
          <div className="text-neutral-500">
            <p className="truncate">{props.overview}</p>
          </div>
          <div className="w-full bg-cyan-500 flex items-center justify-center rounded-[5px] pt-2 pb-2 mt-4">
            <BsPlay />
            <p>Watch Now</p>
          </div>
        </div>
      </div>
    </>
  );
}
