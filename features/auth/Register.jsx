import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
// import { addUser } from "../../services/user/userLogin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addUser } from "../../services/user/userLogin";
import { useForm } from "react-hook-form";

export default function Register(props) {
  const [ehe, hehe] = useState({
    name: "",
    email: "",
    password: "",
    // image:''
  });

  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");


  //!Will validate later on 
  const { register, handleSubmit } = useForm();

  //!For navigate to another page
  const navigate = useNavigate();

  //!Im using useForm instead of manually targeting the value
  // const onChang=(e)=>{
  //     hehe({...ehe,[e.target.name]:e.target.value})
  // }

  // const Submit=async(e)=>{
  //     try{
  //         const response = await addUser(ehe)
  //         console.log(response.data.message)
  //         e.preventDefault()
  //     }catch(e){
  //         console.log(e)
  //     }

  // }

  const Submit = async (e) => {
    
    e.preventDefault()
    console.log("name:", name);
    console.log("email:", email);
    console.log("password:", password);
    console.log("image:", image);
    try {
      // const response = await axios.post('http://localhost:5000/api/users/addUser', ehe)
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);

        console.log(formData.get("image"));
        console.log(name);
        console.log(formData.get("name"));

   
    const response = await addUser(formData);
      const message = response.data.message;
      console.log(response.data.message);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          text: message,
        });
        navigate("/login");
      } else {
        // alert(response.data.message)
        Swal.fire({
          icon: "error",
          title: "Oopps...",
          text: message,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  //!Image not uploaded noice

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-black text-white">
        <form
          className="border-2 border-black p-8 bg-neutral-800 rounded-[5%]"
          onSubmit={(e)=>Submit(e)} enctype="multipart/form-data"
        >
          <div className=" flex flex-col justify-start items-start p-6">
            <div>
              <p className="text-2xl">Account Sign Up</p>
            </div>
            <div className="pt-8 flex flex-col">
              <label for="name">Name</label>
              <input
                className="bg-neutral-700 p-2 outline-none "
                placeholder="Enter your Name"
                id="name"
                name="name"
                // {...register("name", { required: true })}
                onChange={(e) => setName(e.target.value)}
              ></input>
            </div>
            <div className="pt-4 flex flex-col ">
              <label for="name">Email</label>
              <input
                className="bg-neutral-700 p-2 outline-none"
                type="email"
                name="email"
                placeholder="Enter your email"
                id="name"
                // {...register("email", { required: true })}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            <div className="pt-4 pb-7 flex flex-col">
              <label for="name">Password</label>
              <input
                className="bg-neutral-700 p-2 outline-none "
                placeholder="Enter your password"
                name="password"
                id="name"
                // {...register("password", { required: true })}
                onChange={(e) => setPassword(e.target.value)}
              ></input>
            </div>
            <div>
              <input
                className=""
                type="file"
                name="image" // Make sure the name attribute is set to "image"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>
            <button
              className=" w-full flex justify-center bg-cyan-600 cursor-pointer" type="submit"
            >
              <p className="p-2">Sign In</p>
            </button>
            <p
              className="text-cyan-600 cursor-pointer hover:text-cyan-800 text-sm"
              onClick={() => navigate("/login")}
            >
              Already have an account?
            </p>
          </div>
        </form>
      </div>
    </>
  );
}
