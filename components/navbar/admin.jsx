import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearData } from "../../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";
import ProfilePic from "../profilePic/profilePic";

export default function AdminLoggedIn({userName,userImage}) {

  const[dropDown,setDropDown] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const dropItems=()=>{
    setDropDown(!dropDown)
  }

  const LogOut=()=>{
    dispatch(clearData())
  }
  

  return (
    <>
      <div className="relative">
        <div className="flex justify-center items-center  " onClick={dropItems}>
          <p>{userName}</p>
          <ProfilePic image={userImage}/>
        </div>
        {dropDown && 
          <div className="absolute bottom-0 right-0 top-10 cursor-pointer">
              <div onClick={LogOut}> 
                LogOut
              </div>
              <div onClick={()=> navigate('/admin/dashboard')}> 
                DashBoard
              </div>
              <div> 
                Change
              </div>
          </div>
        }
      </div>
    </>
  );
}
