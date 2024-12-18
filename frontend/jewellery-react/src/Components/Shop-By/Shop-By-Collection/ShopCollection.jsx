import React from 'react';
import './ShopCollection.css';
import Box from '../../Items/Box.jsx';
import Divider from './divider.jpg';
import Collection_1 from './collec_1.jpg';
import Collection_2 from './collec_2.jpg';
import Collection_3 from './collec_3.jpg';

const ShopCollection = () => {
    return (
        <div className='topsell1'>
            <div className='dialaouge'>
                <h1>Shop By Collections</h1>
                <p>Whatever the occasion, we've got a beautiful piece of jewellery for you.</p>
            </div>
            
            <div className='divider'>
                <img src={Divider} className='divider-img' alt='Divider' />
            </div>
            
            <div className='wrapper'>
                <Box
                    key={1}
                    id={1}
                    name="String it"
                    image={Collection_1}
                />
                <Box
                    key={2}
                    id={2}
                    name="The Italian Collection"
                    image={Collection_2}
                />
                <Box
                    key={3}
                    id={3}
                    name="Engagement Rings"
                    image={Collection_3}
                />
            </div>
        </div>
    );
}

export default ShopCollection;
