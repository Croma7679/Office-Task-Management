import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import TeamLeader from './components/TeamLeader/Teamleader'
import TeamMember from './components/TeamMember/TeamMember'
import { Outlet } from 'react-router-dom'





function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    
    <Navbar />
    <Outlet/>
    <Home/>
    <TeamLeader/>
    <TeamMember/>
    
    </>
  )
}

export default App
