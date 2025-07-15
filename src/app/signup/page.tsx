'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const page = () => {

  const [userData,setUserData] = useState({
    username:'',
    email:'',
    password:'',
  })

  const [loading,setLoading] = useState(false)

  const router = useRouter()

  const DataSubmition = async ()=>{
    try {

      setLoading(true)

      const response = await axios.post("/api/users/signup",userData)
      
      console.log("user Data.........",response);

      toast.success("Signup Successful")

      router.push('/login')

    } catch (error:any) {
      console.log("Signup failed");
      toast.error("Signup Failed. Try Again...")
    }

  }

  // useEffect(()=>{
  //   if
  // },[userData])


  return (
    <>
    <div className='max-w-md mx-auto mt-24 p-6 shadow rounded border-2 flex flex-col gap-4'>

<h2 className='text-2xl font-bold mb-4 text-center'>{loading ? "Processing" : "Sign Up"}</h2>

      <label htmlFor='username'>Username:</label>
      <input type='text' value={userData.username} onChange={(e)=>setUserData({...userData,username:e.target.value})} id='username' name='username' placeholder='Username' className='border p-3 rounded' required />
      
      <label htmlFor='email'>Email:</label>
      <input type='email' value={userData.email} onChange={(e)=>setUserData({...userData,email:e.target.value})} id='email' name='email' placeholder='Email' className='border p-3 rounded' required />
      
      <label htmlFor='password'>Password:</label>
      <input type='password' value={userData.password} onChange={(e)=>setUserData({...userData,password:e.target.value})} id='password' name='password' placeholder='Password' className='border p-3 rounded' required />

      <button type='submit' onClick={DataSubmition} disabled={loading} className="bg-black-50 font-bold border-2 border-white p-3 rounded hover:bg-white hover:text-black">{loading ? "Loading" : "Sign Up"}</button>

           <span className='text-center'>Already have an account? <Link href='/login' className='text-blue-500 hover:underline'>LogIn</Link></span>
    </div>
    </>
  )
}

export default page
