import { useContext } from 'react';

import { ToastContainer, toast } from 'react-toastify';
import { AdminContext } from '../../context/AdminContext';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { Outlet } from 'react-router-dom';
import { Dashboard } from '../../pages/Admin/Dashboard';
import { Login } from '../../pages/Login';
import { DoctorContext } from '../../context/DoctorContext';



export const AppLayout = ()=>{
  const {aToken} = useContext(AdminContext);
  const {dToken} = useContext(DoctorContext)

  return aToken || dToken ? (
    <>
      <div className='bg-[#F8F9FD]'>
        <ToastContainer/>
        <Navbar/>
        <div className='flex items-start'>
          <Sidebar/>
            <div className='flex-1'>
              <Outlet/>
            </div>
        </div>
      </div>
    </>
  ):(
    <>
      <div className="mx-4 sm:mx-[10%]">
        <ToastContainer/>
        <Login/>
      </div>
    </>
  )
}