import { useEffect, useState } from 'react';
import './CSS/ShopCategory.css';

import Item from '../Components/Items/Items';

const ShopCategory = (props) => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = () => {
    fetch('https://tanishq-clone-backend.onrender.com/allproducts')
      .then((res) => res.json())
      .then((data) => {
        // Sort the products by 'date' field in descending order (newest first)
        const sortedProducts = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setAllProducts(sortedProducts);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <>
      <div className='shop-category'>
        <img className='image' src={props.banner} alt='' />
        <div className='boy'>
          <div className='CateContainer'>
            {allproducts.map((item, i) => {
              if (props.category === item.category) {
                return (
                  <Item
                    key={i}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    new_price={item.new_price}
                  />
                );
              } else if (props.gender === item.gender) {
                return (
                  <Item
                    key={i}
                    id={item.id}
                    name={item.name}
                    image={item.image}
                    new_price={item.new_price}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShopCategory;
