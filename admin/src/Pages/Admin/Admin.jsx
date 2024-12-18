import { useState } from 'react'
import Sidebar from '../../Components/Sidebar/Sidebar.jsx'
import {Routes,Route} from 'react-router-dom'
import AddProduct from '../../Components/AddProduct/AddProduct.jsx'
import ListProduct from '../../Components/ListProduct/ListProduct.jsx'

import './Admin.css'

function Admin() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='admin'>
        <Sidebar/>
        <Routes>
            <Route path='/addproduct' element={<AddProduct/>}/>
            <Route path='/listproduct' element={<ListProduct/>}/>
        </Routes>
      </div>
    </>
  )
}

export default Admin
