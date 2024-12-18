import React from 'react';
import './BtnBox.css';

const BtnBox = (props) => {
    return (
        <div className='BtnBox'>
            <div className='BtnBoxNimg'>
                <img src={props.image} className={props.name} alt="" />
                <div className='cont'><button className='exp'>Explore More</button></div>
            </div>
            
            
        </div>
    );
};

export default BtnBox;
