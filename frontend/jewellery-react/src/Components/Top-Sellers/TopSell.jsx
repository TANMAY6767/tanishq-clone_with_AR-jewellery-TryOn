import React, { useRef, useState, useEffect } from 'react';
import './TopSell.css';
import Item from '../Items/Items.jsx';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../CustomArrows.jsx';
import Divider from './divider.jpg';

const Topsell = (props) => {
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
    }
    


    return (
        <div className='topsell'>
            <div className='dialaouge'>
                <h>Top Sellers</h>
                <p>Love the most to bought the most</p>
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
                        if (item.gender === "women") {
                            return (
                                <Item
                                    key={i}
                                    id={item.id}
                                    name={item.name}
                                    image={item.image}
                                    new_price={item.new_price}
                                />
                            );
                        }
                    })}
                </Slider>
          

        </div>
    );
}

export default Topsell;
