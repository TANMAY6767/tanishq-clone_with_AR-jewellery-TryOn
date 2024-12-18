// Modal.jsx
import React from 'react';
import './Modal.css';

const Modal = ({ isOpen, onClose, item }) => {
    if (!isOpen || !item) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>X</button>
                <h2>{item.name}</h2>
                <img src={item.image} alt={item.name} className="modal-image" />
                <p>Price: ${item.new_price}</p>
                {/* Add more item details as needed */}
            </div>
        </div>
    );
};

export default Modal;
