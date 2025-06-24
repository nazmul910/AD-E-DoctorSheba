import { useContext, useState } from "react"

import { AdminContext } from "../context/AdminContext"
import axios from 'axios'
import { toast } from "react-toastify"
import { DoctorContext } from "../context/DoctorContext"

import {ClipLoader} from 'react-spinners'

export const Login = () =>{
  const [state,setState] = useState('Admin')

  const [email,setEmail] = useState('') 
  const [password,setPassword] = useState('')

      const [loading, setLoading] = useState(false);

  const {setAToken,backendUrl} = useContext(AdminContext);
  const {setDToken} = useContext(DoctorContext) 


  const onSubmitHandler = async (event) =>{
      event.preventDefault();

      try {
        if(state === 'Admin'){
          setLoading(true)
          const {data} = await axios.post(backendUrl + '/api/admin/login',{email,password})
          if(data.success){
            localStorage.setItem('aToken',data.token);
            setAToken(data.token);
            toast.success(data.message)
            setLoading(false)
          }else{
            toast.error(data.message)
            setLoading(false)
          }
        }else{
          setLoading(true)
          const {data} = await axios.post(backendUrl + '/api/doctor/login',{email,password})
          if(data.success){
            localStorage.setItem('dToken',data.token); 
            setDToken(data.token);
            console.log("dToken: ",data.token)
            toast.success(data.message)
            setLoading(false)
          }else{
            toast.error(data.message)
            setLoading(false)
          }
        }
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
  }

  return(
    <>
      <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
        <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
          <p className="text-2xl font-semibold m-auto"><span className="text-primary">{state}</span> Login</p>
          <div className="w-full">
            <p>Email</p>
            <input onChange={(e) => setEmail(e.target.value)} value={email} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="email" required />
          </div>
          <div className="w-full">
            <p>Password</p>
            <input onChange={(e) => setPassword(e.target.value)} value={password} className="border border-[#DADADA] rounded w-full p-2 mt-1" type="password" required />
          </div>
          {/* <button className="bg-primary text-white w-full py-2 rounded-md text-base">Login</button> */}
          <button type="submit" className="bg-primary text-white w-full flex justify-center items-center gap-x-2 py-2 rounded-md text-base">Login {loading ?<ClipLoader
  color="#ffffff"
  size={18}
/>:''}</button >
          {
            state === 'Admin'
            ? <p>Doctor Login? <span className=" text-primary underline cursor-pointer" onClick={() => setState('Doctor')}>Click here</span></p>
            : <p>Admin Login? <span className=" text-primary underline cursor-pointer" onClick={() => setState('Admin')}>Click here</span></p>
          }
        </div>
      </form>
    </>
  )
}