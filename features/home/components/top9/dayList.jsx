import React, { useEffect, useState } from 'react'
import { getTopRated } from '../../../../services/home/endPoints'
import Top9cards from '../../../../components/top9/top9cards'
import MainTop9 from '../../../../hooks/useTop9';

export default function DayList() {

    // const[hera,newHera] = useState([])

    // const fetchTop=async()=>{
    //     const response= await getTopRated()
    //     console.log(response.data)
    //     newHera(response.data.results)
    // }

    
    const{hera} = MainTop9();
    console.log(hera)
    
    
    // const haha = hera.slice(0,11)
    
    
    return (
        <>
        <Top9cards top9={hera} />
    
    </>
  )
  
}

