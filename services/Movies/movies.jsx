import http from "../mainService"


const apiKey = import.meta.env.VITE_API_Key;

export const getMovie=(id)=>{

    const response = http.get(`/${id}`,{
        params:{
            api_key:apiKey
        }
    })
    return response
}

