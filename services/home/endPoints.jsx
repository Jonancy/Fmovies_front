
import axios from "axios";
import http from "../mainService";


const apiKey = import.meta.env.VITE_API_Key;

export const getSuggestions =()=>{
    const res = http.get(`/now_playing`, {
        params:{
            api_key:apiKey
        }
    })
    return res
}

export const getPopular=()=>{
    const res = http.get(`/popular`,{
        params:{
            api_key:apiKey
        }
    })
    return res
}


export const getTopRated=()=>{
    const res = http.get(`/top_rated`,{
        params:{
            api_key:apiKey
        }
    })
    return res
}

// const getSuggestions=()=>{
//     const response = http.get('/now_playing?api_key=20417ea93926bf18e386121e3e3f564f')
//     return response;
// }



