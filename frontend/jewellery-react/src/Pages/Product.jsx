import { useEffect,useContext, useState } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom';
import Breadcrums from '../Components/Breadcrums/Breadcrums';
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay.jsx';


function Product() {
  
  const {products} = useContext(ShopContext);
  const {productId} = useParams();
  const [product,setProduct] = useState(false);

  useEffect(()=>{
    setProduct(products.find((e)=>e.id === Number(productId)))
  },[products,productId])
  return (
    <>
      <div>
        
        <ProductDisplay product={product}/>
      </div>
      
    </>
  )
}

export default Product
