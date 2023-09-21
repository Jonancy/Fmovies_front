import React, { useState } from "react";
import logo from '../../assets/FMovies-Logo.png'
import { AiOutlineSearch, AiOutlineFilter } from 'react-icons/ai';
import { BsArrowRight } from 'react-icons/bs';
import useWindowState from "../../hooks/useWindow";
import Register from "../../features/auth/Register";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserLoggedIn from "./user";
import AdminLoggedIn from "./admin";

export default function Navbar() {

    const id = useSelector((state)=> state.user.userId)
    const userName = useSelector((state)=>state.user.userName)
    const userImage = useSelector((state)=>state.user.userImage)
    const roles = useSelector((state)=>state.user.role)

    console.log(userName)
    console.log(userImage)
    console.log(roles)
    
    const [open, setOpen] = useState(true);
    const [windowWidth] = useWindowState();
    const[sign,Up] = useState(false)
    
    const navigate = useNavigate()

    const toggleOpen = () => {
        setOpen(!open);
    };


    const Sig=()=>{
        Up(!sign)
    }

    const[log,inn] = useState(false)

    const Cross=()=>{
        inn(!log)
    }




    const Respons = () => {

        if (windowWidth <= 450) {
            return (

                <>

                    {open ?
                        (<div >
                            <div className="flex  rounded-[20px] justify-center items-center text-neutral-600 p-2 pt-5">
                                <AiOutlineSearch className="text-blue-500 text-4xl" onClick={toggleOpen} />
                            </div>
                        </div>) :
                        <div className="flex flex-col items-center justify-center">

                            <div >
                                <div className="flex  rounded-[20px] justify-center items-center text-neutral-600 p-2 pt-6">
                                    <AiOutlineSearch className="text-blue-500 text-2xl " onClick={toggleOpen} />
                                </div>
                            </div>

                            <div className=" w-[100%] pt-6">
                                <div className="flex bg-black rounded-[20px] justify-between p-2 justify-center items-center text-neutral-600">
                                    <div className="flex items-center justify-center bg-neutral-700 rounded-[20px] text-neutral-400 p-1 text-sm">
                                        <AiOutlineFilter />
                                        <p>Filter</p>
                                    </div>
                                    <div>
                                        <input className="w-[50%] sm:w-full outline-none bg-black text-neutral-600" placeholder="Search movies..." />
                                    </div>
                                    <div>
                                        <AiOutlineSearch className="text-blue-500 text-2xl" />
                                    </div>
                                </div>
                            </div>
                        </div>


                    }
                </>
            )

        } else {

            return (
                <div className="mt-[15px] w-[40%]">
                    <div className="flex bg-black rounded-[20px] justify-between p-2 justify-center items-center text-neutral-600">
                        <div className="flex items-center justify-center bg-neutral-700 rounded-[20px] text-neutral-400 p-1 text-sm">
                            <AiOutlineFilter />
                            <p>Filter</p>
                        </div>
                        <div>
                            <input className="w-[50%] sm:w-full outline-none bg-black text-neutral-600" placeholder="Search movies..." />
                        </div>
                        <div>
                            <AiOutlineSearch className="text-blue-500 text-2xl" />
                        </div>
                    </div>
                </div>
            );
        }
    }


    return (
        <nav >
            <div className="">
                <div className="flex justify-between">
                    <div className="flex items-center cursor-pointer" onClick={()=> navigate('/home')}>
                        <img src={logo} className="w-[9rem]" alt="Logo" />
                    </div>
                    {Respons()}
                {id?(
                 roles==='user'?
                (<UserLoggedIn userImage={`http://localhost:5000/${userImage}`} userName={userName}/>): <AdminLoggedIn userImage={`http://localhost:5000/${userImage}`} userName={userName} />
                )
                :
                
                    <div className="flex justify-center items-center cursor-pointer " onClick={()=>navigate('/login')}>
                        <div className="flex justify-center items-center border-2 rounded-[20px] mr-6 pr-4 pl-4 p-2 "  onClick={Cross}>

                        <p>Login</p>
                        <div className="w-[10px]"></div>
                        <BsArrowRight />
                    </div>
                        </div>
                }
                </div>
                {/* {log && <Register cros={Cross} />} */}
            </div>
        </nav>
    );
}
