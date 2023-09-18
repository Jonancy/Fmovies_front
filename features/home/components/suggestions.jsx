import React, { useEffect, useState } from "react";
import {getSuggestions} from "../../../services/home/endPoints";
import Spinner from "../../../components/spinner/spinner";
import { Link } from "react-router-dom";
import HoverDetails from "../../../components/hoverDetails/hoverDetails";

export default function Suggestions() {
  const [movie, setMovie] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

  const fetchApi = async () => {
    try {
    //   await new Promise((resolve) => setTimeout(resolve, 3000));
    //  setTimeout(async()=>{

    // },3000)
    const resp = await getSuggestions();
    console.log(resp.data);
    setMovie(resp.data.results);
    // setIsLoading(false); 
    } catch (e) {
      console.log('Error', e);
    }
  };
  

  useEffect(() => {
    fetchApi();
  }, []);

  return (
    <>
      {/* {isLoading ? ( 
        <Spinner />
      ) : ( */}
        <div className="pl-[80px] pr-[80px] ">
          <p className="p-4 text-xl">Suggestions</p>
          <div className="grid grid-cols-2 gap-4 xs:grid-cols-2 xs:gap-4 sm:grid-cols-3 sm:gap-2 md:grid-cols-4 md:gap-6">
            {movie.map((values, index) => (
              <div key={index}>
              <Link to={`/movie/${values.id}`}>
                <div
                  className={`relative bg-center bg-cover w-[100px] h-[120px] xs:w-[150px] xs:h-[200px] sm:w-[150px] sm:h-[200px] lg:w-[250px] lg:h-[300px] rounded-[20px] hover:${<HoverDetails />}`}
                  style={{
                    backgroundImage: `url(https://image.tmdb.org/t/p/w300${values.poster_path})`,
                  }}
                >
                  <div className="absolute bottom-0 right-0 left-0">
                    <p>{values.original_title}</p>
                  </div>
                </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      {/* )} */}
    </>
  );
}
