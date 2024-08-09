import axios from "axios";
import React, { useEffect, useState } from "react";
import { Api_Url } from "../utils/ApiUrl";
import { useParams } from "react-router-dom";
import { BeatLoader, PropagateLoader, SyncLoader } from "react-spinners";
import { IonIcon } from "@ionic/react";
import { homeOutline, star, starOutline } from "ionicons/icons";

const FirmCollection = () => {
  const [products, setproducts] = useState([]);
  const { firmId } = useParams();
  // console.log(firmId,'firmId firmcollection')
  useEffect(() => {
    fetchFirmProducts();
  }, []);

  const fetchFirmProducts = async () => {
    try {
      let response = await axios.get(`${Api_Url}/product/${firmId}`);

      console.log(response, "resposne from firmcollection");
      console.log(response.data.products, "response.data.products");
      setproducts(response.data.products);
    } catch (error) {
      console.log(error, "error message");
      alert("No response form server.");
    }
  };

  return (
    <>
      <p>firmcollectionpage</p>
      <section className="">
        {Array.isArray(products) && products.length > 0 ? (
          <div className=" w-[50%] mx-auto flex flex-col gap-2">
            {products.map((value, index) => {
              console.log(value);
              const {
                description,
                _id,
                productName,
                image,
                category,
                bestSeller,
                price,
              } = value;
              return (
                <div
                  key={_id}
                  className="flex border-b-2 gap-4"
                  style={{
                    fontFamily: "Poppins, sans-serif",
                    fontWeight: 400,
                    fontStyle: "normal",
                  }}
                >
                  <div className="w-[70%]">
                    {bestSeller && (
                      <span>
                        Best Seller
                        <IonIcon icon={homeOutline} className="text-orange-500 text-2xl" />

                      </span>
                    )}
                    <p>{productName}</p>
                    <p>{price}</p>
                    <p>{description}</p>
                  </div>
                  <div className=" p-2 flex flex-col gap-2 items-center">
                    <img
                      src={`${Api_Url}/uploads/${image}`}
                      alt=""
                      className="w-[220px] h-[180px] rounded"
                    />
                    <button className="flex justify-center py-1 px-4 rounded bg-gray-100 font-bold  text-green-600">
                      {" "}
                      Add
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <>
            <SyncLoader size={20} margin={10} color="#2dc644" />
          </>
        )}
      </section>
    </>
  );
};

export default FirmCollection;
