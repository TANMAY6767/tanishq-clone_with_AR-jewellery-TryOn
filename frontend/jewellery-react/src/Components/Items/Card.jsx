import React from 'react';
import './Card.css';

const Card = (props) => {
    return (
        <div className='Card'>
            <div className='CardNimg'>
                <img src={props.image}  alt="" />
            </div>
            <div className='textarea'> 
                    <div><p>{props.name}</p></div>
                    <div className='exp'><div className='dog'><a className='txt'>Explore more</a></div><div className='arr'><a className='sym'>{">"}</a></div></div>
            </div>
           
            
        </div>
    );
};

export default Card;
