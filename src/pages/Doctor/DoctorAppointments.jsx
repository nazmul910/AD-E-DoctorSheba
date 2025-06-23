import { useContext } from "react"
import { DoctorContext } from "../../context/DoctorContext"
import { useEffect } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";

export const DoctorAppointments = () =>{
  const {appointments,getAppointments,dToken,completedAppointment,cancelAppointment} = useContext(DoctorContext);
  const {calculateAge,slotDateFormat} = useContext(AppContext)



  useEffect(() =>{
    if(dToken){
      getAppointments()
    }
  },[dToken])
  return(
    <>
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>
      <div className="bg-white border rounded min-h-[60vh] text-sm max-h-[80vh] overflow-y-scroll">
        <div className="max-sm:hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
            <p>#</p>
            <p>Patient</p>
            <p>Payment</p>
            <p> Age</p>
            <p>Data & Time</p>
            <p>Fees</p>
            <p>Action</p>
          </div>
          {
            appointments.reverse().map((item,index) =>{
              return(
                <>
                
                  <div key={index} className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50">
                    <p className="max-sm:hidden">{index+1}</p>
                    <div className="flex items-center gap-2">
                      <img className="w-8 h-8 rounded-full" src={item.userData.image} alt="" />
                      <p>{item.userData.name}</p>
                    </div>
                    <div>
                      <p className="text-xs inline border border-primary px-2 rounded-full">{item.paymetn ? 'Online' : 'CASH'}</p>
                    </div>
                    <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
                    <p className="max-sm:hidden">{slotDateFormat(item.slotDate)}-{item.slotTime}</p>
                    <p className="max-sm:hidden">Tk. {item.amount}</p>

                    {
                      item.cancelled
                      ? <p className="text-red-500 text-xs font-medium">Cancelled</p>
                      : item.isCompleted
                      ? <p className="text-green-600 text-xs font-medium">Completed</p>
                      : <div className="flex items-center">
                      <img onClick={() =>cancelAppointment(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="" />
                      <img onClick={() => completedAppointment(item._id)} className="w-10 cursor-pointer" src={assets.tick_icon} alt="" />
                    </div>
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