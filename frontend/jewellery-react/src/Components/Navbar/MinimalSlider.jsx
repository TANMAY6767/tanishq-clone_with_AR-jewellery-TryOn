import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import disp1 from './Slider-display-Assets/disp_1.jpg';
import disp2 from './Slider-display-Assets/disp_2.jpg';
import disp3 from './Slider-display-Assets/disp_3.jpg';
import disp4 from './Slider-display-Assets/disp_4.jpg';
import disp5 from './Slider-display-Assets/disp_5.jpg';
import disp6 from './Slider-display-Assets/disp_6.jpg';
import './MinimalSlider.css';

function MinimalSlider() {
    return (
        <div className="slider-container">
            <Slide easing="ease" autoplay={true} duration={3000}>
                <div className="each-slide">
                    <img className="slide-image" src={disp1} alt="Display 1" />
                </div>
                <div className="each-slide">
                    <img className="slide-image" src={disp2} alt="Display 2" />
                </div>
                <div className="each-slide">
                    <img className="slide-image" src={disp3} alt="Display 3" />
                </div>
                <div className="each-slide">
                    <img className="slide-image" src={disp4} alt="Display 4" />
                </div>
                <div className="each-slide">
                    <img className="slide-image" src={disp5} alt="Display 3" />
                </div>
                <div className="each-slide">
                    <img className="slide-image" src={disp6} alt="Display 4" />
                </div>
            </Slide>
        </div>
    );
}

export default MinimalSlider;
