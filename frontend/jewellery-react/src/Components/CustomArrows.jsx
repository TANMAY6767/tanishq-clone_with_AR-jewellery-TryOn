import React from 'react';
import './CustomArrows.css';

export function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow`}
            style={{ ...style }} // Adjust the position if needed
            onClick={onClick}
        />
    );
}

export function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={`${className} custom-arrow`}
            style={{ ...style }} // Adjust the position if needed
            onClick={onClick}
        />
    );
}
