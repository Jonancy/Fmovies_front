import React, { useEffect, useState } from 'react'
import { getTopRated } from '../../../../services/home/endPoints'
import Top9cards from '../../../../components/top9/top9cards'
import MainTop9 from './services/mainTop9'

export default function Week() {

    // const[hera,newHera] = useState([])

    // const fetchTop=async(e)=>{
    //     const response= await getTopRated()
    //     console.log(response.data)
    //     newHera(response.data.results)
    //     e.preventDefault();
    // }

    // useEffect(()=>{
    //     fetchTop()
    // },[])

    const{hera} = MainTop9()

    const haha = hera.slice(0,5)


  return (
    <>
        <Top9cards top9={haha} />
    
    </>
  )
}
