import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { clearData } from "../../redux/slice/userSlice";
import { useNavigate } from "react-router-dom";

export default function AdminLoggedIn(props) {

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
          <p>Welcome back {props.userName}</p>
          <img className="rounded-[50%] w-[5rem]" src={props.userImage}></img>
        </div>
        {dropDown && 
          <div className="absolute bottom-0 left-40 top-10 cursor-pointer">
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
