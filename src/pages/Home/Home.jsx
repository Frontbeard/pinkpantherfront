import React, { useState, useRef, useEffect } from 'react';
import Banner from './Banner';
import Category from './Category';
import Products from './Products';
import Newsletter from '../NewsLetter';
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
          <Banner onVerAhoraClick={handleVerAhoraClick} />
          <Products />
          <Videobanner/>
        </>
      ) : (
        <Category onBackToBannerClick={handleBackToBannerClick} />
      )}
      <Newsletter />
    </div>
  );
};

export default Home;
