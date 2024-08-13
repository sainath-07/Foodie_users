import { MessageCircleCode, ShoppingBag, SkipBack, StepForward, TextCursor } from "lucide-react";
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
  const { isSidemenuopen, setsidemenu, fetchCartProdcuts } = useContext(data);

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
          "mx-auto pr-1 gap-1 flex justify-between h-[52px] items-center md:px-8 fixed w-screen top-0 right-0 z-50 transition-all duration-300"
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
            className="md:hidden inline-block cursor-pointer"
            onClick={() => setsidemenu(true)}
          />

          <a
            style={poppins}
            className="text-lg cursor-pointer md:text-2xl"
            onClick={handleHomePage}
            href="#"
          >
            Foodie.com
          </a>
        </section>

        {/* Mobile responsive code */}
        <MobileResponsive />

        <section className="flex gap-1">
          {loginToken ? (
            <>
              <Link to={"/cartpage"}>
                <button
                  className="hidden md:flex gap-1"
                  style={filterstyling}
                  type="button"
                  onClick={() => {
                    fetchCartProdcuts();
                  }}
                >
                  <ShoppingBag/>
                  Cart
                </button>
              </Link>
              <a
                style={filterstyling}
                href="https://wa.me/+919010995323/?text=Hello"
                data-action="share/whatsapp/share"
                target="_blank"
                className={clsx( "flex gap-1 ",
                  isSidemenuopen && "relative -z-10 cursor-pointer"
                )}
              >
            <MessageCircleCode />

               Chat
              </a>
              <button
                style={filterstyling}
                type="button"
                className={clsx(isSidemenuopen && "relative -z-10")}
                onClick={handleLogout}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                style={filterstyling}
                type="button"
                // className="flex"
                onClick={handleLogin}
                className={clsx(isSidemenuopen && "relative -z-10")}
              >
                Login
              </button>
              <button
                style={filterstyling}
                // className="flex"
                onClick={handleSignup}
                className={clsx(isSidemenuopen && "relative -z-10")}
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
