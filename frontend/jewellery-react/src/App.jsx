import { useState } from 'react'
import Homepage from './Pages/Homepage'
import ShopCategory from './Pages/ShopCategory.jsx'
import Alljewel from './Pages/All-jewellry.jsx'
import Product from './Pages/Product.jsx'
import LoginSignup from './Pages/LoginSignup.jsx'
import Cart from './Pages/Cart.jsx'
import Navbar from './Components/Navbar/Navbar.jsx'
import ModalEarring from './Components/ProductDisplay/VirtualTryOn.jsx'
import ModalNecklace from './Components/ProductDisplay/VRnecklace.jsx'
import Footer from './Components/Footer/Footer.jsx'
import { BrowserRouter,Routes,Route } from "react-router-dom";
import banner_1 from './Pages/assets/chains_banner.jpg'
import banner_2 from './Pages/assets/earrings_banner.jpg'
import banner_3 from './Pages/assets/pendants_banner.jpg'
import banner_4 from './Pages/assets/rings_banner.jpg'

import SearchResultsPage from './Components/Navbar/SearchResultsPage.jsx'
import banner_5 from './Pages/assets/chains_banner.jpg'
import banner_6 from './Pages/assets/earrings_banner.jpg'
import banner_7 from './Pages/assets/pendants_banner.jpg'
import banner_8 from './Pages/assets/rings_banner.jpg'

import banner_9 from './Pages/assets/chains_banner.jpg'
import banner_10 from './Pages/assets/earrings_banner.jpg'
import banner_11 from './Pages/assets/pendants_banner.jpg'
import banner_12 from './Pages/assets/rings_banner.jpg'

import banner_13 from './Pages/assets/chains_banner.jpg'

export const backend_url = 'http://localhost:5039';
export const currency = '₹';


function App() {
  

  return (
    <>
      
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Homepage/>}/>
          <Route path='/All-Jewellery' element={<Alljewel banner={banner_1} category="All-Jewellery"/>}/>
          <Route path='/Mangalsutra' element={<ShopCategory banner={banner_2} category="mangalsutra"/>}/>
          <Route path='/Gold Coins' element={<ShopCategory banner={banner_3} category="gold-coin"/>}/>
          <Route path='/Earrings' element={<ShopCategory banner={banner_4} category="earring"/>}/>
          <Route path='/Chains' element={<ShopCategory banner={banner_5} category="chain"/>}/>
          <Route path='/Bracelet' element={<ShopCategory banner={banner_6} category="bracelet"/>}/>
          <Route path='/Nosepins' element={<ShopCategory banner={banner_7} category="nose-pin"/>}/>
          <Route path='/Rings' element={<ShopCategory banner={banner_8} category="finger-ring"/>}/>
          <Route path='/Pendants' element={<ShopCategory banner={banner_9} category="pendant"/>}/>
          <Route path='/Bangle' element={<ShopCategory banner={banner_10} category="bangle"/>}/>
          <Route path='/Necklace' element={<ShopCategory banner={banner_11} category="necklace"/>}/>
          <Route path='/Necklace-Set' element={<ShopCategory banner={banner_12} category="necklace-set"/>}/>
          <Route path='/Pendant-Earring' element={<ShopCategory banner={banner_13} category="pendant-earring"/>}/>
          <Route path='/women' element={<ShopCategory banner={banner_11} category="1" gender="women"/>}/>
          <Route path='/men' element={<ShopCategory banner={banner_12} category="2" gender="men"/>}/>
          <Route path='/kids' element={<ShopCategory banner={banner_13} category="3" gender="kid"/>}/>
          <Route path='/Modalearring' element={<ModalEarring/>}></Route>
          <Route path='/Modalnecklace' element={<ModalNecklace/>}></Route>
          <Route path='/product' element={<Product/>}>
          
          <Route path=':productId' element={<Product/>}/>
          </Route>
          <Route path="/search" element={<SearchResultsPage />} />
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  )
}

export default App
