import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import TeamLeader from './components/TeamLeader/Teamleader'
import { Outlet } from 'react-router-dom'
import TeamMember from './components/TeamMember/TeamMember'




function Layout() {
  const [count, setCount] = useState(0)

  return (
    <>
      
    <Navbar />
    <Outlet/>
    <Home />
   
    
    </>
  )
}

export default Layout
