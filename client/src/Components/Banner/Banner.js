import React from 'react';
import './Banner.css'
import Carousel from './Carousel';
const Banner =() =>{
    return(
        <>
        <div className='banner-container'>
            <div className='banner-inner-container'>
                <div className='banner-inner-header'>
                    <h1>Crypto Hunter</h1>
                    <p>Get All The Info Regarding Your Favorite Crypto Currency</p>
                </div>
                <div className='banner-carousel-div'>
                <Carousel/>
                </div>
            </div>
        </div>
        </>
    );
}

export default Banner;