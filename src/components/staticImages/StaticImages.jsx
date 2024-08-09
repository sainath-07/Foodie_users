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

    const scrollAmount = 400;

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
    <div className="mt-24 w-[85%] mx-auto ">
      <div className="mx-auto flex justify-between">
        <p
          className="text-2xl "
          style={{
            fontFamily: "Poppins, sans-serif",
            fontWeight: 700,
            fontStyle: "normal",
          }}
        >
          Order our best food options
        </p>
        <div className="flex gap-4 text-xl">
          <button
            onClick={() => handleScroll("left")}
            className="bg-gray-100 rounded-full w-12 h-12 p-2 justify-center flex items-center"
            >
            <ArrowLeft size={24} />
          </button>
          <button
            onClick={() => handleScroll("right")}
            className="bg-gray-100 rounded-full w-12 h-12 p-2 justify-center flex items-center"
          >
            <ArrowRight size={24} />
          </button>
        </div>
      </div>

      <div
        id="scrollimages"
        className="mt-8 flex overflow-x-auto scrollbar-hide"
      
        onScroll={(e) => setScrollPosition(e.target.scrollLeft)}
      >
        {displayImages.map((value, index) => {
          return (
            <React.Fragment key={index}>
              <img
                src={value.img}
                alt=""
                className="w-[15%]
              h-[120px]"
              />
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default StaticImages;
