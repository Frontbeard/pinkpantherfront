import React from 'react'
import { Link } from 'react-router-dom'

const Newsletter = () => {
  return (
    <div className='bg-gray-100 bg-opacity-5 xl:px-28 px-4 py-16'>
        
         <h2 className="text-3xl font-semibold text-center ">
         Seguí nuestros productos y descuentos en Instagram 
                          <h1 className='text-pink-500' >@PINKPANTHER</h1>
        </h2>

        {/* insta grid */}
        <div className='flex flex-wrap gap-4 items-center justify-center mb-20 '>
            <Link><img src="/images/instagram/img1.png" alt="" /></Link>
            <Link><img src="/images/instagram/img2.png" alt="" /></Link>
            <Link><img src="/images/instagram/img3.png" alt="" /></Link>
            <Link><img src="/images/instagram/img4.png" alt="" /></Link>
            <Link><img src="/images/instagram/img5.png" alt="" /></Link>
            <Link><img src="/images/instagram/img6.png" alt="" /></Link>
        </div>

        {/* newsletter */}
        <div>
        <h2 className="text-3xl font-semibold text-center ">
        O subscribite al Newsletter
        </h2>
        <form className='md:w-1/2 mx-auto text-center mt-10'>
            <input type="email" name="email" id="email" placeholder='Correo electrónico' className='h-8 bg-transparent outline-none border-b-2 pl-2 border-black md:w-2/3 w-full mb-5 placeholder:text-black/50 mr-4'/>
            <input type="submit" value="Suscribirse" className='bg-pink-500 text-white px-6 py-1 rounded-sm ' />
        </form>
        </div>
    </div>
  )
}

export default Newsletter