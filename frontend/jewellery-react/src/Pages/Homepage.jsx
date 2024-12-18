import { useState } from 'react'
import Navbar from '../Components/Navbar/Navbar.jsx'
import Slider from '../Components/Navbar/MinimalSlider.jsx'
import Topsell from '../Components/Top-Sellers/TopSell.jsx'
import DiamondBest from '../Components/Diamond-best-seller/DiamondBest.jsx'
import ShopByGender from '../Components/Shop-By/Shop-by-Genders/ShopGender.jsx'
import ShopCollection from '../Components/Shop-By/Shop-By-Collection/ShopCollection.jsx'
import NewForYou from '../Components/Shop-By/New-for-You/NewForYou.jsx'
import Category from '../Components/Search-By-Category/Category.jsx'
import ShopByLook from '../Components/Shop-By/Shop-the-Look/ShopLook.jsx'



function Homepage() {
  

  return (
    <>
      <Slider/>
      <Topsell/>
      <DiamondBest/>
      <ShopByGender/>
      <ShopCollection/>
      <NewForYou/>
      <Category/>
      {/* <ShopByLook/> */}
    </>
  )
}

export default Homepage