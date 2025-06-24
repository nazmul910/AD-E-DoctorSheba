import { useContext } from "react"
import { DoctorContext } from "../../context/DoctorContext"
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import {MoonLoader} from 'react-spinners'

export const DoctorProfile = ()=>{

  const {dToken, profileData,setProfileData,getProfileData,backendUrl} = useContext(DoctorContext);

  const [isEdit,setIsEdit] = useState(false)
  const [loading, setLoading] = useState(true);
 
  const updateProfile = async () =>{
    try {
      const updateData = {
        address: profileData.address,
        fees: profileData.fees,
        available: profileData.available,

      }

      const {data} = await axios.post( backendUrl + '/api/doctor/update-profile',updateData,{headers:{dToken}});

      if(data.success){
        getProfileData()
        toast.success(data.message);
        setIsEdit(false);
      }else{
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }


  useEffect(() =>{
     const fetchData = async () => {
    if (dToken) {
      setLoading(true); 
      await getProfileData()
      setLoading(false); 
    }
  };
  fetchData();
  },[dToken])
       if (loading) {
  return (
    <div className="flex justify-center items-center h-[50vh]">
      <p className="text-gray-500 animate-pulse text-lg">Please wait...</p>
      <MoonLoader color="#0086db" size={18} speedMultiplier={1} />
    </div>
  );
}

  return profileData &&(
    <>
    <div>

      <div className="flex flex-col gap-4 m-5">

        <div>
          <img className="bg-primary/80 w-full sm:max-w-64 rounded-lg" src={profileData.image} alt="" />
        </div>

        <div className="flex-1 border border-stone-100 rounded-lg px-8 py-7 bg-white">
          {/* Doctor Info: */}
          <p className="flex items-center gap-2 text-3xl font-medium text-gray-700">{profileData.name}</p>
          <div className="flex items-center gap-2 mt-1 text-gray-600">
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{profileData.experience}</button>
          </div>
          {/* Doctor About */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3">About:</p>
            <p className="text-sm text-gray-600 max-w-[700px] mt-1">
              {profileData.about}
            </p>
          </div>
          <p className="text-gray-600 font-medium mt-4">Appointment fee: 
            <span className="text-gray-800">
             Tk. { isEdit 
                ? <input className="border px-2 border-blue-500" onChange={(e) => setProfileData(prev=> ({...prev,fees:e.target.value}))}  value={profileData.fees}  type="number"/> 
                : profileData.fees}
            </span>
            </p>
          <div className="flex gap-2 py-2">
            <p>Address:</p>
            <p className="text-sm">
              
              { isEdit 
                ? <input className="border py-1 px-2 border-blue-500" onChange={(e) => setProfileData(prev => ({...prev.address, line1:e.target.value}))} value={profileData.address.line1}  type="text" />
                 : profileData.address.line1
              }
              <br /><br />
              { isEdit 
                ? <input className="border py-1 px-2 border-blue-500" onChange={(e) => setProfileData(prev => ({...prev.address, line2:e.target.value}))} value={profileData.address.line2}  type="text" />
                 : profileData.address.line2
              }
              
            </p>
            
          </div>
          <div className="flex gap-1 pt-2">
            <input onChange={() => isEdit && setProfileData(prev => ({...prev,available: !prev.available}))} checked={profileData.available} type="checkbox"  />
            <label htmlFor="" >Available</label>
            {
              isEdit
              ? <p className="text-red-500 block ">"If you want change your Available option"</p>
              : ''
            }
          </div>
            {
              isEdit
              ?<button onClick={updateProfile} className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all duration-300">Save</button>
              : <button onClick={()=> setIsEdit(true)} className="px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all duration-300">Edit</button>
            }
          
          
        </div>
      </div>

    </div>
    </>
  )
} 