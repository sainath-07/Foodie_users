import { Routes, Route } from "react-router-dom";
import "./App.css";
import Navigation from "./page/navigation";
import FirmCollection from "./components/FirmCollection";
import PageNotFound from "./components/PageNotFound";
import UserCartPage from "./components/UserCartPage";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Api_Url } from "./utils/ApiUrl";
import { PulseLoader } from "react-spinners";
import { Detector } from "react-detect-offline";
import { WifiOff } from "lucide-react";

export const data = createContext();

const getToken = () => localStorage.getItem("loginToken");

const App = () => {
  // mobile side menu state
  const [isSidemenuopen, setsidemenu] = useState(false);

  const [cartProducts, setcartProducts] = useState([]);

  useEffect(() => {
    fetchCartProdcuts();
  }, []);

  // Fetching products logic
  const fetchCartProdcuts = async () => {
    const userToken = getToken();
    // console.log(userToken, "userToken");

    try {
      const response = await fetch(`${Api_Url}/cart/allproducts`, {
        method: "GET",
        headers: {
          token: userToken,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        <PulseLoader color="#32bd29" size={25} />;
        return;
      }

      // console.log(data, "data");
      // console.log(data.products, "data");
      setcartProducts(data.products);
    } catch (error) {
      console.log(error, "error from fetchCartProdcuts function");
    }
  };

  // addtocart logic
  const addtocart = async (obj) => {
    const userToken = getToken();

    const res = { ...obj, count: 1, totalPrice: obj.price, productId: obj._id };
    console.log(res, "res");

    const { productName, price, image, count, totalPrice, productId } = res;

    if (!userToken) {
      // alert("Please Login to add Products");
      toast.error("Please Login to add Products");
      return;
    }

    try {
      let response = await fetch(`${Api_Url}/cart/add-to-cart`, {
        method: "POST",
        headers: {
          token: userToken,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productName,
          price,
          image,
          count,
          totalPrice,
          productId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Product added successfully");
        console.log(data, "data");
        fetchCartProdcuts();
        toast.success("Product added to Cart Successfully!");
        // alert("Product added to Cart Successfully!");
      } else {
        // alert("no response from server");
        toast.error("no response from server");
      }
    } catch (error) {
      console.log(error, "catch block addtocart function");
      // alert("some went wrong from catch block");
      toast.error("some went wrong");
    }
  };

  // delete logic
  const handleDelete = async (productId) => {
    const userToken = getToken();

    try {
      let response = await fetch(`${Api_Url}/cart/deleteproduct/${productId}`, {
        method: "DELETE",
        headers: {
          token: userToken,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Remove the deleted product from the cartProducts state
        fetchCartProdcuts();
        // alert("Product removed from Cart Successfully!");
        toast.success("Product removed from Cart Successfully!");
      } else {
        // alert("Failed to remove product from the cart");
        toast.error("Failed to remove product from the cart");
      }
    } catch (error) {
      console.log(error, "catch block handleDelete function");
      toast.error("Something went wrong while trying to delete the product");
      // alert("Something went wrong while trying to delete the product");
    }
  };

  // update Quantity logic

  const updateQuantityBackend = async (count, totalPrice, productId) => {
    const userToken = getToken();

    try {
      let response = await fetch(
        `${Api_Url}/cart/updateQuantity/${productId}`,
        {
          method: "PATCH",
          headers: {
            token: userToken,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ count, totalPrice }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log(data, "data");
        fetchCartProdcuts();
      }
    } catch (error) {
      console.log(error);
      // alert("some thing went wrong from updateQuantityBackend fun");
      toast.error("some thing went wrong");
    }
  };

  return (
    <>
      <Detector
        render={({ online }) =>
          online ? (
            <>
              <data.Provider
                value={{
                  addtocart,
                  setcartProducts,
                  cartProducts,
                  handleDelete,
                  fetchCartProdcuts,
                  isSidemenuopen,
                  setsidemenu,
                  updateQuantityBackend,
                }}
              >
                <Routes>
                  <Route path="/" element={<Navigation />} />
                  <Route path="/cartpage" element={<UserCartPage />} />
                  <Route path="/*" element={<PageNotFound />} />
                  <Route
                    path="/products/:frimName/:firmId/:area"
                    element={<FirmCollection />}
                  />
                </Routes>
              </data.Provider>
            </>
          ) : (
            <>
              <div className="flex flex-col border-2 w-full h-screen justify-center items-center">
                <div>
                  <WifiOff />
                </div>
                <p>No internet Connection</p>
                <p>Please make sure you connect to Internet</p>
              </div>
            </>
          )
        }
      />
    </>
  );
};

export default App;
