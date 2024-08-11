import { useState } from "react";
import { Api_Url } from "../../utils/ApiUrl";
import toast from "react-hot-toast";

function Login({ showLogin, handleHomePage,handleLogout }) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handlelogin = async (e) => {
    e.preventDefault();

    if (email == false || email == "" || password == false || password == "") {
      toast.error("please fill all fiels to login");
      // alert("please fill all fiels to login");
      return;
    }

    try {
      const response = await fetch(`${Api_Url}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data, "data");

        // alert("login is successfull");
        // handleLogout()
        const userdetails = JSON.stringify(data.user);
        localStorage.setItem("loginToken", data.token);
        localStorage.setItem("userdetails", userdetails);
        handleHomePage();
      } else if (
        data.error == "Entered Email or password doesn't exists in database"
      ) {
        toast.error(data.error);
        // alert(data.error);
      }
    } catch (error) {
      console.log(error, "error fromloginfunction");
      // alert("something went wrong");
      toast.error("something went wrong");
    }
  };

  return (
    <>
      {showLogin && (
        <div
          className="flex justify-center mt-20 items-start min-h-[80vh] "
          style={{
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 300,
            fontStyle: "normal",
          }}
        >
          <div className="bg-white p-8 px-6 rounded-lg md:drop-shadow-2xl shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
            <form onSubmit={handlelogin}>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  autoComplete="off"
                  value={email}
                  name="email"
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  autoComplete="off"
                  value={password}
                  name="password"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
