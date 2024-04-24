import React from 'react'
import Banner from './Banner'
import Category from './Category'
import Products from './Products'
import Newsletter from '../NewsLetter'

const Home = () => {
  return (
    <div className='bg-gray-100'>
        <Banner/>
         {/* <Filter/> */}
        <Category/>
        <Products/>
       
        <Newsletter/>
       
    </div>
  )
}

export default Home
