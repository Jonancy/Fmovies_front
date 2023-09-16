import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loginUser, verifyToken } from '../../services/user/userLogin'
import { useDispatch } from 'react-redux'
import { setData } from '../../redux/slice/userSlice'
import Swal from 'sweetalert2'


export default function Login() {

    const dispatch = useDispatch()

    const navigate = useNavigate();

    const[res,setRes] = useState({
        email:"",
        password:"",
    })


    const onChange=(e)=>{
        setRes({...res,[e.target.name]:e.target.value})
    }



    const submit=async(e)=>{
        e.preventDefault()
        try{
            //!For loggin User then Jwt is received in response
            const response = await loginUser(res)
            // console.log(response.data)
            const message = response.data.message


            if(response.data.success){
                console.log(response.data)
                // console.log(response.data.data.token)
                const jwtToken = response.data.data.token
                console.log(jwtToken)
                const resp = await verifyToken(jwtToken)
                console.log(resp.data)

                // const userToken = response.data.data.token
                const userId = resp.data.data.id
                const userName = resp.data.data.name
                const userImage = resp.data.data.image
                const role = resp.data.data.role
                // console.log(userToken)
                //?For setting the data 
                //!Should send together not separate to store in redux
                dispatch(setData({userId:userId, userName:userName, userImage:userImage,role:role}))
                // dispatch(setData({userImage:userImage}))
                navigate('/')
                Swal.fire({
                    icon:'success',
                    text:message
                
                })
            }else{
                Swal.fire({
                    icon:'error',
                    text:message
                })
            }

            
        }catch(e){
            console.log(e)
        }
    }


  return (
    <>
        <div className='flex justify-center items-center h-screen bg-black text-white' onSubmit={(e)=>submit(e)}>
            <form className='border-2 border-black p-8 bg-neutral-800 rounded-[5%]'>
                <div className=' flex flex-col justify-start items-start p-6'>
                    <div>
                    <p className='text-2xl'>Welcome Back</p>
                    </div>
                    <div className='pt-6 flex flex-col '>
                        <label for='email'>Email</label>
                        <input className='bg-neutral-700 p-2 outline-none' type='email' placeholder='Enter your email' id='email' name='email' onChange={(e)=>onChange(e)}></input>
                    </div>
                    <div className='pt-4 pb-7 flex flex-col'>
                        <label for='password]'>Password</label>
                        <input className='bg-neutral-700 p-2 outline-none ' placeholder='Enter your password' id='password' name='password' onChange={(e)=>onChange(e)}></input>
                    </div>
                    <button className=' w-full flex justify-center bg-cyan-600' type='submit' >
                        <p className='p-2'>Login</p>
                    </button>
                    <p className='text-cyan-600 cursor-pointer hover:text-cyan-800 text-sm' onClick={()=>navigate('/register')}>Sign up for free</p>
                </div>

            </form>
        </div>
    </>
  )
}
