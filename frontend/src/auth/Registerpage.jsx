import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../Utils/axios";
import ImageCompo from "../ImageCompo";

const Registerpage = () => {
  const Navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateInputs = () => {
    if (!name || !email || !password) {
      setErrorMessage("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return false;
    }
    if (password.length < 8) {
      setErrorMessage("Password must be at least 8 characters long.");
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
      const response = await axiosInstance.post("/api/register", {
        name,
        email,
        password,
      });
      if (response.status === 200) {
        Navigate("/");
      } else {
        setErrorMessage("Registration failed. Please try again.");
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
      <div className="desktop-image">

      <ImageCompo />
      </div>
      <form
        onSubmit={submitHandler}
        className="flex authform w-full shadow-black border-2 max-w-md h-auto ml-[20%] justify-center flex-col items-center px-5 py-4 gap-4 rounded-lg backdrop-sepia-0 bg-white/90 shadow-lg"
      >
        <h1 className="text-3xl my-6">Registration</h1>
        <input
          type="text"
          placeholder="Name"
          name="name"
          aria-label="Name"
          className="border-2 p-2 rounded-md w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          aria-label="Email"
          className="border-2 p-2 rounded-md w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password (min 8 characters)"
          name="password"
          aria-label="Password"
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
          {isLoading ? "Registering..." : "Register"}
        </button>
        <p className="text-sm mt-2">
          Already have an account?{" "}
          <Link to={"/"} className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
        {errorMessage && (
          <p className="text-red-500 text-sm mt-2">{errorMessage}</p>
        )}
      </form>
    </div>
  );
};

export default Registerpage;
