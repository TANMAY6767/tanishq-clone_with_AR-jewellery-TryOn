import React, { useRef, useState } from 'react';
import './Category.css';
import Card from '../Items/Card.jsx';
import data_product from '../Search-By-Category/Category.js';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../CustomArrows.jsx';
import Divider from './divider.jpg';

const Category = (props) => {
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
                    sliderRef.current.slickGoTo(0); // Jump to the start of the items
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
        <div className='catsell'>
            <div className='dialaouge'>
                <h>Shop By Category</h>
                <p>Browse through your favorite categories. We've got them all!</p>
            </div>
            
            <div className='divider'>
                <img src={Divider} className='divider-img' alt='Divider' />
            </div>
            <div className='boy'>
                <div className='CateContainer'>
                {data_product.map((item, i) => (
                    <Card
                        key={i}
                        id={item.id}
                        name={item.name}
                        image={item.image}
                        
                    />
                ))}
            </div>
            </div>
            
                
            
        </div>
    );
}

export default Category;
