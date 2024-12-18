import { useState } from 'react'
import { AiOutlineMail } from "react-icons/ai";
import { IoCallOutline } from "react-icons/io5";
import { CiChat1 } from "react-icons/ci";
import './Footer.css'
import qr from './qrr.jpeg'
import apple from './apple.jpg'
import play from './play_store.jpg'
import { FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { BsInstagram } from "react-icons/bs";

function Footer() {
  

  return (
    <>
      <div className='footbase'>
        <div className='sub-footbase'>
        <div className='north-south'>
            <div className='links'>
                <div className='top'><a >Useful Links</a></div>
                <div className='text'><a >Delivery Information</a></div>
                <div className='text'><a >International Shipping</a></div>
                <div className='text'><a >Payment Options</a></div>
                <div className='text'><a >Track your Order</a></div>
                <div className='text'><a >Returns</a></div>
                <div className='text'><a >Find a Store</a></div>
            </div>
            <div className='info'>
                <div className='top'><a >Information</a></div>
                <div className='text'><a >Careers</a></div>
                <div className='text'><a >Blog</a></div>
                <div className='text'><a >Offers & Contest Details</a></div>
                <div className='text'><a >Help & FAQs</a></div>
                <div className='text'><a >About Kohinoor</a></div>
            </div>
            <div className='contact'>
                <div className='top'><a >Contact Us</a></div>
                <div className='text'><a ><AiOutlineMail />Write Us</a></div>
                <div className='text'><a> <IoCallOutline />Call with Us</a></div>
                <div className='text'><a ><CiChat1 />Chat with Us</a></div>
            
            </div>
            <div className='down'>
                <div className='qrman'>
                    <div><a className='top'>Download the Kohinoor App Now</a></div>
                    <div><img className='qr' src={qr}></img></div>
                </div>
                <div className='platform'><div><img className='apple' src={apple}></img></div> <div><img className='play' src={play}></img></div></div>
                <div className='follow'><div><a>Follow Us On</a></div><div><FaFacebookF /></div><div><FaXTwitter /></div><div><BsInstagram /></div></div>
            </div>
        </div>
        <hr></hr>
        <div className='mention'>

        </div>
        </div>
      </div>
      
    </>
  )
}

export default Footer