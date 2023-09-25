import React from "react";
import Marvel from "../../assets/Marvel.jpg";
import { BsBox, BsBox2Fill } from "react-icons/bs";
import { RxBox } from "react-icons/rx";
import Fmovies from "../../assets/Fmovies-Logo.png";

export default function Footer() {
  return (
    <>
      <div className="h-[25rem] relative mt-20">
        <img className="h-full w-full opacity-50" src={Marvel}></img>
        <div className="absolute left-0 bottom-20 border-b-2 border-b-cyan-500 w-full ">
          <div className="flex justify-between items-center pl-6 pr-6 ">
            <div className="flex pt-16 justify-around ">
              <div className="flex pr-2">
                <p>Links:</p>
              </div>
              <div className="flex items-center pr-4">
                <p className="text-neutral-500 text-sm hover:text-cyan-600 cursor-pointer">
                  Movies
                </p>
                <RxBox className="bg-cyan-600" />
              </div>
              <div className="flex items-center pr-4">
                <p className="text-neutral-500 text-sm hover:text-cyan-600 cursor-pointer">
                  TV-Shows
                </p>
                <RxBox className="bg-cyan-600" />
              </div>
              <div className="flex items-center pr-4">
                <p className="text-neutral-500 text-sm hover:text-cyan-600 cursor-pointer">
                  A-Z List
                </p>
                <RxBox className="bg-cyan-600" />
              </div>
              <div className="flex items-center pr-4">
                <p className="text-neutral-500 text-sm hover:text-cyan-600 cursor-pointer">
                  Recentely Updated
                </p>
                <RxBox className="bg-cyan-600" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="w-[7rem] ml-6">
                <img src={Fmovies}></img>
              </div>
              <div className="flex">
                <div className="flex items-center pr-2">
                  <p className="text-neutral-500 text-sm hover:text-cyan-600 cursor-pointer">
                    Request
                  </p>
                  <RxBox className="bg-cyan-600" />
                </div>
                <div className="flex items-center ">
                  <p className="text-neutral-500 text-sm hover:text-cyan-600 cursor-pointer">
                    Contact
                  </p>
                  <RxBox className="bg-cyan-600" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-10 right-10 bottom-0 text-neutral-600">
          <p className="w-full">
            FMovies is top of free streaming website, where to watch movies
            online free without registration required. With a big database and
            great features, we're confident FMovies is the best free movies
            online website in the space that you can't simply miss!
          </p>
          <p>
            
            This site does not store any files on our server, we only linked to
            the media which is hosted on 3rd party services. Links: watch movies
            online, zoro anime, free watch anime online
          </p>
        </div>
      </div>
    </>
  );
}
