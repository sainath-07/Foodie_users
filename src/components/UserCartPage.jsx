import React, { useContext } from "react";
import { data } from "../App";
import { Api_Url } from "../utils/ApiUrl";
import {
  CircleMinus,
  CirclePlus,
  House,
  ShoppingBag,
  StepForward,
} from "lucide-react";
import { Link } from "react-router-dom";
import clsx from "clsx";
import MobileResponsive from "./MobileResponsive";
import FooterPage from "./FooterPage";
import axios from "axios";

const UserCartPage = () => {
  const {
    setcartProducts,
    updateQuantityBackend,
    cartProducts,
    handleDelete,
    setsidemenu,
    isSidemenuopen,
  } = useContext(data);
  // console.log(cartProducts, "cartProducts");

  const handleQuantity = (useraction, productId) => {
    switch (useraction) {
      case "INCREMENT":
        const INCREMENT = cartProducts.map((each, index) => {
          if (each._id === productId) {
            each.count++;
            each.totalPrice = each.count * each.price;
            updateQuantityBackend(each.count, each.totalPrice, productId);
            return each;
          } else {
            return each;
          }
        });

        setcartProducts(INCREMENT);
        break;

      case "DECREMENT":
        const DECREMENT = cartProducts.map((each, index) => {
          if (each._id === productId && each.count > 1) {
            each.count--;
            each.totalPrice = each.count * each.price;
            updateQuantityBackend(each.count, each.totalPrice, productId);

            return each;
          } else {
            return each;
          }
        });

        setcartProducts(DECREMENT);
        break;
    }
  };

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

  // total price logic

  const calculatePrice = cartProducts.map((each, i) => {
    return Math.round(each.totalPrice);
  });

  const calculate = (accumulator, element) => accumulator + element;
  const totalAmount = calculatePrice.reduce(calculate, 0);

  let Taxestimate = totalAmount * 0.08;
  const totalAmountwithtax = totalAmount + Math.round(Taxestimate);

  let payment = {
    name: "sainath",
    amount: totalAmountwithtax,
    number: "9010995323",
    MID: "MID" + Date.now(),
    transactionId: "T" + Date.now(),
  };

  // Paymentgate way integration Logick
  const handlePayNow = async () => {
    console.log("hello");
    try {
      await axios
        .post(`${Api_Url}/order`, payment)
        .then((res) => {
          console.log(res);
          if (res.data.success == true) {
            window.location.href =
              res.data.data.instrumnetResponse.redirectInfo.url;
          }
        })
        .catch((res) => console.log(res));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="mx-auto font-poppins cursor-pointer">
        {/* topBar in cartpage collections */}
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
          <section className="flex sm:gap-4">
            <StepForward
              size={30}
              className="md:hidden inline-block"
              onClick={() => setsidemenu(true)}
            />

            <p style={poppins} className="text-lg cursor-pointer md:text-xl">
              <Link to={"/"}>Foodie.com</Link>
            </p>
          </section>

          {/* Mobile responsive code */}
          <MobileResponsive />

          <section className="flex gap-1 ">
            <Link to={"/"}>
              <button
                style={filterstyling}
                type="button"
                className="flex gap-1"
              >
                <House /> Home
              </button>
            </Link>
            <Link to={"/cartpage"}>
              <button style={filterstyling} className="flex gap-1">
                <ShoppingBag /> Cart
              </button>
            </Link>
          </section>
        </nav>
        <h1 className="text-2xl mt-16 font-bold mb-4 text-center">
          Your Cart Products
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 px-4 gap-6">
          {Array.isArray(cartProducts) && cartProducts.length > 0 && (
            <>
              {cartProducts.map((value, index) => {
                const { _id, image, productName, price, count, totalPrice } =
                  value;
                return (
                  <div
                    key={index}
                    className="border rounded-lg p-4 shadow-lg gap-2 flex flex-col items-center "
                  >
                    <img
                      src={`${Api_Url}/uploads/${image}`}
                      alt={productName}
                      className="w-[220px] h-[200px] object-cover "
                    />
                    <h2 className="text-lg font-semibold">{productName}</h2>
                    <p className="text-gray-600 font-bold">Price: ₹{price}</p>
                    <div className="flex w-full justify-center gap-2 items-center">
                      <p className="text-gray-600 text-xl font-medium">
                        Quantity: {count}
                      </p>
                      <button
                        onClick={() => handleQuantity("INCREMENT", _id)}
                        className="bg-gray-100 rounded-full w-12 h-12 p-2 justify-center flex items-center cursor-pointer"
                      >
                        <CirclePlus size={24} />
                      </button>
                      <button
                        onClick={() => handleQuantity("DECREMENT", _id)}
                        className="bg-gray-100 rounded-full w-12 h-12 p-2 justify-center flex items-center cursor-pointer"
                      >
                        <CircleMinus size={24} />
                      </button>
                    </div>
                    <p className="text-gray-800 font-bold">
                      Total: ₹{totalPrice}
                    </p>
                    <button
                      onClick={() => handleDelete(_id)}
                      className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </>
          )}
        </div>

        {/* Total price and payment chekcout section */}

        <div
          className=" 
         flex flex-col gap-4 lg:gap-6 w-[95%]
         h-[50vh] sm:w-[75%] lg:w-[40%]
         mx-auto mt-8 text-xl  justify-center items-center
      "
          style={{
            borderRadius: "15px",
            fontFamily: "Poppins, sans-serif",
            fontWeight: 600,
            color: "gray",
            fontStyle: "normal",
            padding: "5px 4px",
            border: "1px solid rgba(2, 6, 12, 0.15)",
            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
          }}
        >
          <p className="text-center border-b-2 w-full">Order Summary</p>
          <p className="text-xl text-black ">Subtotal : ₹{totalAmount}</p>
          <p className="text-black">
            Tax estimate(8%) : ₹{Math.round(Taxestimate)}
          </p>
          <p className="text-black">Total Amount : ₹{totalAmountwithtax}</p>
          <button
            onClick={handlePayNow}
            className=" text-white bg-green-400 w-[55%] hover:bg-green-500"
            style={{
              borderRadius: "15px",
              fontFamily: "Poppins, sans-serif",
              fontWeight: 600,
              fontStyle: "normal",
              padding: "5px 8px",

              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
            }}
          >
            Order Now
          </button>
        </div>

        {/* footerpage */}
        <FooterPage />
      </div>

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

export default UserCartPage;
