import clsx from "clsx";
import React, { useContext } from "react";
import { data } from "../App";
import { SkipBack } from "lucide-react";

const MobileResponsive = () => {
  let filterstyling = {
    borderRadius: "18px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 600,
    color: "gray",
    fontStyle: "normal",
    padding: "5px 8px",
    border: "1px solid rgba(2, 6, 12, 0.15)",
    boxShadow:
      "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    backdropFilter: "blur(100px)",
    WebkitBackdropFilter: "blur(10px)",
  };
  let poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
    fontStyle: "normal",
  };
  const { isSidemenuopen, setsidemenu } = useContext(data);
  return (
    <div>
      <section
        className={clsx(
          "fixed top-0 left-0 h-screen w-[100vw]  -translate-x-full transition-all",
          isSidemenuopen && "translate-x-0 duration-700 ease-in-out"
        )}
      >
        <div className="text-black bg-slate-300 flex flex-col absolute left-0 top-0 h-screen w-[13rem] z-50">
          {/* responsive top bar header */}
          <section className="flex mt-1 gap-2 border-b-2 py-2 px-4 justify-between items-end ">
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
          <section className="p-4  h-full">
            <p
              className="mb-4 cursor-pointer text-center"
              style={filterstyling}
            >
              Home
            </p>
            <p
              className="mb-4 cursor-pointer text-center"
              style={filterstyling}
            >
              Contact Us
            </p>
            <p
              className="mb-4 cursor-pointer text-center"
              style={filterstyling}
            >
              Cart
            </p>
            <p
              className="mb-4 cursor-pointer text-center"
              style={filterstyling}
            >
              About
            </p>
            <p
              className="mb-4 cursor-pointer text-center"
              style={filterstyling}
            >
              ChatWithUs
            </p>
          </section>
        </div>
      </section>
    </div>
  );
};

export default MobileResponsive;
