import React, { useEffect, useState } from 'react'
import { getTopRated } from '../services/home/endPoints'


export default function useMainTop9() {

    const[hera,newHera] = useState([])

    const fetchTop=async()=>{
        const response= await getTopRated(2)
        console.log(response.data)
        newHera(response.data.results)
        
    }

    useEffect(()=>{
        fetchTop()
    },[])

    
    
  return {hera}
}
