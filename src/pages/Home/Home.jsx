import React from 'react';
import Banner from './Banner';
import Category from './Category';
import Products from './Products';
import Newsletter from '../NewsLetter';
import Filter from '../../components/Filter';



const Home = () => {
  return (
    <div className='bg-gray-100'>
      <Banner/>
      <Category/>
      <Filter/>
      <Products/>
      <Newsletter/>
    </div>
  );
}

export default Home;
