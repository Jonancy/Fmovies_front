import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovie } from '../../../services/Movies/movies';
import Navbar from '../../../components/navbar/navbar';
import Spider from '../../../assets/Spider.jpg'

export default function ForVideo(props) {
 
  return(
    <>
      <div className=''>
        <img className='' src={props.movieImage}></img>
      </div>
    </>
  )
}
