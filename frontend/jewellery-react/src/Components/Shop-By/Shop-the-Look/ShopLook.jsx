import React, { useRef, useState } from 'react';
import './ShopLook.css';
import Parts from '../../Items/Parts.jsx';
import workProduct from './Work.js';
import sleekProduct from './Sleek.js';

import elegantProduct from './Elegant.js';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../../CustomArrows.jsx';
import Divider from './divider.jpg';
import Work from './work_main.png';
import Sleek from './sleek_main.png';
import Elegant from './elegant.png';
import WorkIcon from './workwear-icon.jpg';
import SleekIcon from './sleek-icon.jpg';
import ElegantIcon from './elegant-icon.jpg';
import TryIcon from './cam.png';
import Modal from './Modal.jsx'; // Import the Modal component

const ShopLook = () => {
    const [currentCategory, setCurrentCategory] = useState('workwear');
    const [selectedItem, setSelectedItem] = useState(null); // State for the selected item
    const [selectedRect, setSelectedRect] = useState(null); // State for the selected .rect
    const sliderRef = useRef(null);

    const categories = {
        workwear: { products: workProduct, mainImage: Work, icon: WorkIcon, label: 'WORK WEAR' },
        sleek: { products: sleekProduct, mainImage: Sleek, icon: SleekIcon, label: 'SLEEK' },
        elegant: { products: elegantProduct, mainImage: Elegant, icon: ElegantIcon, label: 'ELEGANT' }
    };

    const handleCategoryChange = (category) => {
        setCurrentCategory(category);
    };

    const handleItemClick = (item) => {
        setSelectedItem(item); // Set the selected item
    };

    const closeModal = () => {
        setSelectedItem(null); // Close the modal
    };

    const handleRectClick = (category) => {
        setSelectedRect(category); // Set the selected .rect
    };

    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        beforeChange: (current, next) => {},
        afterChange: (index) => {
            if (index >= categories[currentCategory].products.length - 1) {
                setTimeout(() => {
                    sliderRef.current.slickGoTo(0);
                }, 2500);
            }
        },
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                }
            }
        ]
    };

    const { products, mainImage, label } = categories[currentCategory];

    return (
        <div className='looksell'>
            <div className='dialogue'>
                <h1>Shop the Look</h1>
                <p>Discover your timeless style and reveal your unique look!</p>
            </div>

            <div className='divider'>
                <img src={Divider} className='divider-img' alt='Divider' />
            </div>

            <div className="items">
                {Object.keys(categories).map(category => (
                    <div 
                        className={`rect ${selectedRect === category ? 'selected' : ''}`} 
                        key={category} 
                        onClick={() => handleRectClick(category)} // Wrap with arrow function
                    >
                        <div onClick={() => handleCategoryChange(category)} >
                        <div className="text-above">{categories[category].label}</div>
                        <div className="image-container">
                            <img 
                                src={categories[category].icon} 
                                alt={category} 
                                
                            />
                        </div>
                        <div className="text-below">{categories[category].label}</div>
                        </div>
                    </div>
                ))}

                <div className='rect'>
                    <div className="text-above"></div>
                    <div className="image-container77">
                        <img src={TryIcon} alt="Try Your Image" />
                    </div>
                    <div className="text-below">Try Your Image!</div>
                </div>
            </div>

            <div className='bigpole'>
                <div className='pole'>
                    <div className='ref-img'>
                        <img src={mainImage} className='pic' alt={label} />
                    </div>
                    <div className='right-side'>
                        <Slider {...settings} className='top-item-slider' ref={sliderRef}>
                            {products.map((item, i) => (
                                <div key={i} onClick={() => handleItemClick(item)}>
                                    <Parts
                                        id={item.id}
                                        name={item.name}
                                        image={item.image}
                                        new_price={item.new_price}
                                    />
                                </div>
                            ))}
                            <div className='part'>
                                <div className='subpart'>
                                    <div className='workwear'>
                                    <p>{label}</p>
                                </div>
                                <div>
                                    <button className='shop-txt'>SHOP THIS LOOK</button>
                                </div>
                                </div>
                                
                                
                            </div>
                        </Slider>
                    </div>
                </div>
            </div>

            <Modal isOpen={!!selectedItem} onClose={closeModal} item={selectedItem} />
        </div>
    );
}

export default ShopLook;
