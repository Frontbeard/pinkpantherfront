import React, { useState, useRef, useEffect } from 'react';
import Carousel from './Carousel';
import Category from './Category';
import Products from './Products';
import Videobanner from './Videobanner';

const Home = () => {
  const [showBanner, setShowBanner] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleVerAhoraClick = () => {
    setShowBanner(false);
  };

  const handleBackToBannerClick = () => {
    setShowBanner(true);
    window.scrollTo(0, scrollPosition);
  };

  const handleScroll = () => {
    setScrollPosition(window.pageYOffset);
  };

  return (
    <div className='bg-gray-100'>
      {showBanner ? (
        <>
          <Carousel/>
          <Products />
          <Videobanner onVerAhoraClick={handleVerAhoraClick} />
        </>
      ) : (
        <Category onBackToBannerClick={handleBackToBannerClick} />
      )}
    </div>
  );
};

export default Home;
