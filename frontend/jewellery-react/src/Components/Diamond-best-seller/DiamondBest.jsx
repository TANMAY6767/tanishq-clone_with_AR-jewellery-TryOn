import React, { useRef, useState,useEffect } from 'react';
import './DiamondBest.css';
import Item from '../Items/Items.jsx';
import data_product from '../Assets/DiamondSell.js';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../CustomArrows.jsx';
import Divider from './divider.jpg';

const DiamondBest = (props) => {

    const [allproducts, setAllProducts] = useState([]);
    const sliderRef = useRef(null);

    const fetchInfo = async () => { 
        const response = await fetch('https://tanishq-clone-backend.onrender.com/allproducts');
        const data = await response.json();
        setAllProducts(data);
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <div className='diamondSell'>
            <div className='dialaouge'>
                <h>Diamond Best Sellers</h>
                <p>Dazzling diamond jewellery, now at delightful prices</p>
            </div>
            
            <div className='divider'>
                <img src={Divider} className='divider-img' alt='Divider' />
            </div>
            <Slider
                {...settings}
                className='top-item-slider'
                ref={sliderRef}
            >
                {allproducts.slice(0, 12).map((item, i) => {
                    
                    if(item.gender==="kid"){
                        return <Item
                        key={i}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        new_price={item.new_price}
                        
                    />
                      }
                })}
            </Slider>
        </div>
    );
}

export default DiamondBest;
