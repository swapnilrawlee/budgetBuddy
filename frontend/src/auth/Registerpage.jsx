import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import axiosInstance from '../Utils/axios'
import ImageCompo from '../ImageCompo'

const Registerpage = () => {
  const Navigate = useNavigate()

  const [name ,setName] =useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const submitHandler = async(e) => {
    e.preventDefault()
    try {
      const response = await axiosInstance.post('/api/register',{name ,email,password})
      console.log('Registered successfully:', response)
      if(response.status ===200){
        Navigate('/login')
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className='w-screen h-screen relative flex justify-center flex-col items-center  '>
  <h1 className="absolute text-2xl mb-4 p-4  z-10 top-0 left-0 font-serif">
        Budget<span className="text-red-500">Buddy</span>
      </h1>       
      <ImageCompo/>
        <form onSubmit={submitHandler} className='flex w-[30%] h-[70%] justify-center flex-col items-center absolute left-[15%] top-[20%]  text-red-500 p-5 gap-4 rounded-lg backdrop-sepia-0 bg-white/90 '>
            <h1 className='text-3xl my-6'>Registration</h1>
            <input type="text" placeholder='Name' name='name' className=' border-2 p-2 rounded-md' value={name} onChange={(e)=>setName(e.target.value)}/>
            <input type="text" placeholder='Email' name='email'  className=' border-2 p-2 rounded-md' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder='Password' name='password' className=' border-2 p-2 rounded-md' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button type='submit' className='w-[200px] h-[50px] bg-red-500 text-white rounded-md p-2'>Register</button>
            <p className='text-sm '>Already have an account? <Link to={'/login'}>Login</Link></p>
        </form>
      
    </div>
  )
}

export default Registerpage
