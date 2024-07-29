import React, { useContext, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageCompo from "../ImageCompo";
import { UserContext } from "../Utils/userContext";

const Loginpage = () => {
const {setUserdata} =useContext(UserContext)

  const Navigate = useNavigate()
  const [email ,setEmail]=useState('')
  const [password , setPassword]=useState('')
  const notify = () => toast("Wow so easy!");


  const submitHandler= async(e)=>{
    e.preventDefault()
    try {
     const response = await axiosInstance.post('/api/login',{email ,password})
     setUserdata(response.data)

      console.log(response)
      if(response.status===200){
        Navigate('/home')

      }

    } catch (error) {
      
    }
  }
  return (
    <div className="w-screen h-screen relative flex justify-center flex-col gap-2 items-center  ">
      <h1 className="absolute text-2xl mb-4 p-4  z-10 top-0 left-0 font-serif">
        Budget<span className="text-red-500">Buddy</span>
      </h1>

     
      <form onSubmit={submitHandler} className="flex w-[30%] h-[70%] justify-center flex-col items-center absolute left-[15%] top-[20%]  text-red-500 p-2 gap-4 rounded-lg backdrop-sepia-0 bg-white/90 ">
        <h1 className="text-2xl my-3">Welcome Back</h1>
        <input
          type="text"
          placeholder="Email"
          name='email'
          className=" border-2 p-2 rounded-md"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name='password'
          className=" border-2 p-2 rounded-md"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-[200px] h-[50px] bg-red-500 text-white  rounded-md p-2"
        >
          Login
        </button>
        <p className="text-sm ">
          Create a account? <Link to={"/register"}>Register</Link>
        </p>
      </form>
   <ImageCompo/>
      <ToastContainer />

    </div>
  );
};

export default Loginpage;
