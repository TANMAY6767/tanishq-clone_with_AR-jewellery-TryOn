import React from 'react';
import './Box.css';
import { Link } from 'react-router-dom';

const Box = (props) => {
    return (
        <div className='box'>
            <Link to={props.link} className='link'>
                <div className='boxNimg'>
                    <img src={props.image} alt="" />
                    <div className='textare1'> 
                        <div><p>{props.name}</p></div>
                        <div className='ex1'>
                            <div className='do1'>
                                <span className='explore-text'>Explore more {" >"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default Box;
