import { useContext, useState } from "react"
import { AdminContext } from "../../context/AdminContext"
import { useEffect } from "react";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import {MoonLoader} from 'react-spinners'

export const AllApointment = () =>{
  const {aToken,appointments,getAllAppointments,cancelAppointment} = useContext(AdminContext);
  const {calculateAge,slotDateFormat} = useContext(AppContext)

    const [loading, setLoading] = useState(true);



  useEffect(() =>{
    const fetchData = async () => {
    if (aToken) {
      setLoading(true); 
      await getAllAppointments() 
      setLoading(false); 
    }
  };
  fetchData();
  },[aToken])


  if (loading) {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <p className="text-gray-500 animate-pulse text-lg">Please wait...</p>
      <MoonLoader color="#0086db" size={18} speedMultiplier={1} />
    </div>
  );
}


  return(
    <>
      <div className="w-full max-w-6xl m-5">
        <p className="mb-3 text-lg font-medium">All Apointment</p>
        <div className="bg-white border rounded min-h-[60vh] text-sm max-h-[80vh] overflow-y-scroll">
          <div className="max-sm:hidden grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Data & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Action</p>
          </div>
          {
            appointments.map((item,index) =>{
              return(
                <>
                  <div key={index} className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50">
                    <p className="max-sm:hidden">{index+1}</p>
                    <div className="flex items-center gap-2">
                      <img className="w-8 h-8 rounded-full" src={item.userData.image} alt="" />
                      <p>{item.userData.name}</p>
                    </div>
                    <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
                    <p>{slotDateFormat(item.slotDate)},{item.slotTime}</p>
                    <div className="flex items-center gap-2">
                      <img className="w-8 h-8 bg-gray-200 rounded-full" src={item.docData.image} alt="" />
                      <p>{item.docData.name}</p>
                    </div>
                    <p>TK. {item.docData.fees}</p>
                    {
                      item.cancelled
                      ? <p className="text-red-400 text-xs font-medium">Cancelled</p>
                      : item.isCompleted
                      ? <p className="text-green-500 text-xs font-medium">Completed</p>
                      :<img onClick={()=>cancelAppointment(item._id)} className="w-10  cursor-pointer" src={assets.cancel_icon} alt="" />
                    }
                  </div>
                </>
              )
            })
          }
        </div>
      </div>
    </>
  )
}