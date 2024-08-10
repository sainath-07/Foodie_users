import React, { createContext, useReducer, useState } from "react";
import TopBar from "../components/TopBar";
import StaticImages from "../components/staticImages/StaticImages";
import ResturantChain from "../components/ResturantChain";
import Register from "../components/userforms/Register";
import Login from "../components/userforms/Login";

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



  const handleLogin = () => {
    dispatchfun({
      type: "LOGIN",
    });
  };

  const handleSignup = () => {
    dispatchfun({
      type: "SIGNUP",
    });
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
        />

        {showRegister && <Register showRegister={showRegister} />}
        {showLogin && <Login showLogin={showLogin} />}
        {!showLogin && !showRegister && <StaticImages />}
        {!showLogin && !showRegister && <ResturantChain />}
      </div>
    </>
  );
};

export default Navigation;
