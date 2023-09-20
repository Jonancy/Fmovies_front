import React from "react";

export default function MovieDetails(props) {
  return (
    <>
      <div className="flex pl-4">
        <div className="w-1/6 h-full">
          <img className="h-full" src={props.movieImage}></img>
        </div>
        <div className="flex flex-col">
          <p>{props.movieTitle}</p>
          <div className="flex">
            <div className="rouned-[20px] bg-cyan-600 p-2">HD</div>
            <div className="rouned-[20px] p-2">HD</div>
            <p>{props.ratings}</p>
            <p>{props.date}</p>
            <p>{props.min}</p>
          </div>
          <div className="flex">
            <p className="text-neutral-700">Type:</p>
            <p className="">{props.type}</p>
          </div>
          <div className="flex">
            <p className="text-neutral-700">Country:</p>
            <p className="">{props.country}</p>
          </div>
          <div className="flex">
            <p className="text-neutral-700">Genre:</p>
            <p className="">{props.genre}</p>
          </div>
          <div className="flex">
            <p className="text-neutral-700">Release:</p>
            <p className="">{props.release}</p>
          </div>
          <div className="flex">
            <p className="text-neutral-700">Director:</p>
            <p className="">{props.director}</p>
          </div>
          <div className="flex">
            <p className="text-neutral-700">Production:</p>
            <p className="">{props.prod}</p>
          </div><div className="flex">
            <p className="text-neutral-700">Cast:</p>
            <p className="">{props.cast}</p>
          </div>
          <div className="flex">
            <p className="text-neutral-700">Tags:</p>
            <p className="">{props.tags}</p>
          </div>
        </div>
      </div>
    </>
  );
}
