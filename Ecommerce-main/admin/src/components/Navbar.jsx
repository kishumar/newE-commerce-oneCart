import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import logo from "../assets/vcart logo.png"
import { AuthDataContext } from "../context/AuthContext";
import { AdminDataContext } from './../context/AdminContext';
import axios from "axios"
import Loading from './Loading';
import { toast } from 'react-toastify';
const Navbar = () => {

  let navigate = useNavigate()
let {serverUrl}= useContext(AuthDataContext)
let {getAdmin}= useContext(AdminDataContext)
const [loading , setLoading] = useState(false)


 const logout = async()=>{
  setLoading(false)
  try {
    const result = await axios.get(serverUrl + "/api/auth/logout", {
      withCredentials: true })
      console.log(result.data)
      toast.success("Admin Logout")
      setLoading(false)
      getAdmin()
      navigate("/login")
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
 }
  return (
    <div className='w-[100vw] h-[70px] bg-[#dcdbdbf8] z-10 fixed top-0 flex items-center justify-between px-[30px] overflow-x-hidden shadow-md shadow-black'>
      <div className='w-[30%] flex items-center justify-start gap-[10px] cursor-pointer' onClick={()=> navigate("/")}>
        <img className='w-[30px] ' src={logo} alt="" />
        <h1 className='text-[25px] text-[black] font-semibold'>OneCart Admin</h1>

      </div>
        <button onClick={logout} className='text-[15px] hover:bg-[2px] border-[#89daea] py-[10px] bg-[black] px-[20px] rounded-2xl cursor-pointer  text-white'>{loading ? <Loading/> : "Logout"}</button>
    </div>
  )
}

export default Navbar