import React, { useEffect, useState } from "react";
import Main from "../features/home/components/mainSlider";
import Spider from '../assets/Spider.jpg'
import Trending from "../features/home/components/trending";
import Suggestions from "../features/home/components/suggestions";
import Spinner from "../components/spinner/spinner";
import { getPopular } from "../services/home/endPoints";
import {Slide} from 'react-slideshow-image'
import 'react-slideshow-image/dist/styles.css'; // Import the CSS
import Day from "../features/home/components/top9/Day";
import Navbar from "../components/navbar";
import { useSelector } from "react-redux";

export default function Home(){
    // const [isLoading, setIsLoading] = useState(true);
    const[slid,err] = useState([]);

    const token = useSelector((state)=> state.user.token)

    
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

    const fetSlider=async()=>{
    try{

        const respon = await getPopular();
        console.log(respon.data.results)
        err(respon.data.results)
    }catch(e){
        console.log(e)
    }
    }

    useEffect(()=>{
        fetSlider()
    },[])



    const properties = {
        duration:5000,
        transitionDuration: 1000,
        arrows:false
    }

    const newSlid = slid.slice(0,5)

    return(
        <>
    {/* {isLoading? <Spinner/>: */}
    <div className="bg-neutral-950 text-white">
        <Navbar />
    <Slide {...properties}>

    {newSlid.map((value, index)=>(
        <div key={index} className="w-full">

        <div className=" relative bg-cover h-screen bg-center "style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${value.backdrop_path})`}} >
            {/* {console.log(value.poster_path)} */}
            <Main Title={value.title} Overview={value.overview} />
        </div>
        </div>
    ))}
    </Slide>
        <Trending />
        <Suggestions />
        <Day />
    </div>
    {/* } */}
        </>
    )
}
