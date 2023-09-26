import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../../../services/Movies/movies';
import Navbar from '../../../components/navbar/navbar';
import Spider from '../../../assets/Spider.jpg'
import { BsPlayBtnFill, BsPlayCircleFill } from 'react-icons/bs';

//!The linear graident is not usable on tailwind so inline css is used in style 
export default function ForVideo(props) {
  const gradientStyle = {
    backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))',
  };

  return (
    <>
      <div className='relative '>
        <div style={gradientStyle} className='absolute inset-0'></div>
        <img className='' src={props.movieImage} alt="Movie" />
        <div className='absolute inset-0 flex items-center justify-center'>
          <BsPlayCircleFill className='text-9xl text-cyan-500 opacity-50'/>
        </div>
      </div>
    </>
  );
}
