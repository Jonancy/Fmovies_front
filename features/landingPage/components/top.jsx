import React from 'react'
import Fmovies from '../../../assets/Fmovies-Logo.png'
import { AiOutlineSearch, AiOutlineFilter } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import TopSearch from './topSearch';

export default function Top() {


  return (
    <div className='flex flex-col justify-center items-center  w-full'>
        <img className='w-40' src={Fmovies}></img>
        <p className='text-2xl font-bold text-neutral-500'>Watch Movies Online in HD for Free!</p>
        <div className="mt-[15px] w-[90%] ">
                    <div className="flex bg-black rounded-[20px] justify-between p-2 justify-center items-center text-neutral-600">
                        <div className="flex items-center justify-center bg-neutral-700 rounded-[20px] text-neutral-400 p-1 text-sm">
                            <AiOutlineFilter />
                            <p>Filter</p>
                        </div>
                        <div>
                            <input className="w-[50%] sm:w-full outline-none bg-black text-neutral-600" placeholder="Search movies..." />
                        </div>
                        <div>
                            <AiOutlineSearch className="text-blue-500 text-2xl" />
                        </div>
                    </div>
                        <TopSearch  />
                </div>
    </div>
  )
}
