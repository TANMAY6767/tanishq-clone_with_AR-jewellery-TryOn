import React, { useRef, useState } from 'react';
import './NewForYou.css';
import BtnBox from '../../Items/BtnBox.jsx';
import data_product from '../../Assets/TopSell.js';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../../CustomArrows.jsx';
import Divider from './divider.jpg';
import Collection_1 from './pretty-pink.jpg'
import Collection_2 from './trending-earrings.jpg'
import Collection_3 from './modern-designs.jpg'

const NewForYou = (props) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        infinite: false,  // Disable infinite looping
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => setCurrentSlide(next),
        afterChange: (index) => {
            setCurrentSlide(index);
            if (index >= data_product.length - 4) {
                setTimeout(() => {
                    sliderRef.current.slickGoTo(0); // Jump to the start of the Boxs
                }, 2500); // Adjust delay if needed
            }
        },
        responsive: [
            {
                breakpoint: 1024, // Adjust based on your design
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768, // Adjust based on your design
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480, // Adjust based on your design
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    return (
        <div className='topsell'>
            <div className='dialaouge'>
                <h>New For You!</h>
                <p>Our latest releases, just for you !</p>
            </div>
            
            <div className='divider'>
                <img src={Divider} className='divider-img' alt='Divider' />
            </div>
            
            <div className='wrapper'>
                 <div><BtnBox key={1}
                        id={1}
                        name="no1"
                        image={Collection_1}
                        
                    /></div>
                <div><BtnBox key={2}
                        id={2}
                        name="no2"
                        image={Collection_2}
                        
                    /></div>
                <div><BtnBox key={3}
                        id={3}
                        name="no3"
                        image={Collection_3}
                        
                    /></div>
            </div>
               
            
        </div>
    );
}

export default NewForYou;
