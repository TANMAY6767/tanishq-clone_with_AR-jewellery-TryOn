import React, { useContext, useEffect, useState } from 'react';
import './ProductDisplay.css';
import { ShopContext } from '../../Context/ShopContext';
import Breadcrums from '../Breadcrums/Breadcrums';
import star_icon from './star_icon.png';
import star_dull_icon from './star_dull_icon.png';
import { backend_url, currency } from "../../App";

import { Link, useNavigate } from "react-router-dom";

const ProductDisplay = ({ product }) => {
  const { addToCart } = useContext(ShopContext);
  const [videoStream, setVideoStream] = useState(null);

  const navigate = useNavigate();  

  useEffect(() => {
    
    window.scrollTo(0, 0);
    return () => {

      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoStream]);

  const handleTryIt = async () => {
    try {
     
      console.log("Product Jewel Type:", product.category);
      
    
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setVideoStream(stream);
  
    
      if (product.category && product.category.toLowerCase() === "necklace") {
        console.log("Navigating to Modalnecklace");
        navigate("/Modalnecklace", { state: { arImage: backend_url + product.arImage } });
      } else if (product.category && product.category.toLowerCase() === "earring") {
        console.log("Navigating to Modalearring");
        navigate("/Modalearring", { state: { arImage: backend_url + product.arImage } });
        
      }
      else if (product.category && product.category.toLowerCase() === "chain") {
        console.log("Navigating to Modalnecklace");
        navigate("/Modalnecklace", { state: { arImage: backend_url + product.arImage } });
      } else {
        console.error("Unsupported jewel type for AR try-on.");
      }
  
    } catch (error) {
      console.error("Error accessing camera: ", error);
    }
  };
  
  
  

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className='productdisplay'>
        <div className='sub-productdisplay'>
          <div className='jewel'>
            <div className='bread-crum'>
              <Breadcrums product={product} />
            </div>
            <div className='img-disp'>
              <div className='vertical'>
                <div className='cube'><img className='img' src={backend_url + product.image} alt="Product" /></div>
                <div className='cube'><img className='img' src={backend_url + product.image} alt="Product" /></div>
                <div className='cube'><img className='img' src={backend_url + product.image} alt="Product" /></div>
              </div>
              <div className='box'>
                <img className='img' src={backend_url + product.image} alt="Product" />
                <button onClick={handleTryIt}>Try It</button>
              </div>
            </div>
          </div>
          <div className='productdisplay-right'>
            <h1>{product.name}</h1>
            <div className='productdisplay-right-stars'>
              <img src={star_icon} alt="Star" />
              <img src={star_icon} alt="Star" />
              <img src={star_icon} alt="Star" />
              <img src={star_icon} alt="Star" />
              <img src={star_dull_icon} alt="Star" />
              <p>(122)</p>
            </div>
            <div className='productdisplay-right-prices'>
              <div className='productdisplay-right-prices-old'>{currency}{product.old_price}</div>
              <div className='productdisplay-right-prices-new'>{currency}{product.new_price}</div>
            </div>
            <div className='productdisplay-right-description'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi tenetur sequi dolore molestiae quibusdam necessitatibus nostrum illo eos eligendi autem, accusantium, repellat quidem. Voluptatem fugit voluptate ut nemo ipsum maiores!
            </div>
            <div className='productdisplay-right-size'>
              <h1>Select Size</h1>
              <div className='productdisplay-right-sizes'>
                <div>Size 5</div>
                <div>Size 6</div>
                <div>Size 7</div>
                <div>Size 8</div>
                <div>Size 9</div>
              </div>
            </div>
            <button onClick={() => { addToCart(product.id) }}>ADD TO CART</button>
            <p className='productdisplay-right-category'><span>For :</span>{product.gender}</p>
            <p className='productdisplay-right-category'><span>Jewel :</span>{product.jewel}</p>
          </div>
          <div className='jewel-detail'></div>
          <div className='jewel-img'></div>
        </div>
      </div>
      
    </>
  );
};

export default ProductDisplay;
