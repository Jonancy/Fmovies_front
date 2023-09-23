import React, { useEffect, useState } from "react";
import { getSuggestions } from "../../../services/home/endPoints";
import Spinner from "../../../components/spinner/spinner";
import { Link } from "react-router-dom";
import HoverDetails from "../../../components/hoverDetails/hoverDetails";
import { BsPlayBtn } from "react-icons/bs";

export default function Suggestions() {
  const [movies, setMovies] = useState([]);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchApi = async () => {
    try {
      const resp = await getSuggestions();
      console.log(resp.data);
      setMovies(resp.data.results);
      setIsLoading(false);
    } catch (e) {
      console.log("Error", e);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);

  const handleMouseEnter = (index) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div className="pl-[20px] pr-[80px]  ">
          <p className="p-4 text-xl">Suggestions</p>
          <div className="grid grid-cols-2 gap-4 xs:grid-cols-2 xs:gap-4 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 md:gap-9">
            {movies.map((movie, index) => (
              <div
                key={index}
                className="relative"
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
              >
                <Link to={`/movie/${movie.id}`}>
                <div className="">
                  <div
                    className={`bg-center bg-cover w-[100px] h-[120px] xs:w-[150px] xs:h-[200px] sm:w-[150px] sm:h-[200px] lg:w-[14rem] lg:h-[17rem] rounded-[15px] ${
                      hoveredIndex === index ? "opacity-50" : "opacity-100"
                    }`}
                    style={{
                      backgroundImage: `url(https://image.tmdb.org/t/p/w300${movie.poster_path})`,
                    }}
                  >
                    <div className="bg-cyan-500 pr-2 inline-block mt-4 pl-2">
                      <p className="text-xs text-black font-bold">HD</p>
                    </div>
                  </div>
                  <div className="flex justify-between text-neutral-500 text-xs pt-2 w-full">
                      <p>2023</p>
                      <div className="border-2 border-gray-500 rounded-[20px]">
                        <p className="pl-2 pr-2">MOVIE</p>
                      </div>
                      <p>90 min</p>
                  </div>
                  <p>{movie.title}</p>
                  </div>
                </Link>
                {hoveredIndex === index && (
                  <div className="absolute top-0 left-full ml-2 z-10">
                    <HoverDetails title={movie.title} vote={movie.vote_average} overview={movie.overview}/>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
