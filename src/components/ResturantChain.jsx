import axios from "axios";
import React, { useEffect, useState } from "react";
import { Api_Url } from "../utils/ApiUrl";
import { PulseLoader } from "react-spinners";
import { Link } from "react-router-dom";

const ResturantChain = () => {
  const [firms, setFirms] = useState([]);
  const [dummyfirms, setdummyFirms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFirmsApi();
  }, []);

  const fetchFirmsApi = async () => {
    try {
      const response = await axios.get(`${Api_Url}/vendor/all-vendors`);
      if (response.status >= 200 && response.status <= 299) {
        console.log(response.data.vendor, "response.data.vendor");
        setFirms(response.data.vendor);
        setdummyFirms(response.data.vendor);
      }
    } catch (error) {
      console.log(error, "internal server error");
      alert("Failed to fetch the data.");
    } finally {
      setLoading(false);
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
    color: "gray",
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
  };

  return (
    <>
      <section className="mt-8 w-[90%] mx-auto ">
        {loading ? (
          <>
            <div className="flex justify-center">
              <PulseLoader color="#4abf62" />
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
            <div className="flex gap-4 flex-wrap mt-4">
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
            {/* blue */}
            <div className="flex flex-wrap sm:gap-6 gap-4 mt-8 justify-center">
              {Array.isArray(firms) && firms.length > 0 ? (
                firms.map((value) => {
                  const { _id, firm } = value;
                  const { firmName, image, region, category, offer, area } =
                    firm || {};
                  return (
                    <React.Fragment key={_id}>
                      <Link to={`/products/${firmName}/${firm._id}/${area}`}>
                        <div
                          className="flex flex-col  cursor-pointer p-4  rounded relative"
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
                              className="flex flex-wrap gap-2 text-xs text-gray-400"
                              style={poppins}
                            >
                              {region.map((value, index) => {
                                return (
                                  <React.Fragment key={index}>
                                    <span className="">{value}</span>
                                  </React.Fragment>
                                );
                              })}
                            </li>
                            <li
                              className=" text-green-600"
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
                <p>No firms available.</p>
              )}
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default ResturantChain;
