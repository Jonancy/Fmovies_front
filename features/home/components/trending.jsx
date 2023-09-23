import React, { useEffect, useState } from "react";
import { BsFire } from "react-icons/bs";
import Spider from "../../../assets/Spider.jpg";
import { getPopular } from "../../../services/home/endPoints";
import { Slide } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css"; // Import the CSS
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import useWindowState from "../../../hooks/useWindow";

export default function Trending() {
  const [hehe, setHehe] = useState([]);

  const[windowWidth] = useWindowState();

  const fetchTrend = async () => {
    try {
      const response = await getPopular();
      console.log(response.data);
      setHehe(response.data.results);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchTrend();
  }, []);

  const newHehe = hehe.slice(0, 6);

  const slidesPerView = windowWidth <= 1020 ? (windowWidth <= 650 ? 1 : 2) : 3;


  //!Need to add Slide for the slideshow
  //!Not finished
  return (
    <>
      <div className="flex pl-4 pr-4 border-b-8 border-b-blue-400 pb-6 text-sm md:text-xl overflow-auto">
        <Swiper spaceBetween={0}  slidesPerView={slidesPerView} >
      
          {newHehe.map((value, index) => (
            <SwiperSlide>
            <Link to={`/movie/${value.id}`}>
              <div
                key={index}
                className={`relative bg-center bg-cover p-4 w-[400px] h-[250px] rounded-[20px] mr-6`}
                style={{
                  backgroundImage: `url(https://image.tmdb.org/t/p/original${value.backdrop_path})`,
                }}
              >
                <div className="absolute left-5 bottom-5 md:left-10 flex flex-col  font-bold justify-start items-start">
                  <p className=" text-neutral-800">{value.title}</p>
                  <div className="flex justify-around  text-blue-500 ">
                    <p>Animation</p>
                    <div className="w-[10px]"></div>
                    <p>Adventure</p>
                    <div className="w-[10px]"></div>

                    <p>Action</p>
                  </div>
                </div>
              </div>
          </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
              
    </>
  );
}
