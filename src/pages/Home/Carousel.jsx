import React, { useState, useEffect } from "react";

const Carousel = () => {
  const [currentItem, setCurrentItem] = useState(0);
  const items = [
    { image: "/carousel3.png", link: "/page1" },
    { image: "/carousel2.png", link: "/page2" },
    { image: "/carousel1.png", link: "/page3" },
  ];
  const intervalTime = 5000; 

  useEffect(() => {
    const interval = setInterval(() => {

      setCurrentItem((prev) => (prev === items.length - 1 ? 0 : prev + 1));
    }, intervalTime);

    return () => clearInterval(interval);
  }, [currentItem]); 

  const prevItem = () => {
    setCurrentItem((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  };

  const nextItem = () => {
    setCurrentItem((prev) => (prev === items.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full pt-8">
      <div className="relative h-56 overflow-hidden rounded-lg md:h-96">
        {items.map((item, index) => (
          <a key={index} href={item.link}>
            <div
              className={`absolute w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 ${
                index === currentItem ? "block" : "hidden"
              } duration-700 ease-in-out`}
            >
              <img src={item.image} className="block w-full" alt={`Carousel ${index + 1}`} />
            </div>
          </a>
        ))}
      </div>
      <button
        type="button"
        className="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={prevItem}
      >
      </button>
      <button
        type="button"
        className="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
        onClick={nextItem}
      >
      </button>
    </div>
  );
};

export default Carousel;

