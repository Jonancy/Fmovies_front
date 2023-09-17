import React from "react";
import bill from "../../assets/bill.jpg";
import error from "../../assets/error.jpg";
import {BsFillArrowLeftCircleFill} from 'react-icons/bs'
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {

    const navigate = useNavigate()
  return (
    <>
      <div className="flex">
        <div className="w-1/2 relative ">
          <img className="w-full h-full" src={error}></img>
          <div className="absolute top-1/4 left-1/2">
            <p className="text-purple-500 font-bold text-3xl" style={{ textShadow: '6px 2px 3px purple' }}>La billa page Payena</p>
          </div>
        </div>
        <div className="w-1/2 relative">
          <img className="w-full h-full" src={bill}></img>
            <BsFillArrowLeftCircleFill className='absolute top-[62%] left-[54%] font-bold text-black text-4xl cursor-pointer' onClick={()=>navigate('/home')}/>
          <p className="absolute top-[58%] left-[60%] font-bold text-black text-2xl">Farkinus </p>
        </div>
      </div>
    </>
  );
}
