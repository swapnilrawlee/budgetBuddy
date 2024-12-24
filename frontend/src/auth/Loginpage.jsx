import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/axios";
import ImageCompo from "../ImageCompo";
import { UserContext } from "../Utils/userContext";

const Loginpage = () => {
  const { setUserdata } = useContext(UserContext);
  const Navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    if (!email || !password) {
      setErrorMessage("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    return true;
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await axiosInstance.post("/api/login", {
        email,
        password,
      });
      if (response.status === 200) {
        setUserdata(response.data.user);
        localStorage.setItem("user_id", response.data.user.id);
        Navigate("/home");
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen relative flex justify-center flex-col items-start">
      <h1 className="absolute text-2xl mb-4 p-4 z-10 top-0 left-0 font-serif">
        Budget<span className="text-red-500">Buddy</span>
      </h1>

      <form
        onSubmit={submitHandler}
        className="flex w-full max-w-sm h-auto justify-center ml-[20%] flex-col items-center px-5 py-4 gap-4 rounded-lg backdrop-sepia-0 bg-white/90 shadow-black shadow-lg"
      >
        <h1 className="text-2xl my-3">Welcome Back</h1>
        <input
          type="text"
          placeholder="Email"
          name="email"
          className="border-2 p-2 rounded-md w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          className="border-2 p-2 rounded-md w-full"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
       
        <button
          type="submit"
          className={`w-full h-[50px] bg-red-500 text-white rounded-md p-2 ${
            isLoading && "opacity-50 cursor-not-allowed"
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>
        <p className="text-sm mt-2">
          Don't have an account?{" "}
          <Link to={"/register"} className="text-blue-500 hover:underline">
            Register
          </Link>
        </p>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
      </form>
      <div className="desktop-image">
        <ImageCompo />
      </div>
      {/*  */}
    </div>
  );
};

export default Loginpage;
