import React from 'react';

import awards from "../../assets/images/desktopbanner.jpg";

const CoverSection2 = () => {
  return (
    < div className='w-full'>
        <div className='mt-3 bgc'>
            <br></br>
        <h2 className="text-lg sm:text-xl md:text-xl lg:text-1xl xl:text-1xl text-center font-bold uppercase">Shop with Confidence at ECOSPRINT Online Store </h2>
        <br></br>
        <img className='w-full' src={awards}></img>
        </div>
    </div>
  )
}

export default CoverSection2