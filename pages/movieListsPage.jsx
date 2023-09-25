import React from "react";
import Moviesss from "../features/movies/movieLists";
import Day from "../features/home/components/top9/Day";
import SuggestedMovies from "../features/movies/suggestionMovies";

export default function MovieListsPage() {
  return (
    <>
      <div className="lg:flex xl:flex-col ">
        <Moviesss />
        <SuggestedMovies />
      </div>
    </>
  );
}
