import React from "react";

const TopBar = () => {
  let poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
    fontStyle: "normal",
  };
  return (
    <div
      className=" h-[10vh] fixed top-0 right-0 w-full z-10"
      style={{
        boxShadow:
          "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
        backgroundColor: "rgba(255, 255, 255, 0.7)", // White with 70% opacity
        backdropFilter: "blur(10px)", // 10px blur effect
        WebkitBackdropFilter: "blur(10px)", // Safari support
        borderRadius: "8px", // Optional: Rounded corners
        padding: "20px",
      }}
    >
      <section className="flex justify-between h-full items-center ">
        <div>
          <p className="text-2xl ml-16" style={poppins}>
            Foodie.com
          </p>
        </div>
        <div className=" w-[500px] h-[40px]">
          <input
            type="text"
            placeholder="Search resturant"
            className="border-2 border-gray-200 w-full h-full pl-4 rounded-full text-xl"
            style={{
              fontFamily: "Poppins, sans-serif",
              fontWeight: 400,
              fontStyle: "normal",
            }}
          />
        </div>
        <div className="flex gap-2 text-base">
          <span style={poppins} className="border-2 border-stone-600 p-2">
            Login
          </span>
          <span className="mr-4 border-2 border-stone-600 p-2" style={poppins}>
            Signup
          </span>
        </div>
      </section>
    </div>
  );
};

export default TopBar;
