import React from 'react';
import './Parts.css';
import { backend_url, currency } from '../../App'

const Parts = (props) => {
    return (
        <div className='Parts'>
            <div className='PartsNimg'>
                <img src={backend_url+props.image} alt="" />
            </div>
            
            <div className='Parts-prices'>
                <div className='name'><div><p>{props.name}</p></div></div>
                <div className='item-prices-new'>
                {currency}{props.new_price}
                </div>
            </div>
        </div>
    );
};

export default Parts;
