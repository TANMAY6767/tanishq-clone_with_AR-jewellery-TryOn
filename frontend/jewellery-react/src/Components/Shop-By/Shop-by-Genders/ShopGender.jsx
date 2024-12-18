import React from 'react';
import './ShopGender.css';
import Box from '../../Items/Box.jsx';
import Divider from './divider.jpg';
import Men from './Men.jpg';
import Kid from './kid.jpg';
import Women from './Women.jpg';

const ShopGender = () => {
    return (
        <div className='topsell'>
            <div className='dialaouge'>
                <h1>Shop By Gender</h1>
                <p>First-class jewelry for first-class Men, Women & Children.</p>
            </div>
            
            <div className='divider'>
                <img src={Divider} className='divider-img' alt='Divider' />
            </div>
            
            <div className='wrapper'>
                <Box 
                    key={1}
                    id={1}
                    name="Men"
                    image={Men}
                    link="/men"
                />
                <Box 
                    key={2}
                    id={2}
                    name="Kid"
                    image={Kid}
                    link="/kids"
                />
                <Box 
                    key={3}
                    id={3}
                    name="Women"
                    image={Women}
                    link="/women"
                />
            </div>
        </div>
    );
}

export default ShopGender;
