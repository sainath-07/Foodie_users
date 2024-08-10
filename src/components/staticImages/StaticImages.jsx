import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

import staticImages from "./data"; // Ensure the correct path to data.js
const StaticImages = () => {
  const [displayImages, setDisplayImages] = useState(staticImages);
  const [scrollPosition, setScrollPosition] = useState(0);
  let poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    fontStyle: "normal",
  };

  const handleScroll = (direction) => {
    const scrollimages = document.getElementById("scrollimages");

    const scrollAmount = 500;

    if (direction === "left") {
      // console.log("object");
      scrollimages.scrollTo({
        left: scrollimages.scrollLeft - scrollAmount,
        behavior: "smooth",
      });
    } else if (direction === "right") {
      // console.log("object");
      scrollimages.scrollTo({
        left: scrollimages.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="mt-20 w-[90%] mx-auto ">
      <div className="mx-auto flex justify-between items-center">
        <p
          className="sm:text-2xl text-[18px]"
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontStyle: "normal",
          }}
        >
          Order our best food
        </p>
        <div className="flex gap-2 text-xl">
          <button
            onClick={() => handleScroll("left")}
            className="bg-gray-100 rounded-full w-12 h-12 p-2 justify-center flex items-center cursor-pointer"
          >
            <ArrowLeft size={24} />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="bg-gray-100 rounded-full w-12 h-12 p-2 justify-center flex items-center cursor-pointer"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      <div
        id="scrollimages"
        className="mt-2 flex overflow-x-auto scrollbar-hide"
        // style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"}}
        onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
      >
        {displayImages.map((value, index) => {
          return (
            <React.Fragment key={index}>
              <img
                src={value.img}
                alt=""
                className="w-[25%]  h-[100px] 
                sm:w-[28%] sm:h-[120px]
             "
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StaticImages;
