import { SkipBack, StepForward } from "lucide-react";
import React, { useContext, useState } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";
import MobileResponsive from "./MobileResponsive";
import { data } from "../App";

const getToken = () => localStorage.getItem("loginToken");

const TopBar = ({
  handleLogin,
  handleSignup,
  handleHomePage,
  handleLogout,
}) => {
  const { isSidemenuopen, setsidemenu } = useContext(data);

  const loginToken = getToken();

  let poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
    fontStyle: "normal",
  };

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

  return (
    <>
      <nav
        className={clsx(
          "mx-auto pr-1  border-2 gap-1 flex justify-between h-[52px] items-center md:px-8 fixed w-screen top-0 right-0 z-50 transition-all duration-300"
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
            className="text-lg cursor-pointer md:text-2xl"
            onClick={handleHomePage}
          >
            Foodie.com
          </p>
        </section>

        {/* Mobile responsive code */}
        <MobileResponsive />

        <section className="flex gap-1">
          {loginToken ? (
            <>
              <button
                style={filterstyling}
                type="button"
                className="flex"
                onClick={handleLogout}
              >
                Logout
              </button>
              <Link to={"/cartpage"}>
                <button
                  className="hidden md:flex"
                  style={filterstyling}
                  type="button"
                >
                  CartPage
                </button>
              </Link>
            </>
          ) : (
            <>
              <button
                style={filterstyling}
                type="button"
                className="flex"
                onClick={handleLogin}
              >
                Login
              </button>
              <button
                style={filterstyling}
                className="flex"
                onClick={handleSignup}
              >
                Signup
              </button>
            </>
          )}
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
