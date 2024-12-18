import React from 'react';
import './Items.css';
import { Link } from "react-router-dom";
import { backend_url, currency } from '../../App'


const Item = (props) => {
    return (
        <div className='item'>
            <div className='pro-img'>
                <Link to={`/product/${props.id}`}><img onClick={window.scrollTo(0,0)} src={backend_url+props.image} width={228} height={228} alt="" /></Link>
            </div>
            <p>{props.name}</p>
            <div className='item-prices'>
                <div className='item-prices-new'>
                    {currency}{props.new_price}
                </div>
                <div className='item-prices-old'>
                {currency}{props.old_price}
                </div>
            </div>
        </div>
    );
};

export default Item;
