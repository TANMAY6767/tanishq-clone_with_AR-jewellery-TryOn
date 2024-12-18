import { useState } from 'react'
import './Breadcrums.css'
import arrow_icon from './arrow.png'

function Breadcrums(props) {
  
    const {product}=props;
  return (
    <>
      <div className='breadcrum'>
        HOME | SHOP | {product.category} |{product.name}
      </div>
      
    </>
  )
}

export default Breadcrums