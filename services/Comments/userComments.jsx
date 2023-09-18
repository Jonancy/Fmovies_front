import { userHttp } from "../userService/mainUserService"


const addUserComments=({id,comment})=>{
   
    const res = userHttp.post(`/addComment/${id}`,{comment:comment})
    return res

}

const getUserComments=({id})=>{
    const res = userHttp.get(`/getUserComments/${id}`)
    return res
}

export {addUserComments,getUserComments}