import { useEffect, useState } from 'react'
import './CSS/ShopCategory.css'

import Item from '../Components/Items/Items';
import Modal from './Modal.jsx';
const Alljewel=(props)=> {
  
  const [allproducts, setAllProducts] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);


    const handleItemClick = (item) => {
        setSelectedItem(item); // Set the selected item
    };

    const closeModal = () => {
        setSelectedItem(null); 
    };

    const fetchInfo = () => { 
      fetch('https://tanishq-clone-backend.onrender.com/allproducts') 
              .then((res) => res.json()) 
              .then((data) => setAllProducts(data))
      }
  
      useEffect(() => {
        fetchInfo();
      }, [])


  return (
    <>
      <div className='shop-category'>
        <img className='image' src={props.banner} alt=''/>
        <div className='boy'>
                <div className='CateContainer'>
                {allproducts.map((item, i) => {
                  return (<div key={i} oncl={() => handleItemClick(item)}>

                  
                    <Item
                    key={i}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    new_price={item.new_price}
                    
                /></div>)
                  
                    
                })}
            </div>
            </div>
            
      </div>
      {/* <Modal isOpen={!!selectedItem} onClose={closeModal} item={selectedItem} /> */}
    </>
  )
}

export default Alljewel
