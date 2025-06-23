import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout';

import {Dashboard} from './pages/Admin/Dashboard'
import {AllApointment} from './pages/Admin/AllApointments'
import {AddDoctor} from './pages/Admin/AddDoctor'
import {DoctorsList} from './pages/Admin/DoctorsList'
import { DoctorDashboard } from './pages/Doctor/DoctorDashboard';
import { DoctorAppointments } from './pages/Doctor/DoctorAppointments';
import { DoctorProfile } from './pages/Doctor/DoctorProfile';
import { Home } from './pages/Home';

const router = createBrowserRouter([
  {
    path:'/',
    element:<AppLayout/>,
    children:[
      {
        path:'/',
        element:<Home/>
      },
      {
       path:'/dashboard',
       element:<Dashboard/>
      },
      {
       path:'/all-appointments',
       element:<AllApointment/>
      },
      {
        path:'/add-doctor',
        element:<AddDoctor/>
      },
      {
        path:'/doctor-list',
        element:<DoctorsList/>
      },
      {
        path:'/doctor-dashboard',
        element:<DoctorDashboard/>
      },
      {
        path:'/doctor-appointments',
        element:<DoctorAppointments/>
      },
      {
        path:'/doctor-profile',
        element:<DoctorProfile/>
      }
    ]
  }
])

const App = ()=>{
  return(
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}

export default App;