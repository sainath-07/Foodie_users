import axios from "axios";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { Api_Url } from "../utils/ApiUrl";
import { BeatLoader, ClipLoader, PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";
import { data } from "../App";
import FooterPage from "./FooterPage";
import toast from "react-hot-toast";

const ResturantChain = () => {
  const [firms, setFirms] = useState([]);
  const [dummyfirms, setdummyFirms] = useState([]);
  const [loading, setLoading] = useState(true);
  const { fetchCartProdcuts } = useContext(data);
  const [searchResturants, setsearchResturants] = useState("");

  useEffect(() => {
    fetchFirmsApi();
  }, []);

  // Firm Logic
  const fetchFirmsApi = async () => {
    try {
      const response = await axios.get(`${Api_Url}/vendor/all-vendors`);
      if (response.status >= 200 && response.status <= 299) {
        // console.log(response.data.vendor, "response.data.vendor");
        setFirms(response.data.vendor);
        setdummyFirms(response.data.vendor);
      }
    } catch (error) {
      console.log(error, "internal server error");
      // alert("Failed to fetch the data.");
      toast.error("Failed to fetch the data.");
    } finally {
      setLoading(false);
    }
  };

  const handlesearchResturants = (value) => {
    let searchvalue = value.toLowerCase();
    setsearchResturants(searchvalue);

    const filteredResturant = dummyfirms.filter((each, index) =>
      each.firm.firmName.toLowerCase().includes(searchvalue)
    );

    if (filteredResturant) {
      setFirms(filteredResturant);
    }
  };

  let poppins = {
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    fontStyle: "normal",
  };

  let filterstyling = {
    borderRadius: "22px",
    fontFamily: "Poppins, sans-serif",
    fontWeight: 500,
    // color: "gray",
    fontStyle: "normal",
    border: " 1px solid rgba(2, 6, 12, 0.15)",
    boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
  };

  const handleRegion = (data) => {
    if (data === "All") {
      setFirms(dummyfirms);
    } else if (data === "veg" || data === "Non-veg") {
      const Alldata = dummyfirms.filter((product) =>
        product.firm.category.includes(data)
      );
      setFirms(Alldata);
    } else {
      const Alldata = dummyfirms.filter((product) =>
        product.firm.region.includes(data)
      );
      setFirms(Alldata);
    }
    setsearchResturants("");
  };

  return (
    <>
      <section className="mt-8 w-[90%] mx-auto ">
        {loading ? (
          <>
            <div className="flex justify-center">
              <BeatLoader speedMultiplier={3} color="#4ac058" />
            </div>
          </>
        ) : (
          <>
            <p
              className="text-2xl"
              style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 700,
                fontStyle: "normal",
              }}
            >
              Discover best restaurants
            </p>
            <div className="flex flex-wrap gap-4 mt-4 justify-between">
              <div className="flex gap-3 flex-wrap">
                <button
                  className="text-center text-[16px] px-4 py-1 cursor-pointer"
                  style={filterstyling}
                  onClick={() => handleRegion("All")}
                >
                  All
                </button>
                <button
                  className="text-center text-[16px] px-4 py-1 cursor-pointer"
                  style={filterstyling}
                  onClick={() => handleRegion("South-Indian")}
                >
                  South-Indian
                </button>
                <button
                  className="text-center text-[16px] px-4 py-1 cursor-pointer"
                  style={filterstyling}
                  onClick={() => handleRegion("North-Indian")}
                >
                  North-Indian
                </button>
                <button
                  className="text-center text-[16px] px-4 py-1 cursor-pointer"
                  style={filterstyling}
                  onClick={() => handleRegion("chinese")}
                >
                  Chinese
                </button>
                <button
                  className="text-center text-[16px] px-4 py-1 cursor-pointer"
                  style={filterstyling}
                  onClick={() => handleRegion("bakery")}
                >
                  Bakery
                </button>
                <button
                  className="text-center text-[16px] px-4 py-1 cursor-pointer"
                  style={filterstyling}
                  onClick={() => handleRegion("veg")}
                >
                  Veg
                </button>
                <button
                  className="text-center text-[16px] px-4 py-1 cursor-pointer"
                  style={filterstyling}
                  onClick={() => handleRegion("Non-veg")}
                >
                  Non-Veg
                </button>
              </div>
              <div className=" w-[100%] sm:w-[75%] mx-auto md:w-[60%] h-[50px] lg:w-[50%] xl:w-[40%]">
                <input
                  type="text"
                  className="text-[14px] sm:text-[16px] w-full h-full p-3 
                  sm:p-4
                  focus:outline-none"
                  style={filterstyling}
                  placeholder="Search Your favourite Resturants 🔍"
                  value={searchResturants}
                  onChange={(e) => handlesearchResturants(e.target.value)}
                />
              </div>
            </div>
            {/* blue */}
            <div className="flex flex-wrap sm:gap-6 gap-4 mt-8 justify-center">
              {Array.isArray(firms) && firms.length > 0 ? (
                firms.map((value) => {
                  const { _id, firm } = value;
                  const { firmName, image, region, category, offer, area } =
                    firm || {};
                  return (
                    <React.Fragment key={_id}>
                      <Link
                        to={`/products/${firmName}/${firm._id}/${area}`}
                        onClick={() => {
                          fetchCartProdcuts();
                        }}
                      >
                        <div
                          className="flex flex-col  gap-2 cursor-pointer p-4  rounded relative"
                          // red border
                          style={{
                            boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
                          }}
                        >
                          <img
                            src={`${Api_Url}/uploads/${image}`}
                            className="w-[240px] h-[200px] rounded  hover:scale-105 duration-300 transition-all ease-out"
                            alt={firmName}
                          />

                          <p
                            className="absolute right-0 text-sm text-white p-1 bg-black top-0"
                            style={{
                              fontFamily: "Poppins, sans-serif",
                              fontWeight: 500,
                              fontStyle: "normal",
                            }}
                          >
                            {offer}
                          </p>
                          <ul className="list-inside flex flex-col gap-2">
                            <li>
                              <strong
                                className="text-xl text-center rounded mt-8"
                                style={{
                                  fontFamily: "Poppins, sans-serif",
                                  fontWeight: 700,
                                  fontStyle: "normal",
                                }}
                              >
                                {firmName}
                              </strong>
                            </li>
                            <li
                              className="flex flex-wrap gap-2 text-base  text-gray-600 h-[50px] w-[250px] items-center"
                              style={poppins}
                            >
                              {region.map((value, index) => {
                                return (
                                  <React.Fragment key={index}>
                                    <span>{value}</span>
                                  </React.Fragment>
                                );
                              })}
                            </li>
                            <li
                              className=" text-green-600 -mt-1"
                              style={{
                                fontFamily: "Poppins, sans-serif",
                                fontWeight: 500,
                                fontStyle: "normal",
                              }}
                            >
                              {category.map((value, index) => {
                                return (
                                  <React.Fragment key={index}>
                                    <span className="px-2">{value}</span>
                                  </React.Fragment>
                                );
                              })}
                            </li>
                          </ul>
                        </div>
                      </Link>
                    </React.Fragment>
                  );
                })
              ) : (
                <>
                  <BeatLoader speedMultiplier={1} color="#4ac058" />
                  <p className="text-xl font-semibold">No firms available.</p>
                </>
              )}
            </div>
          </>
        )}
      </section>

      <FooterPage/>
    </>
  );
};

export default ResturantChain;
