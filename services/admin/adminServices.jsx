import { userHttp } from "../userService/mainUserService"


export const getAllUser=()=>{
    const res = userHttp.get('/userDetails')
    return res
    
}