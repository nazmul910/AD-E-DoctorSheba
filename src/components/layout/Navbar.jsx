import { useContext } from 'react'
import {assets} from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { DoctorContext } from '../../context/DoctorContext';
export const Navbar = () =>{

  const {aToken,setAToken} = useContext(AdminContext);
  const {dToken,setDToken} = useContext(DoctorContext);


 const navigate = useNavigate()
  const logout = () =>{
    navigate('/')
    aToken && setAToken('');
    aToken && localStorage.removeItem('aToken');
    dToken && setDToken('');
    dToken && localStorage.removeItem('dToken');
    toast.success('Logout success')
  }

  return(
    <>
      <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
        <div className='flex items-center gap-2 text-xs'>
          <img className='w-28 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="" />
          <p className='border px-2.5 py-0.5 rounded-full border-e-green-500 text-gray-600'>{aToken?'Admin':'Doctor'}</p>
        </div>
        <button onClick={logout} className='bg-primary text-white text-xs py-2 px-4 md:text-sm md:px-10 md:py-2 rounded-full'>Logout</button>
      </div>
    </>
  )
}