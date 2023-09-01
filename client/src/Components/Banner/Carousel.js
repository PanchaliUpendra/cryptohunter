import React, { useEffect, useState } from 'react';
import { CryptoState } from '../../CryptoContext'
import AliceCarousel from 'react-alice-carousel';
import { NavLink } from 'react-router-dom';

import './Carousel.css';
const Carousel = () =>{
    const [trending , setTrending] = useState([])
    const { currency ,symbol} = CryptoState();
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      }
 
    console.log(trending);
  useEffect(() => {
    fetch(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&ids=bitcoin,ethereum,ripple,solana,binancecoin,dogecoin,cardano,chainlink,polkadot,stellar`)
      .then(response => response.json())
      .then(data => setTrending(data))
      .catch(error => console.error(error));
  }, [currency]);
  const items = trending.map((coin) =>{
    let profit = coin.price_change_percentage_24h>=0;
    return(
        <NavLink to={`/coins/${coin.id}`} className="carousel-banner-image-names">
            <img src={coin?.image}
                alt={coin.name}
                height="80"
                style={{marginBottom:10}}/>

            <span className='carousel-banner-first-span'>
            {coin?.symbol}
            &nbsp;
            <span
                style={{
                color: profit > 0 ? "rgb(14, 203, 129)" : "red",
                fontWeight: 500,
                }}
            >
                {profit && "+"}
                {coin?.price_change_percentage_24h?.toFixed(2)}%
            </span>
            </span>
            <span style={{ fontSize: 22, fontWeight: 500 }}>
            {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
            </span>
        </NavLink>
    )
  })
  const responsive = {
    0:{
        items:2,
    },
    513:{
        items:3
    },
    630:{
        items: 4,
    },
  }
    return(
        <div>
        <AliceCarousel
            mouseTracking
            infinite
            autoPlayInterval={1000}
            animationDuration={1000}
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            autoPlay
            items={items}
        />
        </div>
    );
};

export default Carousel;