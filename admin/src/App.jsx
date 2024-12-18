import { useState } from 'react'
import Navbar from './Components/Navbar/Navbar.jsx'
import './App.css'
import Admin from './Pages/Admin/Admin.jsx'


export const backend_url = 'http://localhost:5039';
export const currency = '₹';
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Admin/>
    </>
  )
}

export default App
