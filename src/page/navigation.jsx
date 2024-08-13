import React, { createContext, useReducer, useState } from "react";
import TopBar from "../components/TopBar";
import StaticImages from "../components/staticImages/StaticImages";
import ResturantChain from "../components/ResturantChain";
import Register from "../components/userforms/Register";
import Login from "../components/userforms/Login";

// const loginToken = localStorage.getItem("loginToken");

let initialState = {
  showLogin: false,
  showRegister: false,
  showHomePage: false,
};

const reducerfun = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        showLogin: true,
        showRegister: false,
        showHomePage: false,
      };
    case "SIGNUP":
      return {
        ...state,
        showLogin: false,
        showHomePage: false,
        showRegister: true,
      };
    case "HOMEPAGE":
      return {
        ...state,
        showLogin: false,
        showHomePage: true,
        showRegister: false,
      };
    default:
      return state;
  }
};
const Navigation = () => {
  const [currentState, dispatchfun] = useReducer(reducerfun, initialState);
  

  const handleLogout = () => {
    if (window.confirm("Are you sure do you want to logout..?")) {
      localStorage.clear();
      window.location.reload();
    }
  };


  const handleLogin = () => {
    dispatchfun({
      type: "LOGIN",
    });
    localStorage.clear();
  };

  const handleSignup = () => {
    dispatchfun({
      type: "SIGNUP",
    });
    localStorage.clear();
  };

  const handleHomePage = () => {
    dispatchfun({
      type: "HOMEPAGE",
    });
  };

  const { showLogin, showRegister } = currentState;

  return (
    <>
      <div>
        <TopBar
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          handleHomePage={handleHomePage}
          handleLogout={handleLogout}
        />

        {showRegister && (
          <Register showRegister={showRegister} handleLogin={handleLogin} />
        )}
        {showLogin && (
          <Login
            showLogin={showLogin}
            handleLogout={handleLogout}
            handleHomePage={handleHomePage}
          />
        )}
        {!showLogin && !showRegister && <StaticImages />}
        {!showLogin && !showRegister && <ResturantChain />}
      </div>
    </>
  );
};

export default Navigation;
