import React from "react";
import { Link } from "react-router-dom";

const Category = ({ onBackToBannerClick }) => {
  return (
    <div className="max-w-screen-2xl container xl:px-28 px-4 py-16">

      {/* category grid */}
      <div className="flex flex-col md:flex-row items-center gap-4 mt-8">
        <p className="font-semibold md:-rotate-90 uppercase text-center bg-black text-white md:p-1.5 p-2 rounded-sm inline-flex">
          Explora lo nuevo y lo más popular
        </p>
        <div>
          <Link to="/">
            <img src="/images/category/combo_1.jpg" alt="" className="w-full hover:scale-105 transition-all duration-200" />
          </Link>
        </div>
        <div className="md:w-1/2">
          <div className="grid grid-cols-2 gap-2">
            <Link to="/">
              <img
                src="/images/category/combo_2.jpg"
                alt=""
                className="hover:scale-105 transition-all duration-200"
              />
            </Link>
            <Link to="/">
              <img
                src="/images/category/combo_3.jpg"
                alt=""
                className="hover:scale-105 transition-all duration-200"
              />
            </Link>
            <Link to="/">
              <img
                src="/images/category/combo_4.jpg"
                alt=""
                className="hover:scale-105 transition-all duration-200"
              />
            </Link>
            <Link to="/">
              <img
                src="/images/category/combo_5.jpg"
                alt=""
                className="hover:scale-105 transition-all duration-200"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Botón para volver al Banner */}
      <div className="mt-8">
        <button onClick={onBackToBannerClick} className="bg-black hover:bg-pink-400 px-6 py-2 text-white font-semibold rounded-sm">
          Volver
        </button>
      </div>
    </div>
  );
};

export default Category;
