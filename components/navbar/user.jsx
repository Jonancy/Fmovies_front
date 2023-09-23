import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearData } from "../../redux/slice/userSlice";
import ProfilePic from "../profilePic/profilePic";

export default function UserLoggedIn({userName,userImage}) {

  const[dropDown,setDropDown] = useState(false)
  const dispatch = useDispatch()

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
          <p>Welcome back {userName}</p>
          <ProfilePic image={userImage}/>
        </div>
        {dropDown && 
          <div className="absolute bottom-0 left-40 top-10 cursor-pointer">
              <div onClick={LogOut}> 
                LogOut
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
