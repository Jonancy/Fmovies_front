import React from "react";
import { AiFillStar } from "react-icons/ai";
import { AiFillPlayCircle } from "react-icons/ai";
import { BsBookmark } from "react-icons/bs";

function Main(props) {


  
  return (
    <>
      <div className="flex flex-col absolute bottom-5 left-20 right-10 sm:bottom-5 sm:left-5 md:bottom-5 md:left-5 lg:bottom-5 lg:left-5 border-b-2 border-b-gray-400 pb-6">
        <div className="flex flex-col w-5/6 sm:1/2  md:w-1/2  max-h-[50vh] ">
          <h1 className="font-bold text-lg sm:text-2xl md:text-3xl lg:text-5xl ">
            {props.Title}
          </h1>
          <div className="h-2"></div>
          <div className="flex text-neutral-400 font-bold justify-around items-center text-xs md:text-base flex-wrap ">
                        <button className="font-bold rounded-[20px] bg-blue-600 pl-2 pr-2 hover:bg-blue-500 ">HD</button>
                        <button className="font-bold rounded-[20px] border-2 pl-2 pr-2">PG</button>
                        <div className="flex justify-center items-center">
                            <AiFillStar />
                            <p>8.9</p>
                        </div>
                        <p>2023</p>
                        <p>140 min</p>
                        <p>Animation</p>
                        <p>Adventure</p>
                        <p>Action</p>
                    </div>
          <div>
            <p className="text-neutral-400 font-bold leading-tight mt-4 hidden  md:block">
              {props.Overview}
            </p>
          </div>
          <div className="flex mt-4">
            <div className="flex bg-blue-600 rounded-[20px] justify-center items-center  hover:bg-blue-500 cursor-pointer">
              <AiFillPlayCircle className="text-black text-xl" />
              <p className="text-black pl-2 text-xs sm:text-base lg:text-lg lg:pl-4">Watch Now</p>
            </div>
            <div className="flex bg-blue-600 rounded-[20px] justify-center items-center p-1 md:p-2 font-bold ml-4 hover:bg-blue-500 cursor-pointer">
              <BsBookmark className="text-white text-xl" />
              <p className="text-white pl-1 sm:pl-2 text-xs sm:text-base lg:text-lg lg:pl-4">Bookmark</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
