import {
  
  SkipBack,
  StepForward,
} from "lucide-react";
import React, { useState } from "react";
import clsx from "clsx";

const TopBar = ({ handleLogin, handleSignup, handleHomePage }) => {
  const [isSidemenuopen, setsidemenu] = useState(false);

  let poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
    fontStyle: "normal",
  };

  let filterstyling = {
    borderRadius: "15px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    color: "gray",
    fontStyle: "normal",
    padding: "5px 8px",
    border: "1px solid rgba(2, 6, 12, 0.15)",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  };

  return (
    <>
      <nav
        className={clsx(
          "mx-auto pr-1 flex justify-between h-[52px] items-center md:px-8 fixed w-screen top-0 right-0 z-50 transition-all duration-300"
        )}
        style={{
          boxShadow:
            "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
          backgroundColor: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
        }}
      >
        <section className="flex gap-1">
          <StepForward
            size={30}
            className="md:hidden inline-block"
            onClick={() => setsidemenu(true)}
          />

          <p
            style={poppins}
            className="text-xl cursor-pointer md:text-2xl"
            onClick={handleHomePage}
          >
            Foodie.com
          </p>
        </section>

        {/* Mobile responsive code */}
        <section
          className={clsx(
            "fixed top-0 left-0 h-screen w-[100vw]  -translate-x-full transition-all",
            isSidemenuopen && "translate-x-0 duration-700 ease-in-out"
          )}
        >
          <div className="text-black bg-slate-300 flex flex-col absolute left-0 top-0 h-screen w-[13rem] z-50">
            {/* responsive top bar header */}
            <section className="flex mt-1 gap-2 border-b-2 py-2 px-4 justify-between items-end border-stone-600">
              <p style={poppins} className="text-xl cursor-pointer">
                Foodie.com
              </p>
              <SkipBack
                onClick={() => setsidemenu(false)}
                size={32}
                className="text-xl cursor-pointer bg-gray-200 w-8 h-8"
                style={{
                  borderRadius: "18px",
                  padding: "5px",
                }}
              />
            </section>

            {/* responsive body section */}
            <section className="p-4">
              <p className="mb-4 cursor-pointer">Home</p>
              <p className="mb-4 cursor-pointer">Contact Us</p>
              <p className="mb-4 cursor-pointer">Cart</p>
              <p className="cursor-pointer">About</p>
            </section>
          </div>
        </section>

        <section className="flex gap-1 ">
          <button
            style={filterstyling}
            type="button"
            className="flex"
            onClick={handleLogin}
          >
            Login
          </button>

          <button style={filterstyling} className="flex" onClick={handleSignup}>
            Signup
          </button>
        </section>
      </nav>

      {/* Blur overlay when sidemenu is open */}
      {isSidemenuopen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-md z-40"
          onClick={() => setsidemenu(false)}
        ></div>
      )}
    </>
  );
};

export default TopBar;
