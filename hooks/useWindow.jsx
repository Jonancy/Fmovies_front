import React, { useEffect } from "react";
import { useState } from "react";


export default function useWindowState(){


    const[width,setWidth]= useState(window.innerWidth)
    const[height,setHeight] = useState(window.innerHeight)


    useEffect(()=>{
        
        window.addEventListener('resize',()=>{
            setWidth(window.innerWidth)
            setHeight(window.innerHeight)
        })
    },[width,height])

    return [width,height]
}
