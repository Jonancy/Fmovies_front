import React from 'react'
import { Link } from 'react-router-dom'

export default function Top9cards(props) {
  return (
    <>
      <div className='grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
            {props.top9.map((value, index)=>(
              <Link to={`/movie/${value.id}`}>
            <div className='flex'key={index} >
              
                <img className='w-[20%] h-[70%]' src={`https://image.tmdb.org/t/p/w780${value.poster_path}`}></img>
                <div className='flex flex-col'>
                    <div className='flex'>
                        <p>Movie</p>
                        <p>Date</p>
                        <p>109</p>
                    </div>
                    <p>{value.original_title}</p>
                </div>
            </div>
              </Link>
            )) }
        </div>
    </>
  )
}
