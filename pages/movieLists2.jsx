import React from "react";
import Day from "../features/home/components/top9/Day";
import SuggestedMovies from "../features/movies/suggestionMovies";
import Moviesss2 from "../features/movies/movieList2";

export default function MovieListsPage2() {
  return (
    <>
      <div className="lg:flex xl:flex-col ">
        <Moviesss2 />
        <SuggestedMovies />
      </div>
    </>
  );
}
