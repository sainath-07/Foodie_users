import { useState } from "react";
import { Api_Url } from "../../utils/ApiUrl";
import toast from "react-hot-toast";

function Register({ showRegister,handleLogin }) {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleRegisterForm = async (e) => {
    e.preventDefault();

    try {
      if (
        name == "" ||
        name == false ||
        email == "" ||
        email == false ||
        password == false ||
        password == ""
      ) {
        // alert("please fill all fields to register");
        toast.error("please fill all fields to register");
        return;
      }

      const response = await fetch(`${Api_Url}/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log(data, "data");
        toast.success("Registered successfully!");
        handleLogin()
        setname("")
        setemail("")
        setpassword("")
      } else {
        toast.error("No reponse form server");
      }
    } catch (error) {
      console.log(error, "error from handleregisterform function");
      // alert("some went wrong from catch block");
      toast.error("some went wrong from catch block");
    }
  };

  return (
    <>
      {showRegister && (
        <div
          className="flex justify-center mt-20 items-start min-h-[80vh] "
          style={{
            fontFamily: '"Poppins", sans-serif',
            fontWeight: 300,
            fontStyle: "normal",
          }}
        >
          <div className="bg-white p-8 px-6 rounded-lg md:drop-shadow-2xl shadow-xl w-full max-w-md">
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <form onSubmit={handleRegisterForm}>
              <div className="mb-4">
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 "
                  required=""
                  autoComplete="off"
                  name="name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                />
              </div>
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
                  required=""
                  autoComplete="off"
                  name="email"
                  value={email}
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
                  required=""
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

export default Register;
