import { useContext, useState } from 'react'
import './CartItems.css'
import remove_icon from './cart_cross_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import { backend_url, currency } from "../../App";

function CartItems() {
    const {products} = useContext(ShopContext);
  const {getTotalCartAmount,cartItems,removeFromCart}=useContext(ShopContext);

  return (
    <>
      <div className='cartitems'>
            <div className='cartitems-format-main'>
                <p>Products</p>
                <p>Title</p>
                <p>Price</p>
                <p>Quantity</p>
                <p>Total</p>
                <p>Remove</p>
            </div>
            <hr/>
            {products.map((e)=>{
                if(cartItems[e.id]>0)
                {
                    return <div>
                    <div className='cartitems-format cartitems-format-main'>
                        <img src={backend_url+e.image} className='carticon-product-icon'></img>
                        <p>{e.name}</p>
                        <p>{currency}{e.new_price}</p>
                        <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                        <p>{currency}{e.new_price*cartItems[e.id]}</p>
                        <img className='cartitems-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}}></img>
                    </div>
                    <hr/>
                </div>
                }
                return null;
            })}
            <div className='cartitems-down'>
                <div className='cartitems-total'>
                    <h1>cart Totals</h1>
                    <div>
                        <div className='cartitems-total-item'>
                            <p>Subtotal</p>
                            <p>{currency}{getTotalCartAmount()}</p>
                        </div>
                        <hr/>
                        <div className='cartitems-total-item'>
                            <p>Shipping Fee</p>
                            <p>Free</p>
                        </div>
                        <hr/>
                        <div className='cartitems-total-item'>
                            <h3>Total</h3>
                            <h3>{currency}{getTotalCartAmount()}</h3>
                        </div>
                    </div>
                    <button>PROCEED TO CHECKOUT</button>
                </div>
                <div className='cartitems-promocode'>
                    <p>If you have a promo code, Enter itn here</p>
                    <div className='cartitems-promobox'>
                        <input type='text' placeholder='promo code'/>
                        <button>Submit</button>
                    </div>
                </div>
            </div>
      </div>
      
    </>
  )
}

export default CartItems
