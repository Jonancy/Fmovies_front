import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import HoverDetails from '../hoverDetails/hoverDetails'

export default function Top9cards(props) {

  const[hover,setHover] = useState(false)

  const hoverMouse=(index)=>{
    setHover(index)
  }

  const unhoverMouse=()=>{
    setHover(null)
  }
  return (
    <>
      <div className=' grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 '>
            {props.top9.map((value, index)=>(
              <Link to={`/movie/${value.id}`}>
            <div className='flex relative'key={index}  onMouseEnter={()=>hoverMouse(index)}  onMouseLeave={unhoverMouse}>
              
                <img className='w-[20%] h-[70%]' src={`https://image.tmdb.org/t/p/w780${value.poster_path}`} 
                ></img>
                <div className='flex flex-col'>
                    <div className='flex'>
                        <p>Movie</p>
                        <p>Date</p>
                        <p>109</p>
                    </div>
                    <p>{value.original_title}</p>
                </div>
              {hover  === index && 
                <div className=' absolute right-full'>
                  <HoverDetails title={value.title} vote={value.vote_average} overview={value.overview}/>
                </div>
              }
            </div>
              </Link>
            )) }
        </div>
    </>
  )
}
