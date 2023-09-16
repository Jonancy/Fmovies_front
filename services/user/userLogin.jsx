import { userHttp } from "../userService/mainUserService"


export const addUser=(user)=>{
    const response =  userHttp.post('/addUser',user)
    return response
}

export const loginUser=(user)=>{
    const res = userHttp.post('/login',user)
    return res
}


export const verifyToken=(token)=>{
    const res = userHttp.get('/verify',
   { headers:{
    Authorization: `Bearer ${token}`
    }})
    return res
}