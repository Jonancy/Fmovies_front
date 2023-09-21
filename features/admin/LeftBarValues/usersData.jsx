import React, { useEffect, useState } from "react";
import { BsPlus } from "react-icons/bs";
import { getAllUser } from "../../../services/admin/adminServices";

export default function UsersData() {
  
  const[user,setUser]= useState([])

  const getUsers=async()=>{
    try{
      const resp = await getAllUser()
      console.log(resp.data)
      setUser(resp.data.data.User)
    }catch(e){
      console.log(e)
    }
  } 

  useEffect(()=>{
    getUsers()
  },[])

  return (
    <>
      <div className="w-full ">
        <div className="flex flex-col  pl-[5rem] pr-[5rem] ">
          <div className="flex justify-between pb-6">
            <div className="flex">
              <BsPlus />
              <p>Manage User</p>
            </div>
            <div className="">
              <p>Recently Active</p>
            </div>
          </div>
          <div className="w-full flex justify-center ">
            <table className="w-full max-w-screen-xl">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2">Image</th>
                  <th className="py-2">Name</th>
                  <th className="py-2">Email</th>
                  <th className="py-2">Last Active</th>
                  <th className="py-2">Role</th>
                </tr>
              </thead>
              <tbody>
              {user.map((user)=>(
                <tr className="text-center">
                  <td className="py-2 "><img className="rounded-[50%] w-[4rem]" src={`http://localhost:5000/${user.image}`}></img></td>
                  <td className="py-2">{user.name}</td>
                  <td className="py-2">{user.email}</td>
                  <td className="py-2">1 hr</td>
                  <td className="py-2">{user.role}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </div>
          </div>
        </div>
    </>
  );
}
