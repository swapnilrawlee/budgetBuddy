import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { UserContext } from "../Utils/userContext";

const Homepage = () => {
  const [greet, setGreet] = useState("");
  const {userdata }=useContext(UserContext)
  console.log(userdata);

  const handleClick = () => {
    const currentDate = new Date();
    const hours = currentDate.getHours();
    let timeOfDay;
    if (hours < 12) {
      timeOfDay = "Morning";
    } else if (hours < 18) {
      timeOfDay = "Afternoon";
    } else if (hours < 21) {
      timeOfDay = "Evening";
    } else {
      timeOfDay = "Night";
    }

    setGreet(timeOfDay);
  };

  useEffect(() => {
    handleClick();

  }, []);

  return (
    <div className="w-screen h-screen  flex justify-between">
      <Navbar />
      <div className="w-[78%] h-full p-6  rounded flex flex-col gap-6">
        <div className="w-full h-1/5  rounded flex justify-center items-center">
          <h1 className="   text-4xl p-8  capitalize">
            Good {greet}, <span className="text-red-500">{userdata}</span>
          </h1>
        </div>
        <div className="main flex flex-wrap w-full h-full gap-2 justify-center items-center">
          <div className="left flex flex-col w-[40%] h-full gap-6">
            <div className="w-full h-1/2 shadow-black shadow-lg flex flex-col border-2 border-black text-2xl justify-center items-center">
              <p>Total Balance: 3000</p>
              <p>Monthly Budget: 3333</p>
              <p>Expenses Summary: 22222</p>
              <p>Savings: 2222</p>
            </div>
            <div className="w-full h-1/2 shadow-black shadow-lg rounded flex flex-col border-2 border-black text-2xl  items-center p-4">
              <p>Recent Transactions:</p>
            </div>
          </div>
          <div className="right flex flex-col w-[40%] h-full gap-6">
            <div className="w-full h-1/2 shadow-black shadow-lg rounded flex flex-col border-2 border-black text-2xl items-center p-4">
              <p>Spending Categories</p>
            </div>
            <div className="w-full h-1/2 shadow-black shadow-lg rounded flex flex-col border-2 border-black text-2xl  items-center p-4">
              <p>Budget Progress</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
