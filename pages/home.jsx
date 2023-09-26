import React, { useEffect, useState } from "react";
import Main from "../features/home/components/mainSlider";
import Spider from "../assets/Spider.jpg";
import Trending from "../features/home/components/trending";
import Suggestions from "../features/home/components/suggestions";
import Spinner from "../components/spinner/spinner";
import { getPopular } from "../services/home/endPoints";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css"; // Import the CSS
import Day from "../features/home/components/top9/Day";
import { useSelector } from "react-redux";
import Navbar from "../components/navbar/navbar";
import { Link } from "react-router-dom";
import LatestMovies from "../features/home/components/LatestMovies";
import MainSliderSkeleton from "../components/Skeleton/mainSliderSkeleton";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [slid, err] = useState([]);

  const token = useSelector((state) => state.user.token);

  // const decodedToken = decodeToken(token)

  // if(decodedToken){
  //     console.log('Email:', decodedToken.email);
  //     console.log('Expiration Time:', decodedToken.exp);
  //   } else {
  //     // Handle decoding error or invalid token
  //     console.error('Invalid token or decoding error.');
  //   }

  //!Will fix it later
  // useEffect(()=>{

  //     setTimeout(()=>{
  //         setIsLoading(!isLoading)
  //     },3000)
  // },[isLoading])

  const fetSlider = async () => {
    try {
      const respon = await getPopular(5);
      console.log(respon.data.results);
      err(respon.data.results);
      setIsLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetSlider();
  }, []);

  const properties = {
    duration: 5000,
    transitionDuration: 1000,
    arrows: false,
  };

  const newSlid = slid.slice(0, 6);

  return (
    <>
      {/* {isLoading? <Spinner/>: */}
      <div className="">
        {isLoading ? (
          <MainSliderSkeleton />
        ) : (
          <Slide {...properties}>
            {newSlid.map((value, index) => (
              // <Link to={`/movie/${value.id}`}>
              <div key={index} className="w-full">
                <div
                  className=" relative bg-cover h-screen bg-center  "
                  style={{
                    backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)),url(https://image.tmdb.org/t/p/original${value.backdrop_path})`,
                  }}
                >
                  {/* {console.log(value.poster_path)} */}
                  <Main Title={value.title} Overview={value.overview} />
                </div>
              </div>
              // </Link>
            ))}
          </Slide>
        )}
        <Trending />
        <div className="lg:flex xl:flex-col mt-10 ">
          <Suggestions />
          <Day />
        </div>
        <LatestMovies />
      </div>
      {/* } */}
    </>
  );
}
