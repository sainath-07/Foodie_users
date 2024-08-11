import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Api_Url } from "../utils/ApiUrl";
import { Link, useParams } from "react-router-dom";
import { BeatLoader, SyncLoader } from "react-spinners";
import "bootstrap-icons/font/bootstrap-icons.css";
import clsx from "clsx";
import { SkipBack, StepForward } from "lucide-react";
import { data } from "../App";
import MobileResponsive from "./MobileResponsive";
import FooterPage from "./FooterPage";
import toast from "react-hot-toast";

const FirmCollection = () => {
  // Products State
  const [products, setproducts] = useState([]);
  const [dummyproducts, setdummyproducts] = useState([]);
  // sortPrice State
  const [sortValue, setsortValue] = useState("");

  const { frimName, firmId, area } = useParams();

  const {
    addtocart,
    cartProducts,
    setcartProducts,
    fetchCartProdcuts,
    isSidemenuopen,
    setsidemenu,
  } = useContext(data);

  useEffect(() => {
    fetchFirmProducts();
  }, []);

  // fetching the Products...
  const fetchFirmProducts = async () => {
    try {
      let response = await axios.get(`${Api_Url}/product/${firmId}`);

      console.log(response, "resposne from firmcollection");
      // console.log(response.data.products, "response.data.products");
      setproducts(response.data.products);
      setdummyproducts(response.data.products);
    } catch (error) {
      console.log(error, "error message");
      toast.error("No response form server.");
      // alert("No response form server.");
    }
  };

  // sortPrice logic
  const handleSort = (event) => {
    const value = event.target.value;
    setsortValue(value);
    if (value === "LowtoHigh") {
      sortAsc();
    } else if (value === "HightoLow") {
      sortDes();
    } else if (value === "Default") {
      setproducts(dummyproducts);
    }
  };

  const sortAsc = () => {
    let data = [...dummyproducts];
    console.log(data, "data");
    if (data.length > 0) {
      let ascOrderResult = data.sort((a, b) => a.price - b.price);
      setproducts(ascOrderResult);
    }
  };

  const sortDes = () => {
    let data = [...dummyproducts];
    if (data.length > 0) {
      let desOrderResult = data.sort((a, b) => b.price - a.price);
      setproducts(desOrderResult);
    }
  };

  // filterByCategory Logic
  const handleCategory = (data) => {
    console.log(data, "data");
    if (data === "All") {
      setproducts(dummyproducts);
    } else {
      const filterdata = dummyproducts.filter((value) =>
        value.category.includes(data)
      );
      setproducts(filterdata);
    }
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

  const isProductInCart = (id) => {
    // console.log(id,'some')
    return cartProducts.some((item) => item.productId === id);
  };

  let poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "600",
    fontStyle: "normal",
  };
  return (
    <>
      {/* topBar in firm collections */}
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

          <p style={poppins} className="text-xl cursor-pointer md:text-2xl">
            <Link to={"/"}>Foodie.com</Link>
          </p>
        </section>

        {/* Mobile responsive code */}
       <MobileResponsive/>

        <section className="flex gap-1 ">
          <Link to={"/"}>
            
            <button style={filterstyling} type="button" className="flex">
              Home
            </button>
          </Link>

          <Link to={"/cartpage"}>
            {" "}
            <button
              style={filterstyling}
              className="flex"
              onClick={() => {
                fetchCartProdcuts();
              }}
            >
              Cart
            </button>
          </Link>
        </section>
      </nav>

      {/* Blur overlay when sidemenu is open */}
      {isSidemenuopen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-md z-40"
          onClick={() => setsidemenu(false)}
        ></div>
      )}
      <section className="mt-2">
        {Array.isArray(products) && products.length > 0 ? (
          <div className=" w-[100%] sm:w-[85%] lg:w-[75%] xl:w-[70%] md:w-[75%] mx-auto flex flex-col gap-2 sm:border-none ">
            {/* firmName and filter by category */}
            <div
              className="flex flex-col gap-2 sticky top-10 z-10  bg-white p-2  rounded mt-8 "
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
                // backgroundColor: "rgba(255, 255, 255, 0.7)", // White with 70% opacity
                // backdropFilter: "blur(10px)", // 10px blur effect
                // WebkitBackdropFilter: "blur(10px)", // Safari support
              }}
            >
              <div className="flex gap-2 flex-wrap mt-4">
                <div
                  className="text-[16px]"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                  }}
                >
                  FirmName:{" "}
                  <span
                    className="text-xl"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      fontStyle: "normal",
                    }}
                  >
                    {frimName}
                  </span>
                </div>

                <div
                  className="text-[16px]"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                  }}
                >
                  Location:{" "}
                  <span
                    className="text-xl"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 700,
                      fontStyle: "normal",
                    }}
                  >
                    {area}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 justify-start sm:justify-between">
                <div className=" flex gap-4">
                  <button
                    className="text-center text-[16px] px-4 py-1 cursor-pointer"
                    style={{
                      borderRadius: "22px",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 500,
                      fontStyle: "normal",
                      border: " 1px solid rgba(2, 6, 12, 0.15)",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                    onClick={() => handleCategory("veg")}
                  >
                    veg
                  </button>
                  <button
                    className="text-center text-[16px] px-4 py-1 cursor-pointer"
                    style={{
                      borderRadius: "22px",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 500,
                      fontStyle: "normal",
                      border: " 1px solid rgba(2, 6, 12, 0.15)",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                    onClick={() => handleCategory("Non-veg")}
                  >
                    Non veg
                  </button>
                  <button
                    className="text-center text-[16px] px-4 py-1 cursor-pointer"
                    style={{
                      borderRadius: "22px",
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 500,
                      fontStyle: "normal",
                      border: " 1px solid rgba(2, 6, 12, 0.15)",
                      boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                    }}
                    onClick={() => handleCategory("All")}
                  >
                    All
                  </button>
                </div>
                <div>
                  <form>
                    <select
                      name="sort"
                      id=""
                      className="text-center text-[16px]  py-1 cursor-pointer"
                      style={{
                        borderRadius: "22px",
                        fontFamily: "Poppins, sans-serif",
                        fontWeight: 500,
                        fontStyle: "normal",
                        border: " 1px solid rgba(2, 6, 12, 0.15)",
                        boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                      }}
                      value={sortValue}
                      onChange={handleSort}
                    >
                      <option
                        className="cursor-pointer"
                        value="SortBy"
                        style={{ poppins }}
                      >
                        SortBy
                      </option>
                      <option
                        value="LowtoHigh"
                        className="cursor-pointer"
                        style={{ poppins }}
                      >
                        Cost:LowtoHigh
                      </option>
                      <option
                        value="HightoLow"
                        className="cursor-pointer"
                        style={{ poppins }}
                      >
                        Cost:HightoLow
                      </option>
                      <option
                        value="Default"
                        className="cursor-pointer"
                        style={{ poppins }}
                      >
                        Cost:setDefault
                      </option>
                    </select>
                  </form>
                </div>
              </div>
            </div>
            {/* Products section  */}
            {products.map((value, index) => {
              const {
                description,
                _id,
                productName,
                image,
                category,
                bestSeller,
                price,
              } = value;
              // console.log(value, "value");
              return (
                <React.Fragment key={_id}>
                  <div
                    className="flex sm:border-b-2 sm:gap-4 mt-4 sm:px-4 rounded mx-2"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 400,
                      fontStyle: "normal",
                    }}
                  >
                    <div className="w-[70%] sm:block flex flex-col  gap-2 items-center justify-center">
                      {bestSeller && (
                        <span
                          className="bi bi-star-fill text-orange-500 sm:text-sm text-base"
                          style={{
                            fontFamily: "Poppins, sans-serif",
                            fontWeight: 500,
                            fontStyle: "normal",
                          }}
                        >
                          Best Seller
                        </span>
                      )}
                      <p
                        className="sm:text-xl text-base tracking-[2px] sm:tracking-normal"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 600,
                          fontStyle: "normal",
                        }}
                      >
                        {productName}
                      </p>
                      <p
                        className="sm:text-sm text-xl"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 600,
                          fontStyle: "normal",
                        }}
                      >
                        &#8377;{price} &nbsp;
                        {category.map((value, index) => (
                          <span
                            className="text-green-600 sm:inline block  tracking-[2px] sm:tracking-normal"
                            key={index}
                          >
                            {value}
                          </span>
                        ))}
                      </p>
                      <p
                        className="hidden sm:flex  text-gray-500 md:text-sm lg:text-base sm:text-sm"
                        style={{
                          fontFamily: "Poppins, sans-serif",
                          fontWeight: 400,
                          fontStyle: "normal",
                        }}
                      >
                        {description}
                      </p>
                    </div>
                    <div className=" p-2 flex flex-col gap-2 py-2 items-center relative">
                      <img
                        src={`${Api_Url}/uploads/${image}`}
                        alt=""
                        className="w-[220px] h-[180px] rounded bg-gray-100"
                      />
                      {isProductInCart(value._id) ? (
                        <button className="flex justify-center absolute bottom-0 py-1 px-4 rounded bg-white font-bold text-red-600">
                          <Link to={"/cartpage"}>Buy Now</Link>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            addtocart(value);
                          }}
                          className="flex justify-center absolute bottom-0 py-1 px-4 rounded bg-white font-bold text-green-600"
                        >
                          Add
                        </button>
                      )}
                    </div>
                  </div>
                  <details
                    className="sm:hidden border-b-2 py-4 mx-6"
                    style={{
                      fontFamily: "Poppins, sans-serif",
                      fontWeight: 400,
                      fontStyle: "normal",
                    }}
                  >
                    <summary className="font-bold">Product details</summary>
                    <p className="text-sm">{description}</p>
                  </details>
                </React.Fragment>
              );
            })}
          </div>
        ) : (
          <>
          <div style={poppins} className="text-xl mt-32 font-bold text-center"> 
          <BeatLoader speedMultiplier={1} color="#4ac058" />

            No Product in collection,Please login and add products
          </div>
          </>
        )}
      </section>
    </>
  );
};

export default FirmCollection;
