import { useContext, useEffect, useState } from "react"
import { AdminContext } from "../../context/AdminContext"
import {MoonLoader} from 'react-spinners'


export const DoctorsList =()=>{
  const {doctors,aToken,getAllDoctors,changeAvailability,deleteDoctor} = useContext(AdminContext);

      const [loading, setLoading] = useState(true);

  useEffect(() =>{
    const fetchData = async () => {
    if (aToken) {
      setLoading(true); 
      await getAllDoctors()
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
      <div className="m-5 max-h-[90vh] overflow-y-scroll">
        <h1 className="text-lg font-medium">All Doctors</h1>
        <div className="w-full flex flex-wrap gap-4 pt-5 gap-y-6">
          {
            doctors.map((item,index) =>{
              const {image,name,speciality,_id,available} = item
              return(
                <>
                  <div key={index} className="border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer gorup">
                    <img className="bg-indigo-50 hover:bg-primary transition-all duration-500 h-[240px] w-full object-cover" src={image} alt="" />
                    <div className="p-4">
                      <p className="text-neutral-800 text-lg font-medium">{name}</p>
                      <p className="text-zinc-600 text-sm">{speciality}</p>
                      <div className="mt-2 flex items-center gap-1 text-sm">
                        <input  onChange={()=> changeAvailability(_id)} type="checkbox" checked={available} />
                        <p>{item.available ? 'Available' : 'Not available'}</p>
                      </div>
                      <div className="w-full mt-1">
                        <button onClick={() => deleteDoctor(_id)} className="py-1 w-full  bg-red-600 text-white">Delete</button>
                      </div>
                    </div>
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