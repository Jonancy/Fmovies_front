import React, { useEffect, useState } from 'react'
import { getTopRated } from '../../../../../services/home/endPoints'


//!This is made as a hook in another folder its useless lol

export default function mainTop9() {

    const[hera,newHera] = useState([])

    const fetchTop=async()=>{
        const response= await getTopRated()
        console.log(response.data)
        newHera(response.data.results)
        
    }

    useEffect(()=>{
        fetchTop()
    },[])

    
    
  return {hera}
}
