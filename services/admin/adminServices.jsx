import { userHttp } from "../userService/mainUserService"


export const getAllUser=()=>{
    const res = userHttp.get('/userDetails')
    return res
    
}

export const userDelete=(id)=>{
    const res = userHttp.delete(`/userDelete/${id}`)
    return res
}